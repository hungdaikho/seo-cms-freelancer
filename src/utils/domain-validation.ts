/**
 * Domain validation utilities
 */

export interface DomainValidationResult {
  isValid: boolean;
  cleanDomain: string;
  error?: string;
}

/**
 * Clean and validate domain input
 * Supports various TLD formats including:
 * - Standard TLDs: .com, .org, .net
 * - Country codes: .vn, .uk, .jp
 * - Multi-level: .co.uk, .id.vn, .com.au
 * - New TLDs: .cloud, .tech, .store
 */
export const validateDomain = (input: string): DomainValidationResult => {
  if (!input || typeof input !== "string") {
    return {
      isValid: false,
      cleanDomain: "",
      error: "Domain is required",
    };
  }

  // Remove protocol and trailing slash
  let cleanDomain = input
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "")
    .replace(/\/.*$/, ""); // Remove path

  // Basic format validation
  if (!cleanDomain) {
    return {
      isValid: false,
      cleanDomain: "",
      error: "Domain cannot be empty",
    };
  }

  // Check for invalid characters
  if (!/^[a-zA-Z0-9.-]+$/.test(cleanDomain)) {
    return {
      isValid: false,
      cleanDomain,
      error: "Domain contains invalid characters",
    };
  }

  // Must contain at least one dot
  if (!cleanDomain.includes(".")) {
    return {
      isValid: false,
      cleanDomain,
      error: "Domain must include extension (e.g., .com, .org)",
    };
  }

  // Split into parts
  const parts = cleanDomain.split(".");

  // Must have at least 2 parts (domain + TLD)
  if (parts.length < 2) {
    return {
      isValid: false,
      cleanDomain,
      error: "Invalid domain format",
    };
  }

  // Validate each part
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // Each part cannot be empty
    if (!part) {
      return {
        isValid: false,
        cleanDomain,
        error: "Invalid domain format (empty segment)",
      };
    }

    // Each part must start and end with alphanumeric
    if (!/^[a-zA-Z0-9]/.test(part) || !/[a-zA-Z0-9]$/.test(part)) {
      return {
        isValid: false,
        cleanDomain,
        error:
          "Domain segments must start and end with alphanumeric characters",
      };
    }

    // Each part can contain hyphens but not at start/end
    if (!/^[a-zA-Z0-9-]+$/.test(part)) {
      return {
        isValid: false,
        cleanDomain,
        error: "Domain segments contain invalid characters",
      };
    }

    // No consecutive hyphens
    if (part.includes("--")) {
      return {
        isValid: false,
        cleanDomain,
        error: "Domain cannot contain consecutive hyphens",
      };
    }

    // Length limits
    if (part.length > 63) {
      return {
        isValid: false,
        cleanDomain,
        error: "Domain segment too long (max 63 characters)",
      };
    }
  }

  // TLD validation (last part must be alphabetic and at least 2 chars)
  const tld = parts[parts.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    return {
      isValid: false,
      cleanDomain,
      error: "Invalid top-level domain (must be at least 2 letters)",
    };
  }

  // Total length check
  if (cleanDomain.length > 253) {
    return {
      isValid: false,
      cleanDomain,
      error: "Domain too long (max 253 characters)",
    };
  }

  return {
    isValid: true,
    cleanDomain,
  };
};

/**
 * Common domain examples for different regions
 */
export const DOMAIN_EXAMPLES = {
  international: ["example.com", "mysite.org", "business.net"],
  vietnam: ["example.com.vn", "site.vn", "business.id.vn"],
  uk: ["example.co.uk", "site.org.uk", "business.uk"],
  australia: ["example.com.au", "site.org.au", "business.au"],
  cloud: ["myapp.cloud", "site.tech", "store.online"],
  multilevel: ["example.co.uk", "site.id.vn", "app.com.au"],
};

/**
 * Get example placeholder based on user's country/preference
 */
export const getDomainPlaceholder = (country?: string): string => {
  const examples = {
    VN: "example.com.vn, site.vn",
    GB: "example.co.uk, site.uk",
    UK: "example.co.uk, site.uk",
    AU: "example.com.au, site.au",
    default: "example.com, mysite.org, business.cloud",
  };

  return examples[country as keyof typeof examples] || examples.default;
};
