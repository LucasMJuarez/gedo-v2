import { useState, useCallback } from 'react';
import { Header } from './components/obelisco/Header';
import { Footer } from './components/obelisco/Footer';
import { Dashboard } from './components/Dashboard';
import { DocumentGenerator } from './components/DocumentGenerator';
import { ConsultasExpedientes } from './components/ConsultasExpedientes';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'generate' | 'consultas'>('consultas');

  const handleNavigate = useCallback((view: 'dashboard' | 'generate' | 'consultas') => {
    setActiveView(view);
  }, []);

  const handleGenerateDocument = useCallback(() => {
    setActiveView('generate');
  }, []);

  const handleBack = useCallback(() => {
    setActiveView('dashboard');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header activeView={activeView} onNavigate={handleNavigate} />
      <main className="flex-1">
        {activeView === 'dashboard' ? (
          <Dashboard onGenerateDocument={handleGenerateDocument} />
        ) : activeView === 'generate' ? (
          <DocumentGenerator onBack={handleBack} />
        ) : (
          <ConsultasExpedientes />
        )}
      </main>
      <Footer />
    </div>
  );
}
