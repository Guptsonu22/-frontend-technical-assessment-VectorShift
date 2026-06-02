import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Existing nodes
import { InputNode }  from './nodes/inputNode';
import { LLMNode }    from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode }   from './nodes/textNode';

// New nodes
import { APINode }    from './nodes/apiNode';
import { FilterNode } from './nodes/filterNode';
import { MathNode }   from './nodes/mathNode';
import { DelayNode }  from './nodes/delayNode';
import { EmailNode }  from './nodes/emailNode';

import 'reactflow/dist/style.css';

const gridSize = 16;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  api:          APINode,
  filter:       FilterNode,
  math:         MathNode,
  delay:        DelayNode,
  email:        EmailNode,
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

/** Empty canvas placeholder shown when no nodes have been dropped yet */
const EmptyCanvasHint = () => (
  <div className="canvas-empty-hint">
    <div className="canvas-empty-icon">⚡</div>
    <div className="canvas-empty-text">Drag nodes from the sidebar to build your pipeline</div>
    <div className="canvas-empty-sub">Connect nodes to define your data flow</div>
  </div>
);

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw    = event?.dataTransfer?.getData('application/reactflow');
      if (!raw) return;

      const appData = JSON.parse(raw);
      const type    = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID  = getNodeID(type);
      const newNode = {
        id:       nodeID,
        type,
        position,
        data:     getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {nodes.length === 0 && <EmptyCanvasHint />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'rgba(139,92,246,0.6)', strokeWidth: 2 },
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="rgba(255,255,255,0.06)"
          gap={gridSize}
          size={1}
        />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            const colors = {
              customInput:  '#10b981',
              customOutput: '#ec4899',
              llm:          '#8b5cf6',
              text:         '#f59e0b',
              api:          '#06b6d4',
              filter:       '#f953c6',
              math:         '#3b82f6',
              delay:        '#6366f1',
              email:        '#ef4444',
            };
            return colors[n.type] || '#94a3b8';
          }}
          maskColor="rgba(10,13,20,0.7)"
        />
      </ReactFlow>
    </div>
  );
};
