import dayjs from 'dayjs';
import { CalendarItem, CalendarMetrics } from '@/types/content-planning.type';

/**
 * Format calendar item data for display
 */
export const formatCalendarItem = (item: CalendarItem) => {
    return {
        ...item,
        formattedPublishDate: dayjs(item.publishDate).format('MMM DD, YYYY'),
        formattedCreatedAt: dayjs(item.createdAt).format('MMM DD, YYYY HH:mm'),
        isOverdue: dayjs(item.publishDate).isBefore(dayjs()) && item.status !== 'published',
        daysUntilPublish: dayjs(item.publishDate).diff(dayjs(), 'days'),
        keywordString: item.targetKeywords.join(', '),
        tagString: item.tags.join(', ')
    };
};

/**
 * Get status color for calendar items
 */
export const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
        planned: '#1890ff',
        in_progress: '#fa8c16',
        review: '#722ed1',
        published: '#52c41a',
        archived: '#d9d9d9'
    };
    return colorMap[status] || '#d9d9d9';
};

/**
 * Get priority color
 */
export const getPriorityColor = (priority: string): string => {
    const colorMap: Record<string, string> = {
        low: '#52c41a',
        medium: '#fa8c16',
        high: '#ff4d4f'
    };
    return colorMap[priority] || '#d9d9d9';
};

/**
 * Calculate content planning metrics
 */
export const calculateMetrics = (items: CalendarItem[]): CalendarMetrics => {
    const now = dayjs();

    return items.reduce((acc, item) => {
        // Count by status
        acc[item.status as keyof CalendarMetrics] = (acc[item.status as keyof CalendarMetrics] || 0) + 1;

        // Count overdue items
        if (dayjs(item.publishDate).isBefore(now) && item.status !== 'published') {
            acc.overdue = (acc.overdue || 0) + 1;
        }

        return acc;
    }, {
        planned: 0,
        in_progress: 0,
        review: 0,
        published: 0,
        overdue: 0
    } as CalendarMetrics);
};

/**
 * Filter calendar items based on criteria
 */
export const filterCalendarItems = (
    items: CalendarItem[],
    filters: {
        status?: string;
        type?: string;
        priority?: string;
        startDate?: string;
        endDate?: string;
        search?: string;
    }
): CalendarItem[] => {
    return items.filter(item => {
        // Status filter
        if (filters.status && item.status !== filters.status) {
            return false;
        }

        // Type filter
        if (filters.type && item.type !== filters.type) {
            return false;
        }

        // Priority filter
        if (filters.priority && item.priority !== filters.priority) {
            return false;
        }

        // Date range filter
        if (filters.startDate && dayjs(item.publishDate).isBefore(dayjs(filters.startDate))) {
            return false;
        }

        if (filters.endDate && dayjs(item.publishDate).isAfter(dayjs(filters.endDate))) {
            return false;
        }

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const searchableText = `${item.title} ${item.brief || ''} ${item.targetKeywords.join(' ')} ${item.tags.join(' ')}`.toLowerCase();
            if (!searchableText.includes(searchLower)) {
                return false;
            }
        }

        return true;
    });
};

/**
 * Sort calendar items
 */
export const sortCalendarItems = (
    items: CalendarItem[],
    sortBy: 'publishDate' | 'createdAt' | 'title' | 'priority' | 'status',
    sortOrder: 'asc' | 'desc' = 'asc'
): CalendarItem[] => {
    return [...items].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'publishDate':
                comparison = dayjs(a.publishDate).valueOf() - dayjs(b.publishDate).valueOf();
                break;
            case 'createdAt':
                comparison = dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
                break;
            case 'title':
                comparison = a.title.localeCompare(b.title);
                break;
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                comparison = priorityOrder[a.priority as keyof typeof priorityOrder] -
                    priorityOrder[b.priority as keyof typeof priorityOrder];
                break;
            case 'status':
                const statusOrder = { planned: 1, in_progress: 2, review: 3, published: 4, archived: 5 };
                comparison = statusOrder[a.status as keyof typeof statusOrder] -
                    statusOrder[b.status as keyof typeof statusOrder];
                break;
            default:
                comparison = 0;
        }

        return sortOrder === 'desc' ? -comparison : comparison;
    });
};

/**
 * Group calendar items by a specific field
 */
export const groupCalendarItems = (
    items: CalendarItem[],
    groupBy: 'status' | 'type' | 'priority' | 'month'
): Record<string, CalendarItem[]> => {
    return items.reduce((acc, item) => {
        let key: string;

        switch (groupBy) {
            case 'status':
                key = item.status;
                break;
            case 'type':
                key = item.type;
                break;
            case 'priority':
                key = item.priority;
                break;
            case 'month':
                key = dayjs(item.publishDate).format('YYYY-MM');
                break;
            default:
                key = 'other';
        }

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);

        return acc;
    }, {} as Record<string, CalendarItem[]>);
};

/**
 * Get upcoming deadlines
 */
export const getUpcomingDeadlines = (items: CalendarItem[], days: number = 7): CalendarItem[] => {
    const now = dayjs();
    const futureDate = now.add(days, 'days');

    return items.filter(item => {
        const publishDate = dayjs(item.publishDate);
        return publishDate.isAfter(now) &&
            publishDate.isBefore(futureDate) &&
            item.status !== 'published';
    }).sort((a, b) => dayjs(a.publishDate).valueOf() - dayjs(b.publishDate).valueOf());
};

/**
 * Get overdue items
 */
export const getOverdueItems = (items: CalendarItem[]): CalendarItem[] => {
    const now = dayjs();

    return items.filter(item => {
        return dayjs(item.publishDate).isBefore(now) && item.status !== 'published';
    }).sort((a, b) => dayjs(a.publishDate).valueOf() - dayjs(b.publishDate).valueOf());
};

/**
 * Validate calendar item data
 */
export const validateCalendarItem = (data: Partial<CalendarItem>): string[] => {
    const errors: string[] = [];

    if (!data.title || data.title.trim().length === 0) {
        errors.push('Title is required');
    }

    if (!data.type) {
        errors.push('Content type is required');
    }

    if (!data.status) {
        errors.push('Status is required');
    }

    if (!data.priority) {
        errors.push('Priority is required');
    }

    if (!data.publishDate) {
        errors.push('Publish date is required');
    }

    if (data.estimatedWordCount && data.estimatedWordCount < 0) {
        errors.push('Word count must be positive');
    }

    return errors;
};

/**
 * Generate calendar item slug from title
 */
export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

/**
 * Estimate reading time based on word count
 */
export const estimateReadingTime = (wordCount: number, wordsPerMinute: number = 200): number => {
    return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Get content type icon
 */
export const getContentTypeIcon = (type: string): string => {
    const iconMap: Record<string, string> = {
        blog_post: '📝',
        social_media: '📱',
        email: '📧',
        landing_page: '🌐',
        video: '🎥',
        infographic: '📊'
    };
    return iconMap[type] || '📄';
};

/**
 * Format keyword difficulty score
 */
export const formatDifficulty = (difficulty: number): { label: string; color: string } => {
    if (difficulty <= 30) {
        return { label: 'Easy', color: '#52c41a' };
    } else if (difficulty <= 60) {
        return { label: 'Medium', color: '#fa8c16' };
    } else {
        return { label: 'Hard', color: '#ff4d4f' };
    }
};

/**
 * Export calendar data to CSV
 */
export const exportToCSV = (items: CalendarItem[]): string => {
    const headers = [
        'Title',
        'Type',
        'Status',
        'Priority',
        'Publish Date',
        'Keywords',
        'Estimated Word Count',
        'Actual Word Count',
        'Brief',
        'Tags',
        'Created At'
    ];

    const csvContent = [
        headers.join(','),
        ...items.map(item => [
            `"${item.title}"`,
            item.type,
            item.status,
            item.priority,
            dayjs(item.publishDate).format('YYYY-MM-DD'),
            `"${item.targetKeywords.join(', ')}"`,
            item.estimatedWordCount || '',
            item.actualWordCount || '',
            `"${item.brief || ''}"`,
            `"${item.tags.join(', ')}"`,
            dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')
        ].join(','))
    ].join('\n');

    return csvContent;
};
