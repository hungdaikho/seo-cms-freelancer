import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    ContentTemplate,
    CreateContentTemplateRequest,
    UpdateContentTemplateRequest,
    AITemplate,
    CreateAITemplateRequest,
    GenerateContentRequest,
    ContentTemplateState
} from '@/types/content-template.type';
import contentTemplateService from '@/services/content-template.service';

// Initial state
const initialState: ContentTemplateState = {
    templates: [],
    aiTemplates: [],
    selectedTemplate: null,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    generating: false,
    error: null,
    filters: {},
};

// Async thunks for template operations
export const fetchTemplates = createAsyncThunk(
    'contentTemplate/fetchTemplates',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const templates = await contentTemplateService.getTemplates(projectId);
            return templates;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch templates');
        }
    }
);

export const fetchTemplateById = createAsyncThunk(
    'contentTemplate/fetchTemplateById',
    async ({ projectId, templateId }: { projectId: string; templateId: string }, { rejectWithValue }) => {
        try {
            const template = await contentTemplateService.getTemplateById(projectId, templateId);
            return template;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch template');
        }
    }
);

export const createTemplate = createAsyncThunk(
    'contentTemplate/createTemplate',
    async (
        { projectId, data }: { projectId: string; data: CreateContentTemplateRequest },
        { rejectWithValue }
    ) => {
        try {
            const template = await contentTemplateService.createTemplate(projectId, data);
            return template;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create template');
        }
    }
);

export const updateTemplate = createAsyncThunk(
    'contentTemplate/updateTemplate',
    async (
        {
            projectId,
            templateId,
            data,
        }: {
            projectId: string;
            templateId: string;
            data: UpdateContentTemplateRequest;
        },
        { rejectWithValue }
    ) => {
        try {
            const template = await contentTemplateService.updateTemplate(projectId, templateId, data);
            return template;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update template');
        }
    }
);

export const deleteTemplate = createAsyncThunk(
    'contentTemplate/deleteTemplate',
    async (
        { projectId, templateId }: { projectId: string; templateId: string },
        { rejectWithValue }
    ) => {
        try {
            await contentTemplateService.deleteTemplate(projectId, templateId);
            return templateId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete template');
        }
    }
);

// Async thunks for AI template operations
export const fetchAITemplates = createAsyncThunk(
    'contentTemplate/fetchAITemplates',
    async (
        params: {
            projectId?: string;
            toolId?: string;
            isShared?: boolean;
        } = {},
        { rejectWithValue }
    ) => {
        try {
            const templates = await contentTemplateService.getAITemplates(params);
            return templates;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch AI templates');
        }
    }
);

export const createAITemplate = createAsyncThunk(
    'contentTemplate/createAITemplate',
    async (
        { projectId, data }: { projectId: string; data: CreateAITemplateRequest },
        { rejectWithValue }
    ) => {
        try {
            const template = await contentTemplateService.createAITemplate(projectId, data);
            return template;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create AI template');
        }
    }
);

export const deleteAITemplate = createAsyncThunk(
    'contentTemplate/deleteAITemplate',
    async (templateId: string, { rejectWithValue }) => {
        try {
            await contentTemplateService.deleteAITemplate(templateId);
            return templateId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete AI template');
        }
    }
);

// Content generation
export const generateContent = createAsyncThunk(
    'contentTemplate/generateContent',
    async (
        { projectId, data }: { projectId: string; data: GenerateContentRequest },
        { rejectWithValue }
    ) => {
        try {
            const result = await contentTemplateService.generateContent(projectId, data);
            return result;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to generate content');
        }
    }
);

// Template preview
export const previewTemplate = createAsyncThunk(
    'contentTemplate/previewTemplate',
    async (
        {
            projectId,
            templateId,
            variables,
        }: {
            projectId: string;
            templateId: string;
            variables: Record<string, string>;
        },
        { rejectWithValue }
    ) => {
        try {
            const result = await contentTemplateService.previewTemplate(projectId, templateId, variables);
            return result;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to preview template');
        }
    }
);

// Export template
export const exportTemplate = createAsyncThunk(
    'contentTemplate/exportTemplate',
    async (
        { projectId, templateId }: { projectId: string; templateId: string },
        { rejectWithValue }
    ) => {
        try {
            const blob = await contentTemplateService.exportTemplate(projectId, templateId);

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `template-${templateId}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return { success: true };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to export template');
        }
    }
);

// Import template
export const importTemplate = createAsyncThunk(
    'contentTemplate/importTemplate',
    async (
        { projectId, file }: { projectId: string; file: File },
        { rejectWithValue }
    ) => {
        try {
            const template = await contentTemplateService.importTemplate(projectId, file);
            return template;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to import template');
        }
    }
);

// Redux slice
const contentTemplateSlice = createSlice({
    name: 'contentTemplate',
    initialState,
    reducers: {
        setSelectedTemplate: (state, action: PayloadAction<ContentTemplate | null>) => {
            state.selectedTemplate = action.payload;
        },
        setFilters: (state, action: PayloadAction<{ type?: string; search?: string }>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {};
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedTemplate: (state) => {
            state.selectedTemplate = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch templates
        builder
            .addCase(fetchTemplates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTemplates.fulfilled, (state, action) => {
                state.loading = false;
                state.templates = action.payload;
            })
            .addCase(fetchTemplates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch template by ID
        builder
            .addCase(fetchTemplateById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTemplateById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTemplate = action.payload;
            })
            .addCase(fetchTemplateById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create template
        builder
            .addCase(createTemplate.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createTemplate.fulfilled, (state, action) => {
                state.creating = false;
                state.templates.push(action.payload);
            })
            .addCase(createTemplate.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload as string;
            });

        // Update template
        builder
            .addCase(updateTemplate.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateTemplate.fulfilled, (state, action) => {
                state.updating = false;
                const index = state.templates.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.templates[index] = action.payload;
                }
                if (state.selectedTemplate?.id === action.payload.id) {
                    state.selectedTemplate = action.payload;
                }
            })
            .addCase(updateTemplate.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload as string;
            });

        // Delete template
        builder
            .addCase(deleteTemplate.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteTemplate.fulfilled, (state, action) => {
                state.deleting = false;
                state.templates = state.templates.filter(t => t.id !== action.payload);
                if (state.selectedTemplate?.id === action.payload) {
                    state.selectedTemplate = null;
                }
            })
            .addCase(deleteTemplate.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload as string;
            });

        // Fetch AI templates
        builder
            .addCase(fetchAITemplates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAITemplates.fulfilled, (state, action) => {
                state.loading = false;
                state.aiTemplates = action.payload;
            })
            .addCase(fetchAITemplates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create AI template
        builder
            .addCase(createAITemplate.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createAITemplate.fulfilled, (state, action) => {
                state.creating = false;
                state.aiTemplates.push(action.payload);
            })
            .addCase(createAITemplate.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload as string;
            });

        // Delete AI template
        builder
            .addCase(deleteAITemplate.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteAITemplate.fulfilled, (state, action) => {
                state.deleting = false;
                state.aiTemplates = state.aiTemplates.filter(t => t.id !== action.payload);
            })
            .addCase(deleteAITemplate.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload as string;
            });

        // Generate content
        builder
            .addCase(generateContent.pending, (state) => {
                state.generating = true;
                state.error = null;
            })
            .addCase(generateContent.fulfilled, (state) => {
                state.generating = false;
            })
            .addCase(generateContent.rejected, (state, action) => {
                state.generating = false;
                state.error = action.payload as string;
            });

        // Import template
        builder
            .addCase(importTemplate.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(importTemplate.fulfilled, (state, action) => {
                state.creating = false;
                state.templates.push(action.payload);
            })
            .addCase(importTemplate.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setSelectedTemplate,
    setFilters,
    clearFilters,
    clearError,
    clearSelectedTemplate,
} = contentTemplateSlice.actions;

export default contentTemplateSlice.reducer;
