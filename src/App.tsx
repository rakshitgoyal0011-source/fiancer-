import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LiquidBackground } from './components/LiquidBackground';
import { LandingPage } from './components/LandingPage';
import { UploadZone } from './components/UploadZone';
import { ProcessingState } from './components/ProcessingState';
import { ConfigurationGrid } from './components/ConfigurationGrid';
import { Dashboard } from './components/Dashboard';
import { HistoryPanel } from './components/HistoryPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { AnimatePresence } from 'framer-motion';

type AppState = 'landing' | 'upload' | 'processing' | 'configuration' | 'dashboard' | 'analytics' | 'projects';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isEditing, setIsEditing] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  // Lifted Assumptions State
  const [growth, setGrowth] = useState(15.0);
  const [cogs, setCogs] = useState(28.5);
  const [opex, setOpex] = useState(-5.0);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  return (
    <div className="w-screen h-screen bg-background-dark text-slate-100 font-sans overflow-hidden flex relative selection:bg-primary selection:text-background-dark">
      <LiquidBackground />

      {appState !== 'landing' && <Sidebar
        onNewUpload={() => setAppState('upload')}
        onHistoryToggle={() => { setIsHistoryOpen(!isHistoryOpen); setIsSettingsOpen(false); }}
        onSettingsToggle={() => { setIsSettingsOpen(!isSettingsOpen); setIsHistoryOpen(false); }}
        onAnalytics={() => setAppState('analytics')}
        onProjects={() => setAppState('projects')}
      />}

      <main className="flex-1 relative overflow-y-auto z-10 flex flex-col">

        {appState === 'dashboard' && (
          <Header onEditToggle={() => setIsEditing(!isEditing)} isEditing={isEditing} growth={growth} cogs={cogs} opex={opex} fileName={fileName} />
        )}

        <div className={`flex-1 flex flex-col w-full ${appState === 'dashboard' ? 'mt-20' : ''
          }`}>

          {appState === 'landing' && (
            <LandingPage onLogin={() => setAppState('upload')} />
          )}

          {appState === 'upload' && (
            <UploadZone onUploadStart={(name) => { setFileName(name || 'Unknown Document.pdf'); setAppState('processing'); }} />
          )}

          {appState === 'processing' && (
            <ProcessingState onComplete={() => setAppState('configuration')} />
          )}

          {appState === 'configuration' && (
            <ConfigurationGrid onGenerate={() => setAppState('dashboard')} />
          )}

          {appState === 'dashboard' && (
            <Dashboard
              isEditing={isEditing}
              fileName={fileName}
              growth={growth} setGrowth={setGrowth}
              cogs={cogs} setCogs={setCogs}
              opex={opex} setOpex={setOpex}
            />
          )}

          {appState === 'analytics' && (
            <div className="flex-1 flex items-center justify-center p-8 w-full">
              <div className="glass-panel p-12 text-center max-w-2xl w-full flex flex-col items-center">
                <span className="material-symbols-outlined text-focus-accent text-5xl mb-6 text-accent-violet">analytics</span>
                <h2 className="text-3xl font-bold text-white mb-4">Analytics Dashboard</h2>
                <p className="text-white/60">The comprehensive analytics features are currently in development. Check back later for advanced scenario tracking and historical variance reports.</p>
              </div>
            </div>
          )}

          {appState === 'projects' && (
            <div className="flex-1 flex items-center justify-center p-8 w-full">
              <div className="glass-panel p-12 text-center max-w-2xl w-full flex flex-col items-center">
                <span className="material-symbols-outlined text-focus-accent text-5xl mb-6 text-accent-cyan">folder_open</span>
                <h2 className="text-3xl font-bold text-white mb-4">Project Directory</h2>
                <p className="text-white/60">Organize and search your financial models by project scopes. This feature will be available in the upcoming 2.2 release.</p>
              </div>
            </div>
          )}

        </div>

        {appState !== 'landing' && (
          <footer className="w-full px-8 py-6 flex justify-between items-center text-slate-600 text-[11px] border-t border-white/5 mt-auto bg-background-dark/80 backdrop-blur-md">
            <p>© 2023 Financer System v2.1.0 • All systems operational</p>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors font-medium" href="#">Documentation</a>
              <a className="hover:text-primary transition-colors font-medium" href="#">API Status</a>
              <a className="hover:text-primary transition-colors font-medium" href="#">Support</a>
            </div>
          </footer>
        )}
      </main>

      <AnimatePresence>
        {isHistoryOpen && (
          <HistoryPanel
            onClose={() => setIsHistoryOpen(false)}
            onLoadHistory={(name) => {
              setFileName(name);
              setAppState('dashboard');
              setIsHistoryOpen(false);
            }}
          />
        )}
        {isSettingsOpen && (
          <SettingsPanel
            onClose={() => setIsSettingsOpen(false)}
            isLightMode={isLightMode}
            onToggleLightMode={() => setIsLightMode(!isLightMode)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
