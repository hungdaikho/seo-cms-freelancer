// Utility functions for social page navigation

export const socialNavigationConfig = {
    "social-dashboard": "/admin/social",
    "social-media-tracker": "/admin/social?media-tracker",
    "social-media-poster": "/admin/social?media-poster",
    "social-analytics": "/admin/social?analytics"
};

export const navigateToSocialSection = (section: keyof typeof socialNavigationConfig) => {
    const url = socialNavigationConfig[section];
    if (typeof window !== 'undefined') {
        window.location.href = url;
    }
    return url;
};

export const getSocialSectionUrl = (section: keyof typeof socialNavigationConfig) => {
    return socialNavigationConfig[section];
};
