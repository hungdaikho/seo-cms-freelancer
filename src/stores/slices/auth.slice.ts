import { authService } from "@/services/auth.service"
import { AuthResponse, LoginRequest, RegisterRequest, User } from "@/types/api.type"
import { AuthState } from "@/types/auth.type"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

export const registerAccount = createAsyncThunk<AuthResponse, RegisterRequest>(
    'auth/registerAccount',
    async (data: RegisterRequest, { rejectWithValue }) => {
        try {
            const response = await authService.register(data)
            // Lưu token vào localStorage
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken)
            }
            return response
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed')
        }
    }
)

export const loginAccount = createAsyncThunk<AuthResponse, LoginRequest>(
    'auth/loginAccount',
    async (data: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await authService.login(data)
            // Lưu token vào localStorage
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken)
            }
            return response
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed')
        }
    }
)

export const logoutAccount = createAsyncThunk(
    'auth/logoutAccount',
    async (_, { dispatch }) => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('accessToken')
        return null
    }
)

export const checkAuthToken = createAsyncThunk(
    'auth/checkAuthToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken')
            if (!token) {
                return rejectWithValue('No token found')
            }

            // Gọi API để lấy thông tin user hiện tại
            const user = await authService.getUserProfile()
            return { user, accessToken: token }
        } catch (error: any) {
            localStorage.removeItem('accessToken')
            return rejectWithValue(error.response?.data?.message || 'Token validation failed')
        }
    }
)

export const googleAuthSuccess = createAsyncThunk<{ user: User | null, accessToken: string }, string>(
    'auth/googleAuthSuccess',
    async (token: string, { rejectWithValue }) => {
        try {
            // Lưu token vào localStorage
            localStorage.setItem('accessToken', token)

            // Thử gọi API để lấy thông tin user hiện tại
            try {
                const user = await authService.getUserProfile()
                return { user, accessToken: token }
            } catch (userProfileError) {
                // Nếu không lấy được profile, vẫn return token
                // User có thể được lấy từ token decode hoặc gọi API khác
                console.warn('Could not fetch user profile:', userProfileError)
                return {
                    user: null, // Will be populated later
                    accessToken: token
                }
            }
        } catch (error: any) {
            localStorage.removeItem('accessToken')
            return rejectWithValue(error.response?.data?.message || 'Google authentication failed')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        updateUserProfile: (state, action: PayloadAction<Partial<typeof state.user>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Register Account
            .addCase(registerAccount.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(registerAccount.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
                state.isAuthenticated = false
            })

            // Login Account  
            .addCase(loginAccount.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginAccount.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
                state.isAuthenticated = false
            })

            // Logout Account
            .addCase(logoutAccount.fulfilled, (state) => {
                state.user = null
                state.accessToken = null
                state.isAuthenticated = false
                state.isLoading = false
                state.error = null
            })

            // Check Auth Token
            .addCase(checkAuthToken.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuthToken.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(checkAuthToken.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.accessToken = null
                state.isAuthenticated = false
                state.error = action.payload as string
            })

            // Google Auth Success
            .addCase(googleAuthSuccess.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(googleAuthSuccess.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(googleAuthSuccess.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
                state.isAuthenticated = false
            })
    }
})

export const { clearError, updateUserProfile } = authSlice.actions
export default authSlice.reducer