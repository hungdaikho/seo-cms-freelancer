import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    startNewAudit,
    fetchProjectAudits,
    fetchAuditById,
    fetchAuditResults,
    fetchAuditSummary,
    deleteAudit,
    clearError,
    setCurrentAudit,
    clearCurrentAudit,
    clearAudits,
} from '../slices/audit.slice';
import { CreateAuditRequest, PaginationParams } from '@/types/api.type';

export const useAudit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auditState = useSelector((state: RootState) => state.audit);

    const actions = {
        // Audit operations
        startNewAudit: (projectId: string, data?: CreateAuditRequest) =>
            dispatch(startNewAudit({ projectId, data })),
        fetchProjectAudits: (projectId: string, params?: PaginationParams) =>
            dispatch(fetchProjectAudits({ projectId, params })),
        fetchAuditById: (auditId: string) => dispatch(fetchAuditById(auditId)),
        fetchAuditResults: (auditId: string) => dispatch(fetchAuditResults(auditId)),
        fetchAuditSummary: (projectId: string) => dispatch(fetchAuditSummary(projectId)),
        deleteAudit: (auditId: string) => dispatch(deleteAudit(auditId)),

        // State management
        clearError: () => dispatch(clearError()),
        setCurrentAudit: (audit: any) => dispatch(setCurrentAudit(audit)),
        clearCurrentAudit: () => dispatch(clearCurrentAudit()),
        clearAudits: () => dispatch(clearAudits()),
    };

    return {
        ...auditState,
        ...actions,
    };
};
