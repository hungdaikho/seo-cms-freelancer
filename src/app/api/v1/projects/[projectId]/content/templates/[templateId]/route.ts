import { NextRequest, NextResponse } from 'next/server';
import { ContentTemplate, UpdateContentTemplateRequest } from '@/types/content-template.type';

// Mock database - In production, this would be a real database
// This should be shared with the main templates route
let mockTemplates: ContentTemplate[] = [];

// GET /api/v1/projects/[projectId]/content/templates/[templateId]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string; templateId: string }> }
) {
    try {
        const { projectId, templateId } = await params;

        const template = mockTemplates.find(
            t => t.id === templateId && t.projectId === projectId
        );

        if (!template) {
            return NextResponse.json(
                { error: 'Template not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(template);
    } catch (error) {
        console.error('Error fetching template:', error);
        return NextResponse.json(
            { error: 'Failed to fetch template' },
            { status: 500 }
        );
    }
}

// PUT /api/v1/projects/[projectId]/content/templates/[templateId]
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string; templateId: string }> }
) {
    try {
        const { projectId, templateId } = await params;
        const body: UpdateContentTemplateRequest = await request.json();

        const templateIndex = mockTemplates.findIndex(
            t => t.id === templateId && t.projectId === projectId
        );

        if (templateIndex === -1) {
            return NextResponse.json(
                { error: 'Template not found' },
                { status: 404 }
            );
        }

        // Update template
        const updatedTemplate: ContentTemplate = {
            ...mockTemplates[templateIndex],
            name: body.name,
            type: body.type,
            template: body.template,
            variables: body.variables,
            seoGuidelines: body.seoGuidelines,
            wordCountRange: body.wordCountRange,
            updatedAt: new Date().toISOString(),
        };

        mockTemplates[templateIndex] = updatedTemplate;

        return NextResponse.json(updatedTemplate);
    } catch (error) {
        console.error('Error updating template:', error);
        return NextResponse.json(
            { error: 'Failed to update template' },
            { status: 500 }
        );
    }
}

// DELETE /api/v1/projects/[projectId]/content/templates/[templateId]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string; templateId: string }> }
) {
    try {
        const { projectId, templateId } = await params;

        const templateIndex = mockTemplates.findIndex(
            t => t.id === templateId && t.projectId === projectId
        );

        if (templateIndex === -1) {
            return NextResponse.json(
                { error: 'Template not found' },
                { status: 404 }
            );
        }

        // Remove template
        mockTemplates.splice(templateIndex, 1);

        return NextResponse.json({ message: 'Template deleted successfully' });
    } catch (error) {
        console.error('Error deleting template:', error);
        return NextResponse.json(
            { error: 'Failed to delete template' },
            { status: 500 }
        );
    }
}
