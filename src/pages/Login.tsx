import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  Smartphone,
  Building2,
  Headphones
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { resetDemoData } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAsDemo } = useAuth();

  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('morador@axiscondo.com.br');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (location.pathname.startsWith('/admin') || params.get('role') === 'admin') {
      setActiveTab('admin');
      setEmail('admin@axiscondo.com.br');
    }
  }, [location]);

  const handleTabChange = (tab: 'user' | 'admin') => {
    setActiveTab(tab);
    setError(null);
    if (tab === 'admin') {
      setEmail('admin@axiscondo.com.br');
      setPassword('123456');
    } else {
      setEmail('morador@axiscondo.com.br');
      setPassword('123456');
    }
  };

  const handleDirectDemoLogin = async (targetRole: 'user' | 'admin') => {
    setIsLoading(true);
    setError(null);
    try {
      await loginAsDemo(targetRole);
      if (targetRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err?.message || 'Erro ao entrar na demonstração.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const lowerEmail = email.toLowerCase().trim();
      const targetRole = lowerEmail.includes('admin') || activeTab === 'admin' ? 'admin' : 'user';
      await loginAsDemo(targetRole);

      if (targetRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err?.message || 'Erro ao realizar login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#050713] text-[#F3F5FC] px-4 sm:px-6 relative overflow-hidden selection:bg-[#2867F5] selection:text-white">
      {/* Subtle ambient indigo background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#10275C]/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 right-[-100px] w-[500px] h-[500px] bg-[#2867F5]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-4xl mx-auto pt-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#2867F5] rounded-2xl flex items-center justify-center text-white text-lg font-extrabold shadow-lg shadow-[#2867F5]/40">
            A
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#F3F5FC] block leading-none">
              Axis Condo
            </span>
            <span className="text-[11px] text-[#8B91A8] block mt-0.5">
              Demonstração Interativa MVP para Apresentação
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            resetDemoData();
            window.location.reload();
          }}
          className="text-xs px-2.5 py-1.5 rounded-xl bg-[#111528] hover:bg-[#191D32] border border-[#232942] text-[#8B91A8] hover:text-[#F3F5FC] transition-colors flex items-center gap-1.5"
          title="Restaurar dados iniciais do MVP"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Resetar Demonstração</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto my-auto py-8 relative z-10 space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F5FC]">
            Plataforma Axis Condo
          </h2>
          <p className="text-xs sm:text-sm text-[#8B91A8] max-w-xs mx-auto">
            Acesse diretamente em 1 clique para testar o aplicativo do morador ou o painel operacional da empresa.
          </p>
        </div>

        {/* 1-Click Fast Access Cards (Morador vs Painel da Empresa) */}
        <div className="grid grid-cols-1 gap-3">
          {/* Option 1: Morador */}
          <button
            type="button"
            onClick={() => handleDirectDemoLogin('user')}
            disabled={isLoading}
            className="w-full p-4 rounded-3xl bg-[#111528] border border-[#232942] hover:border-[#2867F5] hover:bg-[#191D32] transition-all text-left flex items-center justify-between group active:scale-[0.99] shadow-lg shadow-black/30"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#2867F5]/15 border border-[#2867F5]/30 text-[#2867F5] group-hover:bg-[#2867F5] group-hover:text-white flex items-center justify-center transition-all shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#F3F5FC]">
                    Entrar como Morador
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#27C875]/20 text-[#27C875]">
                    App Condômino
                  </span>
                </div>
                <p className="text-xs text-[#8B91A8] mt-0.5">
                  Carteirinha digital QR, chamados residenciais e economia real
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8B91A8] group-hover:text-[#2867F5] group-hover:translate-x-1 transition-all shrink-0" />
          </button>

          {/* Option 2: Painel da Empresa (Axis Condo Central Operações) */}
          <button
            type="button"
            onClick={() => handleDirectDemoLogin('admin')}
            disabled={isLoading}
            className="w-full p-4 rounded-3xl bg-[#111528] border border-[#232942] hover:border-[#2867F5] hover:bg-[#191D32] transition-all text-left flex items-center justify-between group active:scale-[0.99] shadow-lg shadow-black/30"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#191D32] border border-[#2A3150] text-[#2867F5] group-hover:bg-[#2867F5] group-hover:text-white flex items-center justify-center transition-all shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#F3F5FC]">
                    Painel da Empresa (Axis Condo)
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2867F5]/20 text-[#2867F5]">
                    Operações
                  </span>
                </div>
                <p className="text-xs text-[#8B91A8] mt-0.5">
                  Central de recepção e despacho de chamados de múltiplos condomínios
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8B91A8] group-hover:text-[#2867F5] group-hover:translate-x-1 transition-all shrink-0" />
          </button>
        </div>

        {/* Manual Credentials Box */}
        <div className="pt-2">
          <div className="p-5 rounded-3xl bg-[#111528] border border-[#232942]/80 space-y-4">
            {/* Pill Tabs */}
            <div className="flex p-1 rounded-full bg-[#050713] border border-[#232942]">
              <button
                type="button"
                onClick={() => handleTabChange('user')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeTab === 'user'
                    ? 'bg-[#2867F5] text-white shadow-sm'
                    : 'text-[#8B91A8] hover:text-[#F3F5FC]'
                }`}
              >
                Condômino
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('admin')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeTab === 'admin'
                    ? 'bg-[#2867F5] text-white shadow-sm'
                    : 'text-[#8B91A8] hover:text-[#F3F5FC]'
                }`}
              >
                Central Axis Condo (Empresa)
              </button>
            </div>

            <form onSubmit={handleFormLogin} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#8B91A8]">E-mail corporativo ou do morador</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@axiscondo.com.br"
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#8B91A8]">Senha</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-[#F05268]/15 border border-[#F05268]/30 text-xs text-[#F05268]">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full text-xs font-semibold mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : `Acessar como ${activeTab === 'admin' ? 'Central Axis Condo (Empresa)' : 'Condômino'}`}
              </Button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto py-4 text-center text-xs text-[#8B91A8] relative z-10 border-t border-[#232942]/40">
        <p>© 2026 Axis Condo. Solução corporativa de atendimento e benefícios para condomínios.</p>
      </footer>
    </div>
  );
}
