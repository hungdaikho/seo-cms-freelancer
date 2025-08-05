import { NextRequest, NextResponse } from 'next/server';
import {
    ContentTemplate,
    CreateContentTemplateRequest,
    TemplateVariable,
    WordCountRange
} from '@/types/content-template.type';

// Mock database - In production, this would be a real database
let mockTemplates: ContentTemplate[] = [
    {
        id: 'template-1',
        name: 'SEO Blog Post Template',
        type: 'blog-post',
        template: `# {title}

## Introduction
{introduction}

## Main Content
{content}

### Key Points
{keyPoints}

## Conclusion
{conclusion}

### Call to Action
{cta}`,
        variables: [
            {
                name: 'title',
                type: 'text',
                required: true,
                description: 'Main article title with focus keyword'
            },
            {
                name: 'introduction',
                type: 'text',
                required: true,
                description: 'Engaging introduction paragraph'
            },
            {
                name: 'content',
                type: 'text',
                required: true,
                description: 'Main article content'
            },
            {
                name: 'keyPoints',
                type: 'text',
                required: false,
                description: 'List of key points or takeaways'
            },
            {
                name: 'conclusion',
                type: 'text',
                required: true,
                description: 'Article conclusion'
            },
            {
                name: 'cta',
                type: 'text',
                required: false,
                description: 'Call to action'
            }
        ],
        seoGuidelines: [
            'Include focus keyword in title (H1)',
            'Use H2-H6 headings for proper structure',
            'Add internal and external links naturally',
            'Include meta description within 150-160 characters',
            'Optimize images with alt text',
            'Ensure keyword density between 1-3%'
        ],
        wordCountRange: {
            min: 800,
            max: 2500
        },
        projectId: 'project-1',
        userId: 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'template-2',
        name: 'Landing Page Template',
        type: 'landing-page',
        template: `# {headline}

## {subheadline}

### Hero Section
{heroDescription}

**Key Benefits:**
{keyBenefits}

### Features
{featuresSection}

### Social Proof
{testimonials}

### Pricing
{pricingSection}

### FAQ
{faqSection}

### CTA Section
{ctaSection}`,
        variables: [
            {
                name: 'headline',
                type: 'text',
                required: true,
                description: 'Main headline with primary keyword'
            },
            {
                name: 'subheadline',
                type: 'text',
                required: true,
                description: 'Supporting headline'
            },
            {
                name: 'heroDescription',
                type: 'text',
                required: true,
                description: 'Hero section description'
            },
            {
                name: 'keyBenefits',
                type: 'text',
                required: true,
                description: 'List of key product benefits'
            },
            {
                name: 'featuresSection',
                type: 'text',
                required: true,
                description: 'Product features section'
            },
            {
                name: 'testimonials',
                type: 'text',
                required: false,
                description: 'Customer testimonials'
            },
            {
                name: 'pricingSection',
                type: 'text',
                required: false,
                description: 'Pricing information'
            },
            {
                name: 'faqSection',
                type: 'text',
                required: false,
                description: 'Frequently asked questions'
            },
            {
                name: 'ctaSection',
                type: 'text',
                required: true,
                description: 'Call to action section'
            }
        ],
        seoGuidelines: [
            'Include primary keyword in headline',
            'Optimize meta description for click-through rate',
            'Add schema markup for products/services',
            'Include local SEO elements if applicable',
            'Optimize images with descriptive alt text'
        ],
        wordCountRange: {
            min: 500,
            max: 1500
        },
        projectId: 'project-1',
        userId: 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// GET /api/v1/projects/[projectId]/content/templates
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;

        // Filter templates by project ID
        const projectTemplates = mockTemplates.filter(
            template => template.projectId === projectId
        );

        return NextResponse.json(projectTemplates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        return NextResponse.json(
            { error: 'Failed to fetch templates' },
            { status: 500 }
        );
    }
}

// POST /api/v1/projects/[projectId]/content/templates
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;
        const body: CreateContentTemplateRequest = await request.json();

        // Validate required fields
        if (!body.name || !body.type || !body.template) {
            return NextResponse.json(
                { error: 'Name, type, and template are required' },
                { status: 400 }
            );
        }

        // Create new template
        const newTemplate: ContentTemplate = {
            id: `template-${Date.now()}`,
            name: body.name,
            type: body.type,
            template: body.template,
            variables: body.variables || [],
            seoGuidelines: body.seoGuidelines || [],
            wordCountRange: body.wordCountRange || { min: 0, max: 1000 },
            projectId,
            userId: 'current-user-id', // In production, get from auth
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Add to mock database
        mockTemplates.push(newTemplate);

        return NextResponse.json(newTemplate, { status: 201 });
    } catch (error) {
        console.error('Error creating template:', error);
        return NextResponse.json(
            { error: 'Failed to create template' },
            { status: 500 }
        );
    }
}
