// draggableNode.js — Styled drag chip for the sidebar

export const DraggableNode = ({ type, label, icon, color }) => {
  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={onDragStart}
      onDragEnd={(e) => (e.target.style.cursor = 'grab')}
      draggable
    >
      <div
        className="draggable-node-icon"
        style={{ background: color || 'rgba(139,92,246,0.15)' }}
      >
        {icon}
      </div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};