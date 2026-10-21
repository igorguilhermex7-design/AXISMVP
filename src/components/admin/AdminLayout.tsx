import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Tag, 
  FileText, 
  LogOut, 
  FileBarChart, 
  Building2,
  Smartphone,
  Headphones
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

export default function AdminLayout() {
  const { signOut, loginAsDemo, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleSwitchToResident = async () => {
    await loginAsDemo('user');
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin/dashboard' },
    { icon: FileText, label: 'Chamados dos Condôminos', path: '/admin/solicitacoes' },
    { icon: Briefcase, label: 'Prestadores Homologados', path: '/admin/prestadores' },
    { icon: Tag, label: 'Parceiros & Cupons', path: '/admin/parceiros' },
    { icon: Users, label: 'Base de Condôminos', path: '/admin/moradores' },
    { icon: FileBarChart, label: 'Relatórios Corporativos', path: '/admin/relatorios' },
  ];

  return (
    <div className="min-h-screen bg-[#050713] text-[#F3F5FC] flex selection:bg-[#2867F5] selection:text-white">
      {/* Background ambient glow */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[350px] bg-[#10275C]/25 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#111528] border-r border-[#232942] flex flex-col hidden md:flex shrink-0 relative z-20">
        <div className="p-5 border-b border-[#232942] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2867F5] text-white flex items-center justify-center text-sm font-extrabold shadow-md shadow-[#2867F5]/30">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold text-[#F3F5FC] leading-none">Axis Condo</h1>
              </div>
              <p className="text-[10px] text-[#2867F5] font-semibold mt-1 uppercase tracking-wider">
                Painel da Empresa · Operações
              </p>
            </div>
          </div>
        </div>

        {/* Central Operations Badge */}
        <div className="mx-4 mt-3 p-2.5 rounded-xl bg-[#191D32] border border-[#232942] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#27C875] animate-pulse" />
          <span className="text-[11px] text-[#8B91A8]">
            Central de Despacho & Chamados
          </span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-xs font-semibold",
                  isActive 
                    ? "bg-[#2867F5] text-white shadow-md shadow-[#2867F5]/25" 
                    : "text-[#8B91A8] hover:bg-[#191D32] hover:text-[#F3F5FC]"
                )
              }
            >
              <item.icon size={17} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Demo Switcher & Corporate User Info */}
        <div className="p-4 border-t border-[#232942] space-y-3">
          <div className="bg-[#191D32] p-3 rounded-2xl border border-[#2A3150] space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2867F5]/20 border border-[#2867F5]/40 flex items-center justify-center text-[#2867F5] font-bold text-xs">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-xs text-[#F3F5FC] truncate">Equipe Axis Condo</p>
                <p className="text-[10px] text-[#8B91A8] truncate">Central de Atendimento</p>
              </div>
            </div>

            <button
              onClick={handleSwitchToResident}
              className="w-full py-2 px-3 rounded-xl bg-[#2867F5] hover:bg-[#1D54DB] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Visualizar o App do Condômino"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Visualizar App do Condômino</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[#F05268] hover:bg-[#F05268]/10 text-xs font-medium transition-colors"
          >
            <LogOut size={15} />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Mobile / Responsive Header for Company Admin */}
        <header className="md:hidden bg-[#111528] border-b border-[#232942] p-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2867F5] text-white flex items-center justify-center text-xs font-bold">
              A
            </div>
            <div>
              <span className="font-bold text-sm text-[#F3F5FC] leading-none block">Axis Condo</span>
              <span className="text-[10px] text-[#8B91A8] block">Painel da Empresa · Operações</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwitchToResident}
              className="px-2.5 py-1.5 rounded-xl bg-[#2867F5] text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
            >
              <Smartphone className="w-3 h-3" />
              <span>App Condômino</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#F05268] hover:bg-[#F05268]/10"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex overflow-x-auto p-2 bg-[#111528] border-b border-[#232942] gap-1 hide-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-[#2867F5] text-white"
                    : "text-[#8B91A8] hover:text-[#F3F5FC]"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
