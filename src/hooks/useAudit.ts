import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { AppDispatch, RootState } from "@/stores/store";
import {
  createAudit,
  createComprehensiveAudit,
  createQuickAudit,
  fetchAudits,
  fetchAudit,
  fetchAuditResults,
  fetchAuditStatus,
  fetchAuditSummary,
  fetchAuditHistory,
  deleteAudit,
  fetchLatestAudit,
  clearError,
  clearCurrentAudit,
  updateAuditProgress,
  startPolling,
  stopPolling,
  clearPolling,
  updatePagination,
} from "@/stores/slices/audit.slice";
import {
  CreateAuditPayload,
  CreateComprehensiveAuditPayload,
  FetchAuditsPayload,
  FetchAuditPayload,
  DeleteAuditPayload,
} from "@/types/audit.type";
import { AuditAPIResponse } from "@/types/api.type";

export const useAudit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auditState = useSelector((state: RootState) => state.audit);

  // =============================================================================
  // 🔧 ACTIONS
  // =============================================================================

  const handleCreateAudit = useCallback(
    (payload: CreateAuditPayload) => {
      return dispatch(createAudit(payload));
    },
    [dispatch]
  );

  const handleCreateComprehensiveAudit = useCallback(
    (payload: CreateComprehensiveAuditPayload) => {
      return dispatch(createComprehensiveAudit(payload));
    },
    [dispatch]
  );

  const handleCreateQuickAudit = useCallback(
    (projectId: string, url: string) => {
      return dispatch(createQuickAudit({ projectId, url }));
    },
    [dispatch]
  );

  const handleFetchAudits = useCallback(
    (payload: FetchAuditsPayload) => {
      return dispatch(fetchAudits(payload));
    },
    [dispatch]
  );

  const handleFetchAudit = useCallback(
    (payload: FetchAuditPayload) => {
      return dispatch(fetchAudit(payload));
    },
    [dispatch]
  );

  const handleFetchAuditResults = useCallback(
    (auditId: string) => {
      return dispatch(fetchAuditResults(auditId));
    },
    [dispatch]
  );

  const handleFetchAuditStatus = useCallback(
    (auditId: string) => {
      return dispatch(fetchAuditStatus(auditId));
    },
    [dispatch]
  );

  const handleFetchAuditSummary = useCallback(
    (projectId: string) => {
      return dispatch(fetchAuditSummary(projectId));
    },
    [dispatch]
  );

  const handleFetchAuditHistory = useCallback(
    (payload: FetchAuditsPayload) => {
      return dispatch(fetchAuditHistory(payload));
    },
    [dispatch]
  );

  const handleDeleteAudit = useCallback(
    (payload: DeleteAuditPayload) => {
      return dispatch(deleteAudit(payload));
    },
    [dispatch]
  );

  const handleFetchLatestAudit = useCallback(
    (projectId: string) => {
      return dispatch(fetchLatestAudit(projectId));
    },
    [dispatch]
  );

  // =============================================================================
  // 🔧 UTILITIES
  // =============================================================================

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearCurrentAudit = useCallback(() => {
    dispatch(clearCurrentAudit());
  }, [dispatch]);

  const handleUpdateAuditProgress = useCallback(
    (auditId: string, progress: number) => {
      dispatch(updateAuditProgress({ auditId, progress }));
    },
    [dispatch]
  );

  const handleStartPolling = useCallback(
    (auditId: string) => {
      dispatch(startPolling(auditId));
    },
    [dispatch]
  );

  const handleStopPolling = useCallback(
    (auditId: string) => {
      dispatch(stopPolling(auditId));
    },
    [dispatch]
  );

  const handleClearPolling = useCallback(() => {
    dispatch(clearPolling());
  }, [dispatch]);

  const handleUpdatePagination = useCallback(
    (pagination: Partial<typeof auditState.pagination>) => {
      dispatch(updatePagination(pagination));
    },
    [dispatch, auditState.pagination]
  );

  // =============================================================================
  // 🔧 POLLING UTILITIES
  // =============================================================================

  const startAuditPolling = useCallback(
    (auditId: string, interval: number = 5000) => {
      handleStartPolling(auditId);

      const pollInterval = setInterval(() => {
        dispatch(fetchAuditStatus(auditId)).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            const { status } = result.payload as any;

            // Stop polling if completed or failed
            if (status.status === "completed" || status.status === "failed") {
              clearInterval(pollInterval);
              handleStopPolling(auditId);

              // Fetch results if completed
              if (status.status === "completed") {
                dispatch(fetchAuditResults(auditId));
              }
            }
          }
        });
      }, interval);

      return () => {
        clearInterval(pollInterval);
        handleStopPolling(auditId);
      };
    },
    [dispatch, handleStartPolling, handleStopPolling]
  );

  // =============================================================================
  // 🔧 COMPUTED VALUES
  // =============================================================================

  const isAnyLoading =
    auditState.isLoading || auditState.isCreating || auditState.isFetching;

  const hasError = !!auditState.error;

  const completedAudits = auditState.audits.filter(
    (audit: AuditAPIResponse) => audit.status === "completed"
  );

  const runningAudits = auditState.audits.filter(
    (audit: AuditAPIResponse) =>
      audit.status === "running" || audit.status === "pending"
  );

  const latestCompletedAudit =
    completedAudits.length > 0 ? completedAudits[0] : null;

  // =============================================================================
  // 🔧 AUTO CLEANUP
  // =============================================================================

  useEffect(() => {
    return () => {
      // Cleanup polling when component unmounts
      handleClearPolling();
    };
  }, [handleClearPolling]);

  return {
    // State
    ...auditState,

    // Computed values
    isAnyLoading,
    hasError,
    completedAudits,
    runningAudits,
    latestCompletedAudit,

    // Actions
    createAudit: handleCreateAudit,
    createComprehensiveAudit: handleCreateComprehensiveAudit,
    createQuickAudit: handleCreateQuickAudit,
    fetchAudits: handleFetchAudits,
    fetchAudit: handleFetchAudit,
    fetchAuditResults: handleFetchAuditResults,
    fetchAuditStatus: handleFetchAuditStatus,
    fetchAuditSummary: handleFetchAuditSummary,
    fetchAuditHistory: handleFetchAuditHistory,
    deleteAudit: handleDeleteAudit,
    fetchLatestAudit: handleFetchLatestAudit,

    // Utilities
    clearError: handleClearError,
    clearCurrentAudit: handleClearCurrentAudit,
    updateAuditProgress: handleUpdateAuditProgress,
    startPolling: handleStartPolling,
    stopPolling: handleStopPolling,
    clearPolling: handleClearPolling,
    updatePagination: handleUpdatePagination,
    startAuditPolling,
  };
};

export default useAudit;
