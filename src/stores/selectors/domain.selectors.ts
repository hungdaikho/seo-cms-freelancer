import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Base selector
const selectDomainState = (state: RootState) => state.domain;

// Domain overview selectors
export const selectDomainOverview = createSelector(
    selectDomainState,
    (domain) => domain.overview
);

export const selectDomainOverviewLoading = createSelector(
    selectDomainState,
    (domain) => domain.overviewLoading
);

export const selectDomainOverviewError = createSelector(
    selectDomainState,
    (domain) => domain.overviewError
);

// Top keywords selectors
export const selectTopKeywords = createSelector(
    selectDomainState,
    (domain) => domain.topKeywords
);

export const selectTopKeywordsLoading = createSelector(
    selectDomainState,
    (domain) => domain.topKeywordsLoading
);

export const selectTopKeywordsError = createSelector(
    selectDomainState,
    (domain) => domain.topKeywordsError
);

// Competitors selectors
export const selectCompetitors = createSelector(
    selectDomainState,
    (domain) => domain.competitors
);

export const selectCompetitorsLoading = createSelector(
    selectDomainState,
    (domain) => domain.competitorsLoading
);

export const selectCompetitorsError = createSelector(
    selectDomainState,
    (domain) => domain.competitorsError
);

// Topics selectors
export const selectTopics = createSelector(
    selectDomainState,
    (domain) => domain.topics
);

export const selectTopicsLoading = createSelector(
    selectDomainState,
    (domain) => domain.topicsLoading
);

export const selectTopicsError = createSelector(
    selectDomainState,
    (domain) => domain.topicsError
);

// Domain authority selectors
export const selectDomainAuthority = createSelector(
    selectDomainState,
    (domain) => domain.authority
);

export const selectDomainAuthorityLoading = createSelector(
    selectDomainState,
    (domain) => domain.authorityLoading
);

export const selectDomainAuthorityError = createSelector(
    selectDomainState,
    (domain) => domain.authorityError
);

// UI state selectors
export const selectSelectedDomain = createSelector(
    selectDomainState,
    (domain) => domain.selectedDomain
);

export const selectSelectedCountry = createSelector(
    selectDomainState,
    (domain) => domain.selectedCountry
);

export const selectMonitoredDomains = createSelector(
    selectDomainState,
    (domain) => domain.monitoredDomains
);

// Combined selectors
export const selectIsAnyLoading = createSelector(
    selectDomainState,
    (domain) =>
        domain.overviewLoading ||
        domain.topKeywordsLoading ||
        domain.competitorsLoading ||
        domain.topicsLoading ||
        domain.authorityLoading
);

export const selectHasAnyError = createSelector(
    selectDomainState,
    (domain) =>
        !!domain.overviewError ||
        !!domain.topKeywordsError ||
        !!domain.competitorsError ||
        !!domain.topicsError ||
        !!domain.authorityError
);

export const selectAllErrors = createSelector(
    selectDomainState,
    (domain) => [
        domain.overviewError,
        domain.topKeywordsError,
        domain.competitorsError,
        domain.topicsError,
        domain.authorityError,
    ].filter(Boolean)
);
