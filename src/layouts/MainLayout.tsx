import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Wrench, 
  Tag, 
  User, 
  ShieldCheck, 
  QrCode, 
  X,
  Copy,
  Check,
  LogOut,
  Sparkles,
  Building
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: BarChart3, label: 'Análise', path: '/analytics' },
  { icon: Wrench, label: 'Serviços', path: '/services' },
  { icon: Tag, label: 'Parcerias', path: '/partnerships' },
  { icon: User, label: 'Perfil', path: '/profile' },
];

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loginAsDemo, signOut } = useAuth();

  const [showGlobalQrModal, setShowGlobalQrModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSwitchToAdmin = async () => {
    await loginAsDemo('admin');
    navigate('/admin/dashboard');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AXIS-MORADOR-402-B');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050713] text-[#F3F5FC] flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-[#2867F5] selection:text-white">
      {/* Background ambient glow matching palette */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#10275C]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 right-[-100px] w-[500px] h-[500px] bg-[#2867F5]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Presentation Bar */}
      <header className="w-full border-b border-[#232942]/60 bg-[#050713]/90 backdrop-blur-md sticky top-0 z-30 px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2867F5] flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-[#2867F5]/30">
              A
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-[#F3F5FC] leading-none block">
                Axis Condo
              </span>
              <span className="text-[10px] text-[#8B91A8] block mt-0.5">
                Portal do Morador · Ed. Solar das Flores
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Switcher to Company Admin Panel */}
            <button
              onClick={handleSwitchToAdmin}
              className="px-3 py-1.5 rounded-xl bg-[#111528] hover:bg-[#191D32] border border-[#232942] hover:border-[#2867F5]/50 text-[#F3F5FC] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Acessar Painel Central da Empresa Axis Condo"
            >
              <Building className="w-3.5 h-3.5 text-[#2867F5]" />
              <span className="hidden sm:inline">Painel da Empresa (Axis Condo)</span>
              <span className="sm:hidden">Painel Axis</span>
            </button>

            {/* Sign Out */}
            <button
              onClick={async () => {
                await signOut();
                navigate('/login');
              }}
              className="p-1.5 rounded-xl hover:bg-[#111528] text-[#8B91A8] hover:text-[#F05268] transition-colors"
              title="Sair do Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Container (Fluid layout for desktop & responsive testing in browser) */}
      <div className="w-full flex-1 flex flex-col items-center justify-start relative">
        <div className="w-full max-w-4xl mx-auto flex flex-col flex-1">
          <main className="flex-1 w-full">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>

      {/* Floating Pill Bottom Navigation Bar (exact styling from reference) */}
      <nav aria-label="Navegação Principal" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-[390px] sm:max-w-[420px]">
        <div className="px-3.5 py-2 rounded-full bg-[#111528]/95 backdrop-blur-2xl border border-[#232942]/90 shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(40,103,245,0.15)] flex items-center justify-between gap-1">
          {/* 5 Linear Nav Items */}
          <div className="flex items-center justify-between flex-1 pr-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl transition-all duration-200 relative group min-w-[46px]",
                    isActive
                      ? "text-[#2867F5]"
                      : "text-[#8B91A8] hover:text-[#F3F5FC]"
                  )}
                  title={item.label}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive ? "stroke-[2.4] scale-110 drop-shadow-[0_0_8px_rgba(40,103,245,0.6)]" : "group-hover:scale-105"
                  )} />
                  <span className={cn(
                    "text-[9px] font-semibold tracking-tight mt-0.5",
                    isActive ? "text-[#2867F5] font-bold" : "text-[#8B91A8]"
                  )}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activePillDot"
                      className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#2867F5]"
                    />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Prominent Circular Electric Blue Action Button (Scan / Carteirinha QR) */}
          <button
            onClick={() => setShowGlobalQrModal(true)}
            className="w-11 h-11 rounded-full bg-[#2867F5] text-white flex items-center justify-center shadow-lg shadow-[#2867F5]/45 hover:bg-[#1D54DB] hover:scale-105 active:scale-95 transition-all shrink-0 ml-1"
            title="Carteirinha Virtual & Scanner QR"
            aria-label="Abrir Carteirinha Virtual QR"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Global Carteirinha QR Modal */}
      <AnimatePresence>
        {showGlobalQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-[#111528] border border-[#232942] p-6 space-y-5 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setShowGlobalQrModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#2867F5] font-bold flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Carteirinha Digital
                </span>
                <h3 className="text-lg font-bold text-[#F3F5FC]">
                  {user?.user_metadata?.name || 'Lucas Santos'}
                </h3>
                <p className="text-xs text-[#8B91A8]">
                  Edifício Solar das Flores · Apto 402 - Bloco B
                </p>
              </div>

              {/* QR Code Graphic */}
              <div className="p-4 rounded-2xl bg-white mx-auto w-44 h-44 flex items-center justify-center shadow-inner">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#050713]">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#050713" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="19" y="19" width="7" height="7" fill="#050713" />

                  <rect x="65" y="10" width="25" height="25" fill="#050713" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="74" y="19" width="7" height="7" fill="#050713" />

                  <rect x="10" y="65" width="25" height="25" fill="#050713" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="19" y="74" width="7" height="7" fill="#050713" />

                  <rect x="42" y="12" width="6" height="6" fill="#050713" />
                  <rect x="50" y="20" width="6" height="6" fill="#050713" />
                  <rect x="42" y="30" width="6" height="6" fill="#050713" />
                  <rect x="25" y="45" width="6" height="6" fill="#050713" />
                  <rect x="40" y="45" width="6" height="6" fill="#2867F5" />
                  <rect x="52" y="45" width="6" height="6" fill="#050713" />
                  <rect x="65" y="45" width="6" height="6" fill="#050713" />
                  <rect x="80" y="45" width="6" height="6" fill="#050713" />
                  <rect x="45" y="60" width="6" height="6" fill="#050713" />
                  <rect x="60" y="60" width="6" height="6" fill="#050713" />
                  <rect x="75" y="60" width="6" height="6" fill="#050713" />
                  <rect x="50" y="75" width="6" height="6" fill="#050713" />
                </svg>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCopyCode}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#191D32] hover:bg-[#232942] border border-[#232942] text-xs font-semibold text-[#F3F5FC] flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-[#27C875]" /> : <Copy className="w-4 h-4 text-[#8B91A8]" />}
                  <span>{copiedCode ? 'Código Copiado!' : 'Copiar Token: AXIS-MORADOR-402-B'}</span>
                </button>
                <p className="text-[11px] text-[#8B91A8]">
                  Válido até 12/2027 · Acesso à Portaria e Descontos do Clube
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
