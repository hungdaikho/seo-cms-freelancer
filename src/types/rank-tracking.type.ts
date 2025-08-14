export interface Project {
    id: string;
    name: string;
    websiteUrl: string;
    location: string;
    keywords: string[];
    createdAt: string;
    lastUpdated: string;
}

export interface KeywordData {
    id: string;
    keyword: string;
    position: number;
    change: number;
    volume: number;
    difficulty: number;
    url: string;
}

export interface RankingData {
    date: string;
    position: number;
}

export interface RankingStats {
    keywordsUp: number;
    keywordsDown: number;
    keywordsUnchanged: number;
    averagePosition: number;
}

export interface SerpAnalysisData {
    id: string;
    url: string;
    page: number;
    backlinks: string;
    searchTraffic: string;
    keywords: number;
}

export interface CreateProjectData {
    name: string;
    websiteUrl: string;
    location: string;
    keywords: string[];
}
