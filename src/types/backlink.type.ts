// Backlink Analytics Types
export interface Backlink {
    id: string;
    sourceDomain: string;
    sourceUrl?: string;
    targetUrl: string;
    anchorText?: string;
    linkType: 'follow' | 'nofollow' | 'sponsored' | 'ugc';
    linkStatus?: 'active' | 'new' | 'lost';
    authorityScore: number;
    domainAuthority?: number;
    pageAuthority?: number;
    trustFlow?: number;
    citationFlow?: number;
    isActive: boolean;
    isSponsored?: boolean;
    isUGC?: boolean;
    linkPosition?: string;
    category?: string;
    discoveredAt: string;
    firstSeen?: string;
    lastSeen?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBacklinkRequest {
    sourceDomain: string;
    targetUrl: string;
    anchorText?: string;
    linkType: 'follow' | 'nofollow' | 'sponsored' | 'ugc';
    authorityScore: number;
}

export interface UpdateBacklinkRequest {
    anchorText?: string;
    linkType?: 'follow' | 'nofollow' | 'sponsored' | 'ugc';
    authorityScore?: number;
    isActive?: boolean;
}

export interface BacklinkAnalytics {
    summary: {
        totalBacklinks: number;
        totalDomains: number;
        activeLinks: number;
        followLinks: number;
        nofollowLinks: number;
        averageAuthorityScore: number;
        newBacklinksCount: number;
    };
    newBacklinks: Backlink[];
    topDomains: Array<{
        domain: string;
        count: number;
    }>;
    topTargetUrls: Array<{
        url: string;
        count: number;
    }>;
    linkTypeDistribution: {
        follow: number;
        nofollow: number;
        unknown: number;
    };
    authorityDistribution: {
        '0-20': number;
        '21-40': number;
        '41-60': number;
        '61-80': number;
        '81-100': number;
    };
}

export interface BacklinkProfile {
    totalBacklinks: number;
    referringDomains: number;
    domainAuthority: number;
    trustFlow: number;
    linkTypes: {
        follow: number;
        nofollow: number;
    };
    anchorTextDistribution: Array<{
        text: string;
        count: number;
        percentage: number;
    }>;
    newBacklinks: Backlink[];
    lostBacklinks: Backlink[];
    topBacklinks: Backlink[];
    toxicLinks: Backlink[];
}

export interface BacklinkQueryParams {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}

export interface BacklinksResponse {
    data: Backlink[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
