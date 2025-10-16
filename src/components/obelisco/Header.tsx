import { Menu, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import logoBA from 'figma:asset/54af771f245f932561807d5ebd99b2caf5f76538.png';

interface HeaderProps {
  activeView: 'dashboard' | 'generate' | 'consultas';
  onNavigate: (view: 'dashboard' | 'generate' | 'consultas') => void;
}

export function Header({ activeView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavigateDashboard = useCallback(() => {
    onNavigate('dashboard');
    setMobileMenuOpen(false);
  }, [onNavigate]);

  const handleNavigateConsultas = useCallback(() => {
    onNavigate('consultas');
    setMobileMenuOpen(false);
  }, [onNavigate]);

  const handleNavigateGenerate = useCallback(() => {
    onNavigate('generate');
    setMobileMenuOpen(false);
  }, [onNavigate]);

  return (
    <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoBA} 
                alt="Buenos Aires Ciudad" 
                className="h-8 w-auto"
              />
              <div className="hidden sm:flex items-center gap-3">
                <div className="border-l border-[#E5E5E5] h-8"></div>
                <div>
                  <div className="text-[#1D1D1B]">GEDO</div>
                  <div className="text-[#6C6C6C] text-xs">Gestión Documental</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block border-l border-[#E5E5E5] pl-4">
              <p className="text-[#6C6C6C] text-sm">Gobierno de la Ciudad de Buenos Aires</p>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-4 py-2 rounded transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-[#0072C6] text-white'
                  : 'text-[#1D1D1B] hover:bg-[#F5F5F5]'
              }`}
            >
              Escritorio
            </button>
            <button
              onClick={() => onNavigate('consultas')}
              className={`px-4 py-2 rounded transition-colors ${
                activeView === 'consultas'
                  ? 'bg-[#0072C6] text-white'
                  : 'text-[#1D1D1B] hover:bg-[#F5F5F5]'
              }`}
            >
              Consultas
            </button>
            <button
              onClick={() => onNavigate('generate')}
              className={`px-4 py-2 rounded transition-colors ${
                activeView === 'generate'
                  ? 'bg-[#0072C6] text-white'
                  : 'text-[#1D1D1B] hover:bg-[#F5F5F5]'
              }`}
            >
              Generar Documento
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#1D1D1B] hover:bg-[#F5F5F5] rounded"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#E5E5E5]">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleNavigateDashboard}
                className={`px-4 py-2 rounded text-left transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-[#0072C6] text-white'
                    : 'text-[#1D1D1B] hover:bg-[#F5F5F5]'
                }`}
              >
                Escritorio
              </button>
              <button
                onClick={handleNavigateConsultas}
                className={`px-4 py-2 rounded text-left transition-colors ${
                  activeView === 'consultas'
                    ? 'bg-[#0072C6] text-white'
                    : 'text-[#1D1D1B] hover:bg-[#F5F5F5]'
                }`}
              >
                Consultas
              </button>
              <button
                onClick={handleNavigateGenerate}
                className={`px-4 py-2 rounded text-left transition-colors ${
                  activeView === 'generate'
                    ? 'bg-[#0072C6] text-white'
                    : 'text-[#1D1D1B] hover:bg-[#F5F5F5]'
                }`}
              >
                Generar Documento
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
