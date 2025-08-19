import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { cmsService } from "@/services/cms.service";
import {
  CmsState,
  CmsPage,
  ContactSubmission,
  ContactSubmissionResponse,
  CmsStatistics,
  PaginatedResponse,
  CmsPageType,
} from "@/types/cms.type";

// Initial state
const initialState: CmsState = {
  pages: [],
  currentPage: null,
  contacts: [],
  statistics: null,
  loading: {
    pages: false,
    currentPage: false,
    contacts: false,
    statistics: false,
    submitContact: false,
  },
  error: {
    pages: null,
    currentPage: null,
    contacts: null,
    statistics: null,
    submitContact: null,
  },
  contactSubmissionSuccess: false,
};

// Async thunks for public APIs
export const fetchPublicPages = createAsyncThunk(
  "cms/fetchPublicPages",
  async (pageType?: CmsPageType) => {
    return await cmsService.getPublicPages(pageType);
  }
);

export const fetchPublicPageBySlug = createAsyncThunk(
  "cms/fetchPublicPageBySlug",
  async (slug: string) => {
    return await cmsService.getPublicPageBySlug(slug);
  }
);

export const submitContactForm = createAsyncThunk(
  "cms/submitContactForm",
  async (data: ContactSubmission) => {
    return await cmsService.submitContact(data);
  }
);

// Async thunks for admin APIs
export const fetchPages = createAsyncThunk(
  "cms/fetchPages",
  async ({ status, pageType }: { status?: string; pageType?: string } = {}) => {
    return await cmsService.getPages(status, pageType);
  }
);

export const fetchPageById = createAsyncThunk(
  "cms/fetchPageById",
  async (id: string) => {
    return await cmsService.getPageById(id);
  }
);

export const createPage = createAsyncThunk(
  "cms/createPage",
  async (data: Partial<CmsPage>) => {
    return await cmsService.createPage(data);
  }
);

export const updatePage = createAsyncThunk(
  "cms/updatePage",
  async ({ id, data }: { id: string; data: Partial<CmsPage> }) => {
    return await cmsService.updatePage(id, data);
  }
);

export const deletePage = createAsyncThunk(
  "cms/deletePage",
  async (id: string) => {
    await cmsService.deletePage(id);
    return id;
  }
);

export const fetchContacts = createAsyncThunk(
  "cms/fetchContacts",
  async ({
    page = 1,
    limit = 20,
    isRead,
  }: { page?: number; limit?: number; isRead?: boolean } = {}) => {
    return await cmsService.getContacts(page, limit, isRead);
  }
);

export const fetchContactById = createAsyncThunk(
  "cms/fetchContactById",
  async (id: string) => {
    return await cmsService.getContactById(id);
  }
);

export const markContactAsRead = createAsyncThunk(
  "cms/markContactAsRead",
  async (id: string) => {
    await cmsService.markContactAsRead(id);
    return id;
  }
);

export const markContactAsReplied = createAsyncThunk(
  "cms/markContactAsReplied",
  async ({ id, notes }: { id: string; notes?: string }) => {
    await cmsService.markContactAsReplied(id, notes);
    return { id, notes };
  }
);

export const deleteContact = createAsyncThunk(
  "cms/deleteContact",
  async (id: string) => {
    await cmsService.deleteContact(id);
    return id;
  }
);

export const fetchStatistics = createAsyncThunk(
  "cms/fetchStatistics",
  async () => {
    return await cmsService.getStatistics();
  }
);

// Slice
const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    clearCurrentPage: (state) => {
      state.currentPage = null;
    },
    clearContactSubmissionSuccess: (state) => {
      state.contactSubmissionSuccess = false;
    },
    clearErrors: (state) => {
      state.error = {
        pages: null,
        currentPage: null,
        contacts: null,
        statistics: null,
        submitContact: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch public pages
    builder
      .addCase(fetchPublicPages.pending, (state) => {
        state.loading.pages = true;
        state.error.pages = null;
      })
      .addCase(fetchPublicPages.fulfilled, (state, action) => {
        state.loading.pages = false;
        state.pages = action.payload;
      })
      .addCase(fetchPublicPages.rejected, (state, action) => {
        state.loading.pages = false;
        state.error.pages = action.error.message || "Failed to fetch pages";
      });

    // Fetch public page by slug
    builder
      .addCase(fetchPublicPageBySlug.pending, (state) => {
        state.loading.currentPage = true;
        state.error.currentPage = null;
      })
      .addCase(fetchPublicPageBySlug.fulfilled, (state, action) => {
        state.loading.currentPage = false;
        state.currentPage = action.payload;
      })
      .addCase(fetchPublicPageBySlug.rejected, (state, action) => {
        state.loading.currentPage = false;
        state.error.currentPage =
          action.error.message || "Failed to fetch page";
      });

    // Submit contact form
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading.submitContact = true;
        state.error.submitContact = null;
        state.contactSubmissionSuccess = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading.submitContact = false;
        state.contactSubmissionSuccess = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading.submitContact = false;
        state.error.submitContact =
          action.error.message || "Failed to submit contact form";
      });

    // Fetch pages (admin)
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading.pages = true;
        state.error.pages = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading.pages = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading.pages = false;
        state.error.pages = action.error.message || "Failed to fetch pages";
      });

    // Fetch page by ID
    builder
      .addCase(fetchPageById.pending, (state) => {
        state.loading.currentPage = true;
        state.error.currentPage = null;
      })
      .addCase(fetchPageById.fulfilled, (state, action) => {
        state.loading.currentPage = false;
        state.currentPage = action.payload;
      })
      .addCase(fetchPageById.rejected, (state, action) => {
        state.loading.currentPage = false;
        state.error.currentPage =
          action.error.message || "Failed to fetch page";
      });

    // Create page
    builder.addCase(createPage.fulfilled, (state, action) => {
      state.pages.push(action.payload);
    });

    // Update page
    builder.addCase(updatePage.fulfilled, (state, action) => {
      const index = state.pages.findIndex(
        (page) => page.id === action.payload.id
      );
      if (index !== -1) {
        state.pages[index] = action.payload;
      }
      if (state.currentPage?.id === action.payload.id) {
        state.currentPage = action.payload;
      }
    });

    // Delete page
    builder.addCase(deletePage.fulfilled, (state, action) => {
      state.pages = state.pages.filter((page) => page.id !== action.payload);
      if (state.currentPage?.id === action.payload) {
        state.currentPage = null;
      }
    });

    // Fetch contacts
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading.contacts = true;
        state.error.contacts = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading.contacts = false;
        state.contacts = action.payload.data;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading.contacts = false;
        state.error.contacts =
          action.error.message || "Failed to fetch contacts";
      });

    // Mark contact as read
    builder.addCase(markContactAsRead.fulfilled, (state, action) => {
      const contact = state.contacts.find((c) => c.id === action.payload);
      if (contact) {
        contact.isRead = true;
      }
    });

    // Mark contact as replied
    builder.addCase(markContactAsReplied.fulfilled, (state, action) => {
      const contact = state.contacts.find((c) => c.id === action.payload.id);
      if (contact) {
        contact.isReplied = true;
        contact.repliedAt = new Date().toISOString();
        if (action.payload.notes) {
          contact.notes = action.payload.notes;
        }
      }
    });

    // Delete contact
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    });

    // Fetch statistics
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading.statistics = true;
        state.error.statistics = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading.statistics = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading.statistics = false;
        state.error.statistics =
          action.error.message || "Failed to fetch statistics";
      });
  },
});

export const { clearCurrentPage, clearContactSubmissionSuccess, clearErrors } =
  cmsSlice.actions;
export default cmsSlice.reducer;
