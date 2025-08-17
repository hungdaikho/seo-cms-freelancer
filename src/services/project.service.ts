import { BaseService } from "./base.service";
import serverConfig from "@/config/server.config.json";

function getBaseUrl() {
    if (typeof window !== "undefined") {
        // Chạy trên trình duyệt
        return window.location.protocol === "https:"
            ? serverConfig.HTTPS_SERVER_URL
            : serverConfig.HTTP_SERVER_URL;
    } else {
        // Chạy trên server (Node.js)
        // Ưu tiên HTTPS nếu có, hoặc fallback về HTTP
        return process.env.PROTOCOL === "https"
            ? serverConfig.HTTPS_SERVER_URL
            : serverConfig.HTTP_SERVER_URL;
    }
}

// Types for Project API
export interface CreateProjectRequest {
    name: string;
    domain: string;
    settings: {
        country: string;
        language: string;
        trackingEnabled: boolean;
    };
}

export interface Project {
    id: string;
    name: string;
    domain: string;
    ownerId: string;
    settings: {
        country: string;
        language: string;
        trackingEnabled: boolean;
    };
    createdAt: string;
    isActive: boolean;
    _count: {
        keywords: number;
        competitors: number;
        audits: number;
        backlinks?: number;
    };
}

export interface ProjectsListResponse {
    data: Project[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProjectStats {
    totalKeywords: number;
    averageRanking: number;
    rankingDistribution: {
        top3: number;
        top10: number;
        top50: number;
        beyond50: number;
        notRanked: number;
    };
    improvedKeywords: number;
    declinedKeywords: number;
    stableKeywords: number;
    topKeywords: Array<{
        id: string;
        keyword: string;
        currentRanking: number;
    }>;
    recentChanges: number;
    lastUpdate: string;
    auditSummary: {
        totalAudits: number;
        averageScore: number;
        criticalIssues: number;
    };
}

export interface ProjectsListParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface UpdateProjectRequest {
    name?: string;
    settings?: {
        trackingEnabled?: boolean;
        country?: string;
        language?: string;
    };
}

export class ProjectService extends BaseService {
    constructor() {
        super(getBaseUrl() + "/api/v1");
    }

    // 1. Create New Project
    async createProject(data: CreateProjectRequest): Promise<Project> {
        return this.post<Project>('/projects', data);
    }

    // 2. Get User Projects
    async getProjects(params?: ProjectsListParams): Promise<ProjectsListResponse> {
        const queryParams = new URLSearchParams();
        
        if (params) {
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.sortBy) queryParams.append('sortBy', params.sortBy);
            if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
        }

        const url = `/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.get<ProjectsListResponse>(url);
    }

    // 3. Get Project Details
    async getProjectDetails(id: string): Promise<Project> {
        return this.get<Project>(`/projects/${id}`);
    }

    // 4. Update Project
    async updateProject(id: string, data: UpdateProjectRequest): Promise<Project> {
        return this.patch<Project>(`/projects/${id}`, data);
    }

    // 5. Delete Project
    async deleteProject(id: string): Promise<void> {
        return this.delete(`/projects/${id}`);
    }

    // 6. Get Project Statistics
    async getProjectStats(id: string): Promise<ProjectStats> {
        return this.get<ProjectStats>(`/projects/${id}/stats`);
    }

    // Additional helper methods for dashboard
    async getUserProjectsOverview(): Promise<ProjectsListResponse> {
        return this.getProjects({ 
            page: 1, 
            limit: 10, 
            sortBy: 'createdAt', 
            sortOrder: 'desc' 
        });
    }

    async getProjectsWithStats(): Promise<Array<Project & { stats?: ProjectStats }>> {
        const projectsResponse = await this.getUserProjectsOverview();
        const projectsWithStats = await Promise.all(
            projectsResponse.data.map(async (project) => {
                try {
                    const stats = await this.getProjectStats(project.id);
                    return { ...project, stats };
                } catch (error) {
                    // If stats fail, return project without stats
                    return project;
                }
            })
        );
        return projectsWithStats;
    }
}

export const projectService: ProjectService = new ProjectService();
