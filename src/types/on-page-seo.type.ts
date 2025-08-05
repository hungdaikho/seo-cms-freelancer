// On-Page SEO Checker Types
export interface OnPageSEOAnalysisRequest {
    url: string;
    options?: {
        auditType?: 'full' | 'technical' | 'content' | 'performance';
        settings?: {
            crawlDepth?: number;
            includeImages?: boolean;
            checkMobileFriendly?: boolean;
            analyzePageSpeed?: boolean;
        };
    };
}

export interface OnPageSEOAudit {
    id: string;
    projectId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    progress?: number;
    message?: string;
    estimated_duration?: string;
    createdAt: string;
    completedAt?: string;
    config?: {
        auditType: string;
        includeImages: boolean;
        checkMobileFriendly: boolean;
    };
}

export interface OnPageSEOIssue {
    type: 'error' | 'warning' | 'info';
    title?: string;
    description?: string;
    recommendation?: string;
    affected_elements?: string[];
    priority?: 'high' | 'medium' | 'low';
    category?: string;
    effort?: 'Low' | 'Medium' | 'High';
    impact?: 'High' | 'Medium' | 'Low';
}

export interface TechnicalSEOMetrics {
    title_length: number;
    meta_description_length: number;
    h1_count: number;
    h2_count: number;
    canonical_url: string;
    schema_markup_count: number;
    hreflang_tags: number;
}

export interface ContentAnalysisMetrics {
    word_count: number;
    readability_score: number;
    keyword_density: number;
    internal_links: number;
    external_links: number;
}

export interface ImageOptimizationMetrics {
    total_images: number;
    images_without_alt: number;
    images_optimized: number;
}

export interface PerformanceMetrics {
    page_load_time: number;
    core_web_vitals: {
        lcp: number;
        cls: number;
    };
    mobile_friendly: boolean;
}

export interface SocialMediaMetrics {
    og_title: string;
    og_description: string;
    og_image: string;
    twitter_card: string;
}

export interface OnPageSEOResults {
    id: string;
    status: string;
    overall_score: number;
    analysis_url: string;
    results: {
        technical_seo: {
            score: number;
            issues: OnPageSEOIssue[];
            metrics: TechnicalSEOMetrics;
        };
        content_analysis: {
            score: number;
            metrics: ContentAnalysisMetrics;
            issues: OnPageSEOIssue[];
        };
        image_optimization: {
            score: number;
            metrics: ImageOptimizationMetrics;
            issues: OnPageSEOIssue[];
        };
        performance: {
            score: number;
            metrics: PerformanceMetrics;
            issues: OnPageSEOIssue[];
        };
        social_media: {
            score: number;
            metrics: SocialMediaMetrics;
            issues: OnPageSEOIssue[];
        };
    };
    recommendations: OnPageSEOIssue[];
    createdAt: string;
    completedAt?: string;
}

export interface OnPageSEOListResponse {
    audits: OnPageSEOAudit[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface OnPageSEOState {
    audits: OnPageSEOAudit[];
    currentAudit: OnPageSEOAudit | null;
    currentResults: OnPageSEOResults | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
