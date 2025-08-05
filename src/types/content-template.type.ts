export interface TemplateVariable {
    name: string;
    type: 'text' | 'keyword' | 'date' | 'number';
    required: boolean;
    description?: string;
    defaultValue?: string;
}

export interface WordCountRange {
    min: number;
    max: number;
}

export interface ContentTemplate {
    id: string;
    name: string;
    type: 'blog-post' | 'landing-page' | 'email' | 'social-media';
    template: string;
    variables: TemplateVariable[];
    seoGuidelines: string[];
    wordCountRange: WordCountRange;
    projectId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateContentTemplateRequest {
    name: string;
    type: 'blog-post' | 'landing-page' | 'email' | 'social-media';
    template: string;
    variables: TemplateVariable[];
    seoGuidelines: string[];
    wordCountRange: WordCountRange;
}

export interface UpdateContentTemplateRequest extends CreateContentTemplateRequest {
    id: string;
}

export interface AITemplate {
    id: string;
    projectId: string;
    name: string;
    description: string;
    toolId: string;
    parameters: Record<string, any>;
    isShared: boolean;
    createdBy: string;
    createdAt: string;
    usageCount: number;
}

export interface CreateAITemplateRequest {
    name: string;
    description: string;
    toolId: string;
    parameters: Record<string, any>;
    isShared: boolean;
}

export interface GenerateContentRequest {
    templateId: string;
    variables: Record<string, string>;
    targetKeyword: string;
    additionalKeywords: string[];
}

export interface ContentTemplateState {
    templates: ContentTemplate[];
    aiTemplates: AITemplate[];
    selectedTemplate: ContentTemplate | null;
    loading: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    generating: boolean;
    error: string | null;
    filters: {
        type?: string;
        search?: string;
    };
}
