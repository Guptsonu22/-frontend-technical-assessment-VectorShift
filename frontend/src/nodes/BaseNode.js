// BaseNode.js
// Core reusable node component. All specific nodes pass a config object.

import { Handle, Position } from 'reactflow';

/**
 * BaseNode renders any node given a config object.
 *
 * Config shape:
 * {
 *   title:   string           — displayed in the node header
 *   icon:    string           — emoji or character shown before the title
 *   color:   string           — CSS gradient string for the header (e.g. 'linear-gradient(135deg,#7928CA,#FF0080)')
 *   inputs:  Array<{ id, label, style? }>   — left-side target handles
 *   outputs: Array<{ id, label, style? }>   — right-side source handles
 *   fields:  Array<FieldDef>                — interactive fields rendered in the body
 *   width:   number?                         — override default width (200)
 * }
 *
 * FieldDef shape:
 * {
 *   type:         'text' | 'select' | 'textarea' | 'number' | 'readonly'
 *   name:         string   — key used to look up value in `data`
 *   label:        string   — displayed label
 *   options:      string[] — for 'select' type only
 *   defaultValue: any
 *   placeholder:  string?
 * }
 */
export const BaseNode = ({
  id,
  data,
  config,
  onFieldChange,
  children,
}) => {
  const {
    title,
    icon = '⚙️',
    color = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    inputs = [],
    outputs = [],
    fields = [],
    width = 220,
  } = config;

  const handleChange = (fieldName, value) => {
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  const renderField = (field) => {
    const value = data?.[field.name] ?? field.defaultValue ?? '';

    switch (field.type) {
      case 'text':
        return (
          <div className="node-field">
            <label className="node-label">{field.label}</label>
            <input
              className="node-input"
              type="text"
              value={value}
              placeholder={field.placeholder || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </div>
        );

      case 'number':
        return (
          <div className="node-field">
            <label className="node-label">{field.label}</label>
            <input
              className="node-input"
              type="number"
              value={value}
              placeholder={field.placeholder || '0'}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </div>
        );

      case 'select':
        return (
          <div className="node-field">
            <label className="node-label">{field.label}</label>
            <select
              className="node-select"
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              {(field.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div className="node-field">
            <label className="node-label">{field.label}</label>
            <textarea
              className="node-textarea"
              value={value}
              placeholder={field.placeholder || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={3}
            />
          </div>
        );

      case 'readonly':
        return (
          <div className="node-field">
            <label className="node-label">{field.label}</label>
            <div className="node-readonly">{value}</div>
          </div>
        );

      default:
        return null;
    }
  };

  // Calculate handle positioning for multiple handles on the same side
  const getHandleStyle = (index, total, overrideStyle) => {
    if (overrideStyle) return overrideStyle;
    if (total === 1) return { top: '50%' };
    const step = 100 / (total + 1);
    return { top: `${step * (index + 1)}%` };
  };

  return (
    <div
      className="base-node"
      style={{ width: `${width}px` }}
    >
      {/* Header */}
      <div
        className="node-header"
        style={{ background: color }}
      >
        <span className="node-icon">{icon}</span>
        <span className="node-title">{title}</span>
      </div>

      {/* Body */}
      <div className="node-body">
        {fields.map((field) => (
          <div key={field.name}>
            {renderField(field)}
          </div>
        ))}
        {children}
      </div>

      {/* Input Handles (left side) */}
      {inputs.map((input, i) => (
        <div key={input.id}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={getHandleStyle(i, inputs.length, input.style)}
            className="node-handle node-handle-target"
          />
          {input.label && (
            <div
              className="handle-label handle-label-left"
              style={getHandleStyle(i, inputs.length, input.style)}
            >
              {input.label}
            </div>
          )}
        </div>
      ))}

      {/* Output Handles (right side) */}
      {outputs.map((output, i) => (
        <div key={output.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={getHandleStyle(i, outputs.length, output.style)}
            className="node-handle node-handle-source"
          />
          {output.label && (
            <div
              className="handle-label handle-label-right"
              style={getHandleStyle(i, outputs.length, output.style)}
            >
              {output.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
