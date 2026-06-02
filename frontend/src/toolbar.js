// toolbar.js — Sidebar with categorized, draggable node palette

import { DraggableNode } from './draggableNode';

const NODE_DEFINITIONS = [
  // Core I/O
  { type: 'customInput', label: 'Input',    icon: '📥', color: 'rgba(16,185,129,0.2)'  },
  { type: 'customOutput',label: 'Output',   icon: '📤', color: 'rgba(236,72,153,0.2)'  },
  // Intelligence
  { type: 'llm',         label: 'LLM',      icon: '🤖', color: 'rgba(139,92,246,0.2)'  },
  { type: 'text',        label: 'Text',     icon: '📝', color: 'rgba(245,158,11,0.2)'  },
  // Data
  { type: 'api',         label: 'API',      icon: '🌐', color: 'rgba(6,182,212,0.2)'   },
  { type: 'filter',      label: 'Filter',   icon: '🔍', color: 'rgba(236,72,153,0.2)'  },
  { type: 'math',        label: 'Math',     icon: '➕', color: 'rgba(59,130,246,0.2)'  },
  // Flow control
  { type: 'delay',       label: 'Delay',    icon: '⏱️', color: 'rgba(99,102,241,0.2)'  },
  { type: 'email',       label: 'Email',    icon: '✉️', color: 'rgba(239,68,68,0.2)'   },
];

export const PipelineToolbar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-title">Core</div>
      <div className="sidebar-nodes">
        {NODE_DEFINITIONS.slice(0, 4).map((n) => (
          <DraggableNode key={n.type} {...n} />
        ))}
      </div>

      <div className="sidebar-section-title">Data & Logic</div>
      <div className="sidebar-nodes">
        {NODE_DEFINITIONS.slice(4, 7).map((n) => (
          <DraggableNode key={n.type} {...n} />
        ))}
      </div>

      <div className="sidebar-section-title">Flow Control</div>
      <div className="sidebar-nodes">
        {NODE_DEFINITIONS.slice(7).map((n) => (
          <DraggableNode key={n.type} {...n} />
        ))}
      </div>
    </aside>
  );
};
