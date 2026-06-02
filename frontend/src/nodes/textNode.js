// textNode.js
// Features:
//   1. Auto-resizing textarea (width + height grow with content)
//   2. Dynamic variable handles — {{ varName }} creates left-side Handle

import { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const VAR_REGEX = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

const MIN_WIDTH = 220;
const MIN_HEIGHT = 80;

/** Extract unique variable names from template text */
const extractVariables = (text) => {
  const matches = [...text.matchAll(VAR_REGEX)];
  const names = matches.map((m) => m[1]);
  return [...new Set(names)]; // deduplicate
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const textareaRef = useRef(null);

  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const [nodeWidth, setNodeWidth] = useState(MIN_WIDTH);
  const [nodeHeight, setNodeHeight] = useState(MIN_HEIGHT);

  /** Resize the textarea and the node to fit the content */
  const resize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    // Reset height so scrollHeight reflects the true content height
    ta.style.height = 'auto';
    const contentHeight = Math.max(ta.scrollHeight, 60);
    ta.style.height = `${contentHeight}px`;

    // Estimate width from longest line
    const lines = ta.value.split('\n');
    const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
    // Approximate: each char ≈ 8px, pad 60px
    const estimatedWidth = Math.max(MIN_WIDTH, longestLine.length * 8 + 60);

    setNodeWidth(estimatedWidth);
    setNodeHeight(Math.max(MIN_HEIGHT, contentHeight + 64)); // 64px for header + padding
  }, []);

  useEffect(() => {
    resize();
  }, [currText, resize]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);
    setVariables(extractVariables(text));
    updateNodeField(id, 'text', text);
  };

  // Evenly space variable handles on the left side
  const getVarHandleStyle = (index, total) => {
    if (total === 0) return {};
    if (total === 1) return { top: '50%' };
    const step = 100 / (total + 1);
    return { top: `${step * (index + 1)}%` };
  };

  return (
    <div
      className="base-node"
      style={{ width: `${nodeWidth}px`, minHeight: `${nodeHeight}px` }}
    >
      {/* Header */}
      <div
        className="node-header"
        style={{ background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' }}
      >
        <span className="node-icon">📝</span>
        <span className="node-title">Text</span>
      </div>

      {/* Body */}
      <div className="node-body">
        <div className="node-field">
          <label className="node-label">Text</label>
          <textarea
            ref={textareaRef}
            className="node-textarea node-textarea-grow"
            value={currText}
            onChange={handleTextChange}
            placeholder="Type text here. Use {{variableName}} to add input handles."
            rows={1}
          />
        </div>

        {/* Show detected variables as tags */}
        {variables.length > 0 && (
          <div className="variable-tags">
            {variables.map((v) => (
              <span key={v} className="variable-tag">
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic variable handles on the LEFT */}
      {variables.map((varName, i) => (
        <div key={varName}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={getVarHandleStyle(i, variables.length)}
            className="node-handle node-handle-target"
          />
          <div
            className="handle-label handle-label-left"
            style={getVarHandleStyle(i, variables.length)}
          >
            {varName}
          </div>
        </div>
      ))}

      {/* Fixed output handle on the RIGHT */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
        className="node-handle node-handle-source"
      />
      <div
        className="handle-label handle-label-right"
        style={{ top: '50%' }}
      >
        output
      </div>
    </div>
  );
};
