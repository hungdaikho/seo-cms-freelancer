import { BaseService } from './base.service';
import {
    Backlink,
    BacklinkAnalytics,
    BacklinkProfile,
    CreateBacklinkRequest,
    UpdateBacklinkRequest,
    BacklinksResponse,
    BacklinkQueryParams,
} from '@/types/backlink.type';
import serverConfig from '@/config/server.config.json';

class BacklinkService extends BaseService {
    constructor() {
        super(`${serverConfig.HTTP_SERVER_URL}/api/v1`);
    }

    // Get project backlinks with pagination
    async getProjectBacklinks(
        projectId: string,
        params?: BacklinkQueryParams
    ): Promise<BacklinksResponse> {
        const config = {
            params: {
                ...(params?.page && { page: params.page }),
                ...(params?.limit && { limit: params.limit }),
                ...(params?.startDate && { startDate: params.startDate }),
                ...(params?.endDate && { endDate: params.endDate })
            }
        };

        const url = `/projects/${projectId}/backlinks`;
        return this.get<BacklinksResponse>(url, config);
    }

    // Add new backlink
    async addBacklink(
        projectId: string,
        data: CreateBacklinkRequest
    ): Promise<Backlink> {
        return this.post<Backlink>(`/projects/${projectId}/backlinks`, data);
    }

    // Get backlink analytics
    async getBacklinkAnalytics(
        projectId: string,
        params?: BacklinkQueryParams
    ): Promise<BacklinkAnalytics> {
        const config = {
            params: {
                ...(params?.startDate && { startDate: params.startDate }),
                ...(params?.endDate && { endDate: params.endDate })
            }
        };

        const url = `/projects/${projectId}/backlinks/analytics`;
        return this.get<BacklinkAnalytics>(url, config);
    }

    // Get backlink details
    async getBacklinkDetails(
        projectId: string,
        backlinkId: string
    ): Promise<Backlink> {
        return this.get<Backlink>(`/projects/${projectId}/backlinks/${backlinkId}`);
    }

    // Update backlink
    async updateBacklink(
        projectId: string,
        backlinkId: string,
        data: UpdateBacklinkRequest
    ): Promise<Backlink> {
        return this.put<Backlink>(`/projects/${projectId}/backlinks/${backlinkId}`, data);
    }

    // Delete backlink
    async deleteBacklink(
        projectId: string,
        backlinkId: string
    ): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/projects/${projectId}/backlinks/${backlinkId}`);
    }

    // Bulk delete backlinks (for disavow functionality)
    async bulkDeleteBacklinks(
        projectId: string,
        backlinkIds: string[]
    ): Promise<{ message: string; deletedCount: number }> {
        return this.post<{ message: string; deletedCount: number }>(
            `/projects/${projectId}/backlinks/bulk-delete`,
            { backlinkIds }
        );
    }

    // Get backlink profile (combined analytics for the manager page)
    async getBacklinkProfile(
        projectId: string,
        params?: BacklinkQueryParams
    ): Promise<BacklinkProfile> {
        try {
            // Get analytics data
            const analytics = await this.getBacklinkAnalytics(projectId, params);

            // Get all backlinks for profile data
            const allBacklinks = await this.getProjectBacklinks(projectId, {
                limit: 1000,
                ...params
            });

            // Transform analytics to profile format
            const profile: BacklinkProfile = {
                totalBacklinks: analytics.summary.totalBacklinks,
                referringDomains: analytics.summary.totalDomains,
                domainAuthority: analytics.summary.averageAuthorityScore,
                trustFlow: analytics.summary.averageAuthorityScore, // Use as fallback
                linkTypes: {
                    follow: analytics.linkTypeDistribution.follow,
                    nofollow: analytics.linkTypeDistribution.nofollow,
                },
                anchorTextDistribution: [], // Will be calculated from backlinks
                newBacklinks: analytics.newBacklinks,
                lostBacklinks: allBacklinks.data.filter(b => b.linkStatus === 'lost'),
                topBacklinks: allBacklinks.data
                    .filter(b => b.linkStatus === 'active')
                    .sort((a, b) => b.authorityScore - a.authorityScore)
                    .slice(0, 10),
                toxicLinks: allBacklinks.data.filter(b =>
                    b.authorityScore < 20 ||
                    b.linkType === 'sponsored' ||
                    b.category === 'Spam'
                ),
            };

            // Calculate anchor text distribution
            const anchorTextMap = new Map<string, number>();
            allBacklinks.data.forEach(link => {
                if (link.anchorText) {
                    anchorTextMap.set(link.anchorText, (anchorTextMap.get(link.anchorText) || 0) + 1);
                }
            });

            profile.anchorTextDistribution = Array.from(anchorTextMap.entries())
                .map(([text, count]) => ({
                    text,
                    count,
                    percentage: Math.round((count / allBacklinks.data.length) * 100 * 10) / 10,
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);

            return profile;
        } catch (error) {
            console.error('Error fetching backlink profile:', error);
            throw error;
        }
    }
}

export const backlinkService = new BacklinkService();
