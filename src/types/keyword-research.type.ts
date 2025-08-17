// ====================================================================
// KEYWORD RESEARCH TYPES
// ====================================================================

export type TrendType = "rising" | "stable" | "declining" | "high";
export type IntentType =
  | "informational"
  | "commercial"
  | "transactional"
  | "navigational";
export type DifficultyLevel =
  | "Very Easy"
  | "Easy"
  | "Medium"
  | "Hard"
  | "Very Hard";
export type ContentType =
  | "blog"
  | "tutorial"
  | "case-study"
  | "guide"
  | "comparison"
  | "listicle";
export type CompetitionLevel = "low" | "medium" | "high";
export type SeasonalityType = "stable" | "growing" | "seasonal" | "declining";
export type QuestionType = "what" | "how" | "why" | "when" | "where" | "who";
export type AnswerType =
  | "definition"
  | "explanation"
  | "tutorial"
  | "comparison"
  | "list";

// ====================================================================
// BASIC INTERFACES
// ====================================================================

export interface BaseKeyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc?: number;
  intent: IntentType;
  trend: TrendType;
}

export interface KeywordFeatures {
  features?: string[];
  featuredSnippetChance?: number;
}

// ====================================================================
// KEYWORD ANALYSIS
// ====================================================================

export interface KeywordAnalysisResult extends BaseKeyword, KeywordFeatures {
  position?: number;
  previousPosition?: number;
  trafficShare?: number;
  url?: string;
  lastUpdated?: string;
}

export interface KeywordAnalysisParams {
  domain: string;
  country?: string;
  limit?: number;
  offset?: number;
  sortBy?: "position" | "traffic" | "volume" | "difficulty";
  sortOrder?: "asc" | "desc";
}

export interface KeywordAnalysisResponse {
  data: KeywordAnalysisResult[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ====================================================================
// KEYWORD VARIATIONS
// ====================================================================

export interface KeywordVariation extends BaseKeyword {
  paidDifficulty?: number;
  type: "variation" | "related" | "suggestion";
}

export interface KeywordVariationsResponse {
  baseKeyword: string;
  variations: KeywordVariation[];
  suggestions: number;
  related: number;
  questions: number;
}

// ====================================================================
// KEYWORD MAGIC TOOL
// ====================================================================

export interface KeywordMagicFilters {
  minSearchVolume?: number;
  maxSearchVolume?: number;
  minDifficulty?: number;
  maxDifficulty?: number;
  intents?: IntentType[];
  countries?: string[];
}

export interface KeywordMagicParams {
  seedKeyword: string;
  country?: string;
  includeLongTail?: boolean;
  includeQuestions?: boolean;
  includeRelated?: boolean;
  filters?: KeywordMagicFilters;
}

export interface PrimaryKeyword extends BaseKeyword {
  competition: CompetitionLevel;
  opportunity: number;
}

export interface LongTailKeyword extends BaseKeyword {
  parentKeyword: string;
  wordCount: number;
  competitionLevel: CompetitionLevel;
  opportunity: number;
}

export interface QuestionKeyword {
  question: string;
  searchVolume: number;
  difficulty: number;
  questionType: QuestionType;
  answerType: AnswerType;
  featuredSnippetChance: number;
  intent: IntentType;
  relatedQuestions?: string[];
}

export interface KeywordMagicSummary {
  avgSearchVolume: number;
  avgDifficulty: number;
  totalEstimatedTraffic: number;
  topIntent: IntentType;
  competitionLevel: CompetitionLevel;
}

export interface KeywordMagicResponse {
  seedKeyword: string;
  totalKeywords: number;
  summary: KeywordMagicSummary;
  primaryKeywords: PrimaryKeyword[];
  longTailKeywords: LongTailKeyword[];
  questionKeywords: QuestionKeyword[];
}

// ====================================================================
// TOPIC RESEARCH
// ====================================================================

export interface TopicOverview {
  searchVolume: number;
  competition: CompetitionLevel;
  interest: Array<{ month: string; value: number }>;
  videoCount: number;
}

export interface TopVideo {
  title: string;
  views: number;
  engagement: number;
}

export interface TopicResearchResponse {
  keyword: string;
  country: string;
  overview: TopicOverview;
  relatedKeywords: string[];
  suggestions: string[];
  risingTopics: string[];
  topVideos: TopVideo[];
}

// ====================================================================
// CONTENT IDEAS
// ====================================================================

export interface TopicIdea {
  title: string;
  volume: number;
  difficulty: number;
  opportunity: number;
  contentType: ContentType;
  estimatedTraffic: number;
  seasonality: SeasonalityType;
  competitiveness: number;
}

export interface ContentIdeaMetrics {
  avgVolume: number;
  avgDifficulty: number;
  avgOpportunity: number;
  totalIdeas: number;
}

export interface TopicIdeaParams {
  seedKeyword: string;
  country?: string;
  limit?: number;
  industry?: string;
  contentTypes?: ContentType[];
}

export interface TopicIdeaResponse {
  seedKeyword: string;
  country: string;
  topicIdeas: TopicIdea[];
  metrics: ContentIdeaMetrics;
}

// ====================================================================
// TRENDING TOPICS
// ====================================================================

export interface TrendingTopic {
  topic: string;
  volume: number;
  growth: number;
  category: string;
}

export interface TrendingTopicsResponse {
  trendingTopics: TrendingTopic[];
  category: string;
  country: string;
  lastUpdated: string;
}

// ====================================================================
// QUESTION-BASED CONTENT
// ====================================================================

export interface QuestionBasedContent {
  question: string;
  searchVolume: number;
  difficulty: number;
  intent: IntentType;
  answerLength: "short" | "medium" | "long";
  featuredSnippetChance: number;
  relatedQuestions: string[];
}

export interface QuestionBasedContentResponse {
  topic: string;
  questions: QuestionBasedContent[];
  total: number;
  country: string;
}

// ====================================================================
// AI CONTENT IDEAS
// ====================================================================

export interface AIContentIdea {
  title: string;
  description: string;
  contentType: ContentType;
  estimatedWordCount: number;
  targetKeywords: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTraffic: number;
}

export interface AIContentIdeaParams {
  topic: string;
  audience?: string;
  format?: ContentType;
  count?: number;
}

export interface AIContentIdeaResponse {
  ideas: AIContentIdea[];
  contentPillars: string[];
}

// ====================================================================
// RELATED TOPICS
// ====================================================================

export interface RelatedTopic {
  topic: string;
  relevance: number;
  volume: number;
  difficulty: number;
  trending: boolean;
  topKeywords: string[];
  contentOpportunities: number;
}

export interface TopicCluster {
  clusterName: string;
  topics: string[];
  relevance: number;
}

export interface RelatedTopicsResponse {
  baseTopic: string;
  country: string;
  relatedTopics: RelatedTopic[];
  clusters: TopicCluster[];
  total: number;
}

// ====================================================================
// KEYWORD DIFFICULTY ANALYSIS
// ====================================================================

export interface KeywordDifficultyFactors {
  searchResultsCount: number;
  avgDomainAuthority: number;
  avgPageAuthority: number;
  avgBacklinks: number;
  contentQuality: number;
  competitionDensity: number;
  commercialIntent: number;
}

export interface TopCompetitor {
  url: string;
  domainAuthority: number;
  pageAuthority: number;
  backlinks: number;
  position: number;
}

export interface KeywordDifficultyResult {
  keyword: string;
  difficulty: number;
  difficultyLevel: DifficultyLevel;
  searchVolume: number;
  factors: KeywordDifficultyFactors;
  topCompetitors: TopCompetitor[];
  recommendations: string[];
}

export interface KeywordDifficultyParams {
  keywords: string[];
  country?: string;
}

export interface KeywordDifficultyResponse {
  results: KeywordDifficultyResult[];
}

// ====================================================================
// LONG-TAIL KEYWORDS
// ====================================================================

export interface LongTailKeywordParams {
  seedKeyword: string;
  country?: string;
  industry?: string;
  intent?: IntentType;
  minWords?: number;
  maxWords?: number;
  count?: number;
}

export interface LongTailKeywordResponse {
  seedKeyword: string;
  longTailKeywords: LongTailKeyword[];
  total: number;
  avgDifficulty: number;
  avgOpportunity: number;
}

// ====================================================================
// QUESTION KEYWORDS
// ====================================================================

export interface QuestionKeywordParams {
  seedKeyword: string;
  country?: string;
  questionTypes?: QuestionType[];
  count?: number;
}

export type QuestionKeywordStats = {
  [key in QuestionType]: number;
};

export interface QuestionKeywordResponse {
  seedKeyword: string;
  questionKeywords: QuestionKeyword[];
  total: number;
  questionTypes: QuestionKeywordStats;
}

// ====================================================================
// SEASONAL TRENDS
// ====================================================================

export interface SeasonalData {
  month: string;
  volume: number;
  trend: TrendType;
}

export interface SeasonalKeywordTrend {
  keyword: string;
  seasonalData: SeasonalData[];
  peakMonths: string[];
  lowMonths: string[];
  yearlyTrend: TrendType;
  seasonalityScore: number;
}

export interface SeasonalTrendsParams {
  keywords: string[];
  timeframe?: "3months" | "6months" | "12months" | "24months";
  country?: string;
}

export interface SeasonalTrendsResponse {
  keywords: SeasonalKeywordTrend[];
  timeframe: string;
  country: string;
}

// ====================================================================
// PUBLIC API TYPES
// ====================================================================

export interface PublicKeywordSuggestion {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  intent: IntentType;
  relevanceScore: number;
  category: string;
}

export interface PublicKeywordParams {
  seedKeyword: string;
  industry?: string;
  location?: string;
}

export interface AITestConnection {
  message: string;
  response: {
    status: string;
    model: string;
    timestamp: string;
  };
}

// ====================================================================
// SERP ANALYSIS
// ====================================================================

export interface SerpResult {
  rank: number;
  url: string;
  title: string;
  pageRank: number;
  backlinks: string;
  searchTraffic: string;
  keywords: number;
  domain: string;
  snippet?: string;
}

export interface SerpAnalysisResponse {
  serpData: SerpResult[];
  total: number;
  keyword: string;
  lastUpdated: string;
}

// ====================================================================
// TOP PAGES ANALYSIS
// ====================================================================

export interface TopPage {
  url: string;
  title: string;
  traffic: number;
  keywords: number;
  topKeywords: string[];
  avgPosition: number;
  estimatedValue: number;
}

export interface TopPagesParams {
  domain: string;
  country?: string;
  limit?: number;
  sortBy?: "traffic" | "keywords" | "value";
}

export interface TopPagesResponse {
  data: TopPage[];
  total: number;
  domain: string;
  country: string;
}

// ====================================================================
// API ERROR TYPES
// ====================================================================

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

// ====================================================================
// PAGINATION
// ====================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginationResponse {
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ====================================================================
// LOADING STATES
// ====================================================================

export interface LoadingStates {
  keywordAnalysis: boolean;
  keywordVariations: boolean;
  keywordMagic: boolean;
  topicResearch: boolean;
  contentIdeas: boolean;
  trendingTopics: boolean;
  questionBasedContent: boolean;
  aiContentIdeas: boolean;
  relatedTopics: boolean;
  keywordDifficulty: boolean;
  longTailKeywords: boolean;
  questionKeywords: boolean;
  seasonalTrends: boolean;
  serpAnalysis: boolean;
  topPages: boolean;
}

// ====================================================================
// REDUX STATE
// ====================================================================

export interface KeywordResearchState {
  // Data
  keywordAnalysis: KeywordAnalysisResponse | null;
  keywordVariations: KeywordVariationsResponse | null;
  keywordMagic: KeywordMagicResponse | null;
  topicResearch: TopicResearchResponse | null;
  contentIdeas: TopicIdeaResponse | null;
  trendingTopics: TrendingTopicsResponse | null;
  questionBasedContent: QuestionBasedContentResponse | null;
  aiContentIdeas: AIContentIdeaResponse | null;
  relatedTopics: RelatedTopicsResponse | null;
  keywordDifficulty: KeywordDifficultyResponse | null;
  longTailKeywords: LongTailKeywordResponse | null;
  questionKeywords: QuestionKeywordResponse | null;
  seasonalTrends: SeasonalTrendsResponse | null;
  serpAnalysis: SerpAnalysisResponse | null;
  topPages: TopPagesResponse | null;
  publicKeywordSuggestions: PublicKeywordSuggestion[] | null;

  // Loading states
  loading: LoadingStates;

  // Error states
  error: string | null;

  // Current filters and params
  currentParams: {
    domain?: string;
    seedKeyword?: string;
    country?: string;
    filters?: KeywordMagicFilters;
  };

  // UI states
  selectedKeywords: string[];
  favoriteKeywords: string[];
}
