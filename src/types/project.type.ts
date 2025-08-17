export interface ProjectType {
  id: string;
  name: string;
  domain: string;
  ownerId: string;
  settings: {
    country: string;
    language: string;
    trackingEnabled: boolean;
  };
  createdAt: string;
  isActive: boolean;
  _count: {
    keywords: number;
    competitors: number;
    audits: number;
    backlinks?: number;
  };
}

export interface ProjectStatsType {
  totalKeywords: number;
  averageRanking: number;
  rankingDistribution: {
    top3: number;
    top10: number;
    top50: number;
    beyond50: number;
    notRanked: number;
  };
  improvedKeywords: number;
  declinedKeywords: number;
  stableKeywords: number;
  topKeywords: Array<{
    id: string;
    keyword: string;
    currentRanking: number;
  }>;
  recentChanges: number;
  lastUpdate: string;
  auditSummary: {
    totalAudits: number;
    averageScore: number;
    criticalIssues: number;
  };
}

export interface CreateProjectType {
  name: string;
  domain: string;
  settings: {
    country: string;
    language: string;
    trackingEnabled: boolean;
  };
}

export interface ProjectWithStatsType extends ProjectType {
  stats?: ProjectStatsType;
}

export interface ProjectListResponseType {
  data: ProjectType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjectListParamsType {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
