import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BacklinkState } from '../slices/backlink.slice';

// Basic selectors
export const selectBacklinkState = (state: RootState): BacklinkState => state.backlink;

export const selectBacklinks = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.backlinks
);

export const selectBacklinkProfile = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.backlinkProfile
);

export const selectBacklinkAnalytics = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.analytics
);

export const selectSelectedBacklink = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.selectedBacklink
);

export const selectBacklinkLoading = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.loading
);

export const selectBacklinkProfileLoading = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.profileLoading
);

export const selectBacklinkAnalyticsLoading = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.analyticsLoading
);

export const selectBacklinkError = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.error
);

export const selectBacklinkPagination = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.pagination
);

export const selectBacklinkFilters = createSelector(
    [selectBacklinkState],
    (backlinkState) => backlinkState.filters
);

// Filtered backlinks based on current filters
export const selectFilteredBacklinks = createSelector(
    [selectBacklinks, selectBacklinkFilters],
    (backlinks, filters) => {
        return backlinks.filter((backlink) => {
            // Search term filter
            if (filters.searchTerm) {
                const searchLower = filters.searchTerm.toLowerCase();
                const matchesSearch =
                    backlink.sourceDomain.toLowerCase().includes(searchLower) ||
                    backlink.anchorText?.toLowerCase().includes(searchLower) ||
                    backlink.targetUrl.toLowerCase().includes(searchLower);

                if (!matchesSearch) return false;
            }

            // Link type filter
            if (filters.linkType !== 'all') {
                if (filters.linkType === 'follow' && backlink.linkType !== 'follow') return false;
                if (filters.linkType === 'nofollow' && backlink.linkType !== 'nofollow') return false;
                if (filters.linkType === 'sponsored' && backlink.linkType !== 'sponsored') return false;
                if (filters.linkType === 'ugc' && backlink.linkType !== 'ugc') return false;
            }

            // Link status filter
            if (filters.linkStatus !== 'all') {
                if (filters.linkStatus === 'new' && backlink.linkStatus !== 'new') return false;
                if (filters.linkStatus === 'active' && backlink.linkStatus !== 'active') return false;
                if (filters.linkStatus === 'lost' && backlink.linkStatus !== 'lost') return false;
            }

            return true;
        });
    }
);

// New backlinks from profile
export const selectNewBacklinks = createSelector(
    [selectBacklinkProfile],
    (profile) => profile?.newBacklinks || []
);

// Lost backlinks from profile
export const selectLostBacklinks = createSelector(
    [selectBacklinkProfile],
    (profile) => profile?.lostBacklinks || []
);

// Top backlinks from profile
export const selectTopBacklinks = createSelector(
    [selectBacklinkProfile],
    (profile) => profile?.topBacklinks || []
);

// Toxic links from profile
export const selectToxicLinks = createSelector(
    [selectBacklinkProfile],
    (profile) => profile?.toxicLinks || []
);

// All backlinks combined for table display
export const selectAllBacklinksForTable = createSelector(
    [selectNewBacklinks, selectTopBacklinks, selectLostBacklinks],
    (newBacklinks, topBacklinks, lostBacklinks) => {
        return [...newBacklinks, ...topBacklinks, ...lostBacklinks];
    }
);

// Summary statistics from profile
export const selectBacklinkSummary = createSelector(
    [selectBacklinkProfile],
    (profile) => {
        if (!profile) return null;

        return {
            totalBacklinks: profile.totalBacklinks,
            referringDomains: profile.referringDomains,
            domainAuthority: profile.domainAuthority,
            trustFlow: profile.trustFlow,
            followLinks: profile.linkTypes.follow,
            nofollowLinks: profile.linkTypes.nofollow,
            newBacklinksCount: profile.newBacklinks.length,
            lostBacklinksCount: profile.lostBacklinks.length,
            toxicLinksCount: profile.toxicLinks.length,
        };
    }
);

// Anchor text distribution
export const selectAnchorTextDistribution = createSelector(
    [selectBacklinkProfile],
    (profile) => profile?.anchorTextDistribution || []
);

// Authority score distribution for charts
export const selectAuthorityScoreDistribution = createSelector(
    [selectBacklinks],
    (backlinks) => {
        const distribution = {
            '0-20': 0,
            '21-40': 0,
            '41-60': 0,
            '61-80': 0,
            '81-100': 0,
        };

        backlinks.forEach((backlink) => {
            const score = backlink.authorityScore || backlink.domainAuthority || 0;
            if (score <= 20) distribution['0-20']++;
            else if (score <= 40) distribution['21-40']++;
            else if (score <= 60) distribution['41-60']++;
            else if (score <= 80) distribution['61-80']++;
            else distribution['81-100']++;
        });

        return distribution;
    }
);

// Link type distribution for charts
export const selectLinkTypeDistribution = createSelector(
    [selectBacklinks],
    (backlinks) => {
        const distribution = {
            follow: 0,
            nofollow: 0,
            sponsored: 0,
            ugc: 0,
        };

        backlinks.forEach((backlink) => {
            distribution[backlink.linkType]++;
        });

        return distribution;
    }
);

// Top referring domains
export const selectTopReferringDomains = createSelector(
    [selectBacklinks],
    (backlinks) => {
        const domainCount = new Map<string, number>();

        backlinks.forEach((backlink) => {
            const domain = backlink.sourceDomain;
            domainCount.set(domain, (domainCount.get(domain) || 0) + 1);
        });

        return Array.from(domainCount.entries())
            .map(([domain, count]) => ({ domain, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }
);

// Most linked target URLs
export const selectTopTargetUrls = createSelector(
    [selectBacklinks],
    (backlinks) => {
        const urlCount = new Map<string, number>();

        backlinks.forEach((backlink) => {
            const url = backlink.targetUrl;
            urlCount.set(url, (urlCount.get(url) || 0) + 1);
        });

        return Array.from(urlCount.entries())
            .map(([url, count]) => ({ url, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }
);

// Loading states combined
export const selectAnyBacklinkLoading = createSelector(
    [selectBacklinkLoading, selectBacklinkProfileLoading, selectBacklinkAnalyticsLoading],
    (loading, profileLoading, analyticsLoading) =>
        loading || profileLoading || analyticsLoading
);
