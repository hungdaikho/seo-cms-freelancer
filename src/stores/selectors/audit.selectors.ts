import { RootState } from '../store';

// Audit selectors
export const selectAudits = (state: RootState) => state.audit.audits;
export const selectCurrentAudit = (state: RootState) => state.audit.currentAudit;
export const selectAuditResults = (state: RootState) => state.audit.auditResults;
export const selectAuditSummary = (state: RootState) => state.audit.auditSummary;
export const selectAuditLoading = (state: RootState) => state.audit.loading;
export const selectAuditError = (state: RootState) => state.audit.error;
export const selectAuditPagination = (state: RootState) => state.audit.pagination;

// Audit derived selectors
export const selectCompletedAudits = (state: RootState) =>
    state.audit.audits.filter(audit => audit.status === 'completed');

export const selectPendingAudits = (state: RootState) =>
    state.audit.audits.filter(audit => audit.status === 'pending' || audit.status === 'in_progress');

export const selectFailedAudits = (state: RootState) =>
    state.audit.audits.filter(audit => audit.status === 'failed');

export const selectLatestAudit = (state: RootState) => {
    if (state.audit.audits.length === 0) return null;
    return state.audit.audits.reduce((latest, current) =>
        new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
    );
};

export const selectAuditById = (auditId: string) => (state: RootState) =>
    state.audit.audits.find(audit => audit.id === auditId);
