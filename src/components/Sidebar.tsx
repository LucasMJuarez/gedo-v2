import { FileText, Inbox, Users, FolderOpen, Home } from 'lucide-react';
import { Badge } from './obelisco/Badge';

interface SidebarProps {
  activeView: 'dashboard' | 'generate';
  onNavigate: (view: 'dashboard' | 'generate') => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'tasks', label: 'Mis Tareas', icon: Home, count: 12 },
    { id: 'inbox', label: 'Bandeja Grupal', icon: Inbox, count: 5 },
    { id: 'joint', label: 'Tramitación Conjunta', icon: Users, count: 3 },
    { id: 'associate', label: 'Asociar Expediente', icon: FolderOpen },
  ];

  return (
    <aside className="w-64 bg-[#0072C6] text-white flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#0072C6]" />
          </div>
          <div>
            <h1 className="text-white">GEDO</h1>
            <p className="text-xs text-white/90">GCABA</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded hover:bg-[#005a9e] active:bg-[#004d85] transition-all duration-200 text-left group"
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.count && (
                    <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-xs">
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5EC1F3] rounded-full flex items-center justify-center">
            <span className="text-[#1D1D1B]">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate">Juan Domínguez</p>
            <p className="text-xs text-white/80 truncate">Funcionario Público</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
