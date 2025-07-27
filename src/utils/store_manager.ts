const saveToken = (token: string) => {
    localStorage.setItem("accessToken", token)
}

const getToken = () => {
    return localStorage.getItem("accessToken")
}

const removeToken = () => {
    localStorage.removeItem("accessToken")
}

const saveRefreshToken = (refreshToken: string) => {
    localStorage.setItem("refreshToken", refreshToken)
}

const getRefreshToken = () => {
    return localStorage.getItem("refreshToken")
}

const removeRefreshToken = () => {
    localStorage.removeItem("refreshToken")
}

const clearAllTokens = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}

export {
    getRefreshToken,
    saveRefreshToken,
    removeRefreshToken,
    getToken,
    saveToken,
    removeToken,
    clearAllTokens
}