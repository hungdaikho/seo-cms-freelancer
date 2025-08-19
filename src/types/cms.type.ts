export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  pageType: CmsPageType;
  content: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: CmsPageStatus;
  sortOrder: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  sections: CmsPageSection[];
  isSystem?: boolean;
  lastEditedBy?: string;
  lastEditor?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CmsPageSection {
  id: string;
  title: string;
  content: string;
  sectionType: CmsSectionType;
  settings: Record<string, any>;
  sortOrder: number;
  isActive: boolean;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  company?: string;
  website?: string;
  contactType?: ContactType;
}

export interface ContactSubmissionResponse extends ContactSubmission {
  id: string;
  contactType: ContactType;
  ipAddress: string;
  userAgent: string;
  isRead: boolean;
  isReplied: boolean;
  repliedAt?: string;
  notes?: string;
  createdAt: string;
  replier?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CmsStatistics {
  pages: {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
  contacts: {
    total: number;
    unread: number;
    unreplied: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    skip: number;
    take: number;
    hasMore: boolean;
  };
}

// Enums
export type CmsPageType =
  | "about_us"
  | "legal_info"
  | "privacy_policy"
  | "cookie_settings"
  | "security_info"
  | "contact_us"
  | "terms_of_service"
  | "custom";

export type CmsPageStatus = "draft" | "published" | "archived";

export type CmsSectionType =
  | "text"
  | "image"
  | "video"
  | "contact_form"
  | "faq";

export type ContactType = "general" | "support" | "sales" | "partnership";

// Redux State
export interface CmsState {
  pages: CmsPage[];
  currentPage: CmsPage | null;
  contacts: ContactSubmissionResponse[];
  statistics: CmsStatistics | null;
  loading: {
    pages: boolean;
    currentPage: boolean;
    contacts: boolean;
    statistics: boolean;
    submitContact: boolean;
  };
  error: {
    pages: string | null;
    currentPage: string | null;
    contacts: string | null;
    statistics: string | null;
    submitContact: string | null;
  };
  contactSubmissionSuccess: boolean;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company: string;
  website: string;
  contactType: ContactType;
}

export interface CmsPageFormData {
  title: string;
  slug: string;
  pageType: CmsPageType;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: CmsPageStatus;
  sortOrder: number;
}
