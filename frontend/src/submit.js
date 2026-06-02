// submit.js — Submit button + backend integration + custom result modal

import { useState } from 'react';
import { useStore } from './store';

/** Custom result modal — no external dependency needed */
const ResultModal = ({ result, onClose }) => {
  if (!result) return null;

  const isDag = result.is_dag;

  return (
    <div className="pipeline-alert-overlay" onClick={onClose}>
      <div
        className="pipeline-alert"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Pipeline Analysis Results"
      >
        {/* Header */}
        <div className="alert-header">
          <div className={`alert-icon ${isDag ? 'success' : 'info'}`}>
            {isDag ? '✅' : '⚠️'}
          </div>
          <div>
            <div className="alert-title">Pipeline Analysis</div>
            <div className="alert-subtitle">
              {isDag
                ? 'Execution order is valid — ready to run.'
                : 'Pipeline contains a cycle — fix connections to enable execution.'}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="alert-stats">
          <div className="alert-stat">
            <div className="alert-stat-value">{result.num_nodes}</div>
            <div className="alert-stat-label">Nodes</div>
          </div>
          <div className="alert-stat">
            <div className="alert-stat-value">{result.num_edges}</div>
            <div className="alert-stat-label">Edges</div>
          </div>
        </div>

        {/* DAG status */}
        <div className="alert-dag">
          <div>
            <div className="alert-dag-label">Execution Order</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Directed Acyclic Graph (DAG)
            </div>
          </div>
          <span className={`alert-dag-badge ${isDag ? 'dag-true' : 'dag-false'}`}>
            <span>{isDag ? '✓' : '✗'}</span>
            <span>{isDag ? 'Pipeline is executable' : 'Cycle detected'}</span>
          </span>
        </div>

        {/* Close */}
        <button className="alert-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState(null);
  const [error,    setError]    = useState(null);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      // Show error in the modal
      setResult({
        num_nodes: nodes.length,
        num_edges: edges.length,
        is_dag:    false,
        _error:    err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        id="pipeline-submit-btn"
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
        aria-label="Submit pipeline for analysis"
      >
        {loading ? (
          <>
            <span className="spinner" />
            <span>Analyzing…</span>
          </>
        ) : (
          <>
            <span className="submit-btn-icon">🚀</span>
            <span>Run Pipeline</span>
          </>
        )}
      </button>

      {result && (
        <ResultModal
          result={result}
          onClose={() => setResult(null)}
        />
      )}
    </>
  );
};
