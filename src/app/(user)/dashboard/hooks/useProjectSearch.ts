import { useState, useEffect, useCallback } from 'react';

export const useProjectSearch = (projects: any[]) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  // Helper function to normalize text for search (handle Vietnamese characters)
  const normalizeText = useCallback((text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
  }, []);

  // Debounce hook for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Filter projects based on search and country
  const filterProjects = useCallback(() => {
    let filtered = [...projects];

    console.log('🔍 Filtering projects:', {
      totalProjects: projects.length,
      searchValue: debouncedSearchValue,
      selectedCountry,
      projectNames: projects.map(p => p.name)
    });

    // Filter by search term
    if (debouncedSearchValue) {
      const searchTerm = normalizeText(debouncedSearchValue);
      console.log('🔎 Normalized search term:', searchTerm);
      
      filtered = filtered.filter(project => {
        const normalizedName = normalizeText(project.name);
        const normalizedDomain = normalizeText(project.domain);
        
        const nameMatch = normalizedName.includes(searchTerm);
        const domainMatch = normalizedDomain.includes(searchTerm);
        
        const matches = nameMatch || domainMatch;
        
        console.log('🔍 Project check:', {
          projectName: project.name,
          normalizedName,
          searchTerm,
          nameMatch,
          domainMatch,
          matches
        });
        
        return matches;
      });
      
      console.log('🎯 Filtered results:', filtered.map(p => p.name));
    }

    // Filter by selected country
    if (selectedCountry && selectedCountry !== "ALL") {
      filtered = filtered.filter(project => 
        project.settings?.country === selectedCountry
      );
    }

    console.log('📊 Final filtered count:', filtered.length);
    return filtered;
  }, [projects, debouncedSearchValue, selectedCountry, normalizeText]);

  // Update filtered projects when dependencies change
  useEffect(() => {
    const newFilteredProjects = filterProjects();
    setFilteredProjects(newFilteredProjects);
    console.log('🔄 Filtered projects updated:', {
      search: debouncedSearchValue,
      country: selectedCountry,
      resultCount: newFilteredProjects.length,
      results: newFilteredProjects.map(p => p.name)
    });
  }, [filterProjects]);

  // Clear search and filters
  const clearSearch = useCallback(() => {
    setSearchValue("");
    setDebouncedSearchValue("");
    setSelectedCountry("ALL");
  }, []);

  return {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
    selectedCountry,
    setSelectedCountry,
    filteredProjects,
    clearSearch,
    isFiltered: Boolean(debouncedSearchValue) || selectedCountry !== "ALL"
  };
};
