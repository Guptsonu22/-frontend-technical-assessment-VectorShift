// App.js — Root application shell

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-layout">
      {/* Top header bar */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">⚡</div>
          <span className="app-logo-text">VectorShift</span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Pipeline Editor
        </span>
      </header>

      {/* Main area: sidebar + canvas */}
      <div className="app-main">
        <PipelineToolbar />
        <div className="canvas-wrapper">
          <PipelineUI />
        </div>
      </div>

      {/* Bottom bar with submit */}
      <div className="bottom-bar">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
