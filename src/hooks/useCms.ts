import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";
import {
  fetchPublicPages,
  fetchPublicPageBySlug,
  submitContactForm,
  fetchPages,
  fetchPageById,
  createPage,
  updatePage,
  deletePage,
  fetchContacts,
  fetchContactById,
  markContactAsRead,
  markContactAsReplied,
  deleteContact,
  fetchStatistics,
  clearCurrentPage,
  clearContactSubmissionSuccess,
  clearErrors,
} from "@/stores/slices/cms.slice";
import { ContactSubmission, CmsPageType, CmsPage } from "@/types/cms.type";

export const useCms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cmsState = useSelector((state: RootState) => state.cms);

  return {
    // State
    ...cmsState,

    // Actions
    fetchPublicPages: (pageType?: CmsPageType) =>
      dispatch(fetchPublicPages(pageType)),
    fetchPublicPageBySlug: (slug: string) =>
      dispatch(fetchPublicPageBySlug(slug)),
    submitContactForm: (data: ContactSubmission) =>
      dispatch(submitContactForm(data)),

    // Admin actions
    fetchPages: (params: { status?: string; pageType?: string } = {}) =>
      dispatch(fetchPages(params)),
    fetchPageById: (id: string) => dispatch(fetchPageById(id)),
    createPage: (data: Partial<CmsPage>) => dispatch(createPage(data)),
    updatePage: (id: string, data: Partial<CmsPage>) =>
      dispatch(updatePage({ id, data })),
    deletePage: (id: string) => dispatch(deletePage(id)),

    fetchContacts: (
      params: { page?: number; limit?: number; isRead?: boolean } = {}
    ) => dispatch(fetchContacts(params)),
    fetchContactById: (id: string) => dispatch(fetchContactById(id)),
    markContactAsRead: (id: string) => dispatch(markContactAsRead(id)),
    markContactAsReplied: (id: string, notes?: string) =>
      dispatch(markContactAsReplied({ id, notes })),
    deleteContact: (id: string) => dispatch(deleteContact(id)),
    fetchStatistics: () => dispatch(fetchStatistics()),

    // Utility actions
    clearCurrentPage: () => dispatch(clearCurrentPage()),
    clearContactSubmissionSuccess: () =>
      dispatch(clearContactSubmissionSuccess()),
    clearErrors: () => dispatch(clearErrors()),
  };
};

// Hook chuyên dụng cho public pages
export const useCmsPage = (slug: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, loading, error } = useSelector(
    (state: RootState) => state.cms
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicPageBySlug(slug));
    }

    return () => {
      dispatch(clearCurrentPage());
    };
  }, [slug, dispatch]);

  return {
    page: currentPage,
    loading: loading.currentPage,
    error: error.currentPage,
  };
};

// Hook chuyên dụng cho contact form
export const useContactForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading: { submitContact },
    error: { submitContact: error },
    contactSubmissionSuccess,
  } = useSelector((state: RootState) => state.cms);

  const submitForm = (data: ContactSubmission) => {
    return dispatch(submitContactForm(data));
  };

  const clearSuccess = () => {
    dispatch(clearContactSubmissionSuccess());
  };

  return {
    submitForm,
    clearSuccess,
    loading: submitContact,
    error,
    success: contactSubmissionSuccess,
  };
};

// Hook chuyên dụng cho danh sách pages theo type
export const useCmsPagesByType = (pageType: CmsPageType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pages, loading, error } = useSelector(
    (state: RootState) => state.cms
  );

  useEffect(() => {
    dispatch(fetchPublicPages(pageType));
  }, [pageType, dispatch]);

  const pagesByType = pages.filter((page: any) => page.pageType === pageType);

  return {
    pages: pagesByType,
    loading: loading.pages,
    error: error.pages,
  };
};
