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
        keyWordsArray: string[]
    };
}

export interface Project {
    id: string;
    name: string;
    domain: string;
    ownerId: string;
    description?: string;
    isShared?: boolean;
    shareCode?: string;
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
        members?: number;
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

// Project Sharing Types
export interface SharedProject {
    id: string;
    name: string;
    domain: string;
    description?: string;
    shareCode: string;
    owner: {
        id: string;
        name: string;
        email: string;
    };
    _count: {
        keywords: number;
        competitors: number;
        audits: number;
        members: number;
    };
}

export interface SharedProjectsSearchResponse {
    data: SharedProject[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProjectMember {
    id: string;
    projectId: string;
    userId: string;
    role: 'member' | 'moderator';
    status: 'active' | 'inactive';
    appliedAt: string;
    approvedAt?: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl?: string;
    };
}

export interface ProjectMembership {
    id: string;
    projectId: string;
    userId: string;
    role: 'member' | 'moderator';
    status: 'active' | 'inactive';
    appliedAt: string;
    project: {
        id: string;
        name: string;
        domain: string;
        description?: string;
        owner: {
            id: string;
            name: string;
            email: string;
        };
        _count: {
            keywords: number;
            competitors: number;
            audits: number;
            members: number;
        };
    };
}

export interface AppliedProjectsResponse {
    data: ProjectMembership[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProjectMembersResponse {
    data: ProjectMember[];
    total: number;
}

export interface SharedProjectsSearchParams {
    search?: string;
    shareCode?: string;
    page?: number;
    limit?: number;
}

export interface ApplyToProjectRequest {
    shareCode: string;
}

export interface ToggleSharingRequest {
    isShared: boolean;
}

export interface ToggleSharingResponse {
    id: string;
    name: string;
    domain: string;
    isShared: boolean;
    shareCode?: string;
    message: string;
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

    // Project Sharing Methods

    // 1. Search Shared Projects
    async searchSharedProjects(params?: SharedProjectsSearchParams): Promise<SharedProjectsSearchResponse> {
        const queryParams = new URLSearchParams();

        if (params) {
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.shareCode) queryParams.append('shareCode', params.shareCode);
        }

        const url = `/projects/shared/search${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.get<SharedProjectsSearchResponse>(url);
    }

    // 2. Apply to Project
    async applyToProject(data: ApplyToProjectRequest): Promise<{ message: string; membership: ProjectMembership }> {
        return this.post<{ message: string; membership: ProjectMembership }>('/projects/shared/apply', data);
    }

    // 3. Get Applied Projects
    async getAppliedProjects(params?: ProjectsListParams): Promise<AppliedProjectsResponse> {
        const queryParams = new URLSearchParams();

        if (params) {
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.sortBy) queryParams.append('sortBy', params.sortBy);
            if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
        }

        const url = `/projects/applied${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.get<AppliedProjectsResponse>(url);
    }

    // 4. Leave Applied Project
    async leaveAppliedProject(projectId: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/projects/applied/${projectId}`);
    }

    // 5. Toggle Project Sharing
    async toggleProjectSharing(id: string, data: ToggleSharingRequest): Promise<ToggleSharingResponse> {
        return this.patch<ToggleSharingResponse>(`/projects/${id}/sharing`, data);
    }

    // 6. Get Project Members
    async getProjectMembers(id: string): Promise<ProjectMembersResponse> {
        return this.get<ProjectMembersResponse>(`/projects/${id}/members`);
    }

    // 7. Remove Project Member
    async removeProjectMember(projectId: string, memberId: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/projects/${projectId}/members/${memberId}`);
    }

    // Additional helper methods for shared projects
    async getSharedProjectsOverview(): Promise<SharedProjectsSearchResponse> {
        return this.searchSharedProjects({
            page: 1,
            limit: 10
        });
    }

    async getAppliedProjectsOverview(): Promise<AppliedProjectsResponse> {
        return this.getAppliedProjects({
            page: 1,
            limit: 10,
            sortBy: 'appliedAt',
            sortOrder: 'desc'
        });
    }
}

export const projectService: ProjectService = new ProjectService();
