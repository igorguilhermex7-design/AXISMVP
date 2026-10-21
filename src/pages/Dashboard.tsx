import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  Tag, 
  QrCode, 
  Building2, 
  Bell, 
  TrendingUp, 
  ChevronRight, 
  Sparkles, 
  CreditCard,
  X,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ name: string; avatar_url: string; address?: string; condo?: string; unit?: string } | null>(null);

  // Modals for interactive UX
  const [showQrModal, setShowQrModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickRequest, setShowQuickRequest] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedQuickService, setSelectedQuickService] = useState('Encanador Hidráulico');

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) setProfile(data);
    }
    fetchProfile();
  }, [user]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AXIS-MORADOR-402-B');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Welcome & Actions Area */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full ring-2 ring-[#2867F5]/40 overflow-hidden bg-[#111528] flex items-center justify-center">
              <img
                src={profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                alt="Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#27C875] rounded-full border-2 border-[#050713]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold text-[#F3F5FC] tracking-tight">
                Olá, {profile?.name ? profile.name.split(' ')[0] : 'Lucas'}
              </h1>
              <Sparkles className="w-3.5 h-3.5 text-[#2867F5]" />
            </div>
            <p className="text-xs text-[#8B91A8] truncate max-w-[200px] sm:max-w-xs">
              {profile?.address || 'Edifício Solar das Flores · Apto 402 - Bloco B'}
            </p>
          </div>
        </div>

        {/* Top Right Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotifications(true)}
            className="w-10 h-10 rounded-2xl bg-[#111528] border border-[#232942] hover:bg-[#191D32] text-[#F3F5FC] flex items-center justify-center transition-all relative active:scale-95"
            title="Avisos da Portaria"
          >
            <Bell className="w-4 h-4 text-[#8B91A8]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#2867F5] animate-pulse" />
          </button>

          <button
            onClick={() => setShowQrModal(true)}
            className="w-10 h-10 rounded-2xl bg-[#111528] border border-[#232942] hover:bg-[#191D32] text-[#F3F5FC] flex items-center justify-center transition-all active:scale-95"
            title="Carteirinha Virtual QR"
          >
            <QrCode className="w-4 h-4 text-[#8B91A8]" />
          </button>
        </div>
      </div>

      {/* Main Metric Section (Realistic, tangible and relevant savings) */}
      <div className="relative pt-1">
        {/* Subtle ambient indigo background glow */}
        <div className="absolute -top-6 left-1/4 w-44 h-44 bg-[#10275C]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <span className="text-xs font-semibold text-[#8B91A8] tracking-wide uppercase">
            Economia Real Acumulada no Ano
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F3F5FC] tabular-nums">
            R$ 1.840,00
          </div>
          
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-[#27C875]">
              <TrendingUp className="w-3.5 h-3.5" />
              + R$ 380,00 este mês
            </span>
            <span className="text-[#8B91A8]">· 2 serviços técnicos + 2 cupons</span>
          </div>
        </div>
      </div>

      {/* 4 Square Shortcut Buttons */}
      <div className="grid grid-cols-4 gap-3 pt-1">
        {/* Button 1: Solicitar */}
        <button
          onClick={() => setShowQuickRequest(true)}
          className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-[#111528] border border-[#232942]/80 hover:border-[#2867F5]/50 hover:bg-[#191D32] transition-all aspect-square active:scale-95 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#191D32] group-hover:bg-[#2867F5]/15 text-[#2867F5] flex items-center justify-center transition-colors">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-[#8B91A8] group-hover:text-[#F3F5FC] mt-2 transition-colors">
            Pedir Serviço
          </span>
        </button>

        {/* Button 2: Clube Descontos */}
        <button
          onClick={() => navigate('/partnerships')}
          className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-[#111528] border border-[#232942]/80 hover:border-[#2867F5]/50 hover:bg-[#191D32] transition-all aspect-square active:scale-95 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#191D32] group-hover:bg-[#2867F5]/15 text-[#27C875] flex items-center justify-center transition-colors">
            <Tag className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-[#8B91A8] group-hover:text-[#F3F5FC] mt-2 transition-colors">
            Descontos
          </span>
        </button>

        {/* Button 3: Carteirinha QR */}
        <button
          onClick={() => setShowQrModal(true)}
          className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-[#111528] border border-[#232942]/80 hover:border-[#2867F5]/50 hover:bg-[#191D32] transition-all aspect-square active:scale-95 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#191D32] group-hover:bg-[#2867F5]/15 text-[#2867F5] flex items-center justify-center transition-colors">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-[#8B91A8] group-hover:text-[#F3F5FC] mt-2 transition-colors">
            Carteirinha
          </span>
        </button>

        {/* Button 4: Portaria & Mural */}
        <button
          onClick={() => setShowNotifications(true)}
          className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-[#111528] border border-[#232942]/80 hover:border-[#2867F5]/50 hover:bg-[#191D32] transition-all aspect-square active:scale-95 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#191D32] group-hover:bg-[#2867F5]/15 text-[#8B91A8] group-hover:text-[#F3F5FC] flex items-center justify-center transition-colors">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-[#8B91A8] group-hover:text-[#F3F5FC] mt-2 transition-colors">
            Portaria
          </span>
        </button>
      </div>

      {/* Condominium Digital Membership Card */}
      <div className="p-4 rounded-2xl bg-[#111528] border border-[#232942]/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#191D32] border border-[#2A3150] flex items-center justify-center text-[#2867F5]">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#F3F5FC]">Membro Clube Axis Condo</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#27C875]/20 text-[#27C875] font-semibold">
                Ativo
              </span>
            </div>
            <p className="text-xs text-[#8B91A8] mt-0.5">
              Matrícula #0402-B · Solar das Flores
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowQrModal(true)}
          className="px-3 py-1.5 rounded-xl bg-[#191D32] hover:bg-[#232942] border border-[#232942] text-xs font-semibold text-[#F3F5FC] flex items-center gap-1.5 transition-colors"
        >
          <span>Abrir QR</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#8B91A8]" />
        </button>
      </div>

      {/* Recent Activity / Realistic Services with Clear Savings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B91A8]">
            Serviços & Cupons Utilizados
          </h2>
          <button
            onClick={() => navigate('/services')}
            className="text-xs font-semibold text-[#2867F5] hover:text-[#4480FF] transition-colors"
          >
            Ver histórico
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Service 1: Plumbing repair */}
          <div className="p-3.5 rounded-2xl bg-[#111528] border border-[#232942]/60 hover:border-[#2867F5]/40 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#191D32] border border-[#232942] flex items-center justify-center text-[#2867F5]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F3F5FC] leading-tight">
                  Reparo Hidráulico (Válvula de Descarga)
                </p>
                <p className="text-xs text-[#8B91A8] mt-0.5">
                  Ontem · Encanador Homologado Axis Condo
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#27C875] tabular-nums block">
                + R$ 140,00
              </span>
              <span className="text-[10px] text-[#8B91A8]">Economia de tabela</span>
            </div>
          </div>

          {/* Service 2: Electrical fix */}
          <div className="p-3.5 rounded-2xl bg-[#111528] border border-[#232942]/60 hover:border-[#2867F5]/40 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#191D32] border border-[#232942] flex items-center justify-center text-[#2867F5]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F3F5FC] leading-tight">
                  Eletricista Residencial (Revisão & Quadro)
                </p>
                <p className="text-xs text-[#8B91A8] mt-0.5">
                  12 Out · Técnico Credenciado
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#27C875] tabular-nums block">
                + R$ 120,00
              </span>
              <span className="text-[10px] text-[#8B91A8]">Subsídio Clube</span>
            </div>
          </div>

          {/* Partner 1: Drogasil */}
          <div className="p-3.5 rounded-2xl bg-[#111528] border border-[#232942]/60 hover:border-[#2867F5]/40 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#191D32] border border-[#232942] flex items-center justify-center text-[#27C875]">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F3F5FC] leading-tight">
                  Drogasil · Medicamentos e Cuidados
                </p>
                <p className="text-xs text-[#8B91A8] mt-0.5">
                  05 Out · Desconto de 25% no caixa
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#27C875] tabular-nums block">
                + R$ 74,50
              </span>
              <span className="text-[10px] text-[#8B91A8]">Cupom resgatado</span>
            </div>
          </div>

          {/* Partner 2: Carrefour Express */}
          <div className="p-3.5 rounded-2xl bg-[#111528] border border-[#232942]/60 hover:border-[#2867F5]/40 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#191D32] border border-[#232942] flex items-center justify-center text-[#27C875]">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F3F5FC] leading-tight">
                  Carrefour Express · Hortifrúti e Padaria
                </p>
                <p className="text-xs text-[#8B91A8] mt-0.5">
                  01 Out · 10% OFF em compras
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#27C875] tabular-nums block">
                + R$ 45,50
              </span>
              <span className="text-[10px] text-[#8B91A8]">Economia direta</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL 1: Digital Carteirinha with QR Code --- */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-[#111528] border border-[#232942] p-6 space-y-5 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#2867F5] font-bold">
                  Carteirinha Digital Axis Condo
                </span>
                <h3 className="text-lg font-bold text-[#F3F5FC]">
                  {profile?.name || 'Lucas Santos'}
                </h3>
                <p className="text-xs text-[#8B91A8]">
                  {profile?.address || 'Edifício Solar das Flores · Apto 402'}
                </p>
              </div>

              {/* QR Code Container */}
              <div className="p-4 rounded-2xl bg-white mx-auto w-48 h-48 flex items-center justify-center shadow-inner">
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
                  <rect x="65" y="75" width="6" height="6" fill="#050713" />
                  <rect x="80" y="75" width="6" height="6" fill="#050713" />
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
                  Apresente este QR Code na portaria ou nos parceiros para validar seu desconto.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: Notifications / Portaria --- */}
      <AnimatePresence>
        {showNotifications && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-[#111528] border border-[#232942] p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#232942] pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#2867F5]" />
                  <h3 className="font-bold text-base text-[#F3F5FC]">Mural da Portaria & Avisos</h3>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1.5 rounded-lg bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#191D32] border border-[#232942] space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#F3F5FC]">
                    <span className="text-[#27C875]">📦 Encomenda Recebida</span>
                    <span className="text-[#8B91A8] text-[10px]">Há 20 min</span>
                  </div>
                  <p className="text-[#8B91A8]">
                    Um pacote da Amazon foi recebido na portaria para o Apto 402. Disponível para retirada na recepção.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#191D32] border border-[#232942] space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#F3F5FC]">
                    <span className="text-[#2867F5]">🔧 Manutenção Preventiva</span>
                    <span className="text-[#8B91A8] text-[10px]">Hoje · 09:00</span>
                  </div>
                  <p className="text-[#8B91A8]">
                    Limpeza e inspeção dos geradores programada para amanhã. Sem oscilações de energia previstas.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#191D32] border border-[#232942] space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#F3F5FC]">
                    <span className="text-[#8B91A8]">🏢 Contato da Portaria</span>
                    <span className="text-[#8B91A8] text-[10px]">Ramal 94</span>
                  </div>
                  <p className="text-[#8B91A8]">
                    Para liberação de visitantes ou dúvidas, contate a portaria diretamente no interfone pelo ramal 94.
                  </p>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="w-full text-xs"
              >
                Fechar Mural
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 3: Quick Service Request Drawer --- */}
      <AnimatePresence>
        {showQuickRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-[#111528] border border-[#232942] p-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#232942] pb-3">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#2867F5]" />
                  <h3 className="font-bold text-base text-[#F3F5FC]">Solicitação Rápida de Serviço</h3>
                </div>
                <button
                  onClick={() => setShowQuickRequest(false)}
                  className="p-1.5 rounded-lg bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#8B91A8]">
                Selecione o profissional homologado para atendimento prioritário na sua unidade com garantia Axis Condo:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Encanador Hidráulico', 'Eletricista Residencial', 'Chaveiro 24h', 'Pintura & Reparos'].map((srv) => (
                  <button
                    key={srv}
                    onClick={() => setSelectedQuickService(srv)}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      selectedQuickService === srv
                        ? 'bg-[#2867F5] border-[#2867F5] text-white shadow-md shadow-[#2867F5]/25'
                        : 'bg-[#191D32] border-[#232942] text-[#8B91A8] hover:text-[#F3F5FC]'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  variant="primary"
                  className="flex-1 text-xs"
                  onClick={() => {
                    navigate('/services');
                    setShowQuickRequest(false);
                  }}
                >
                  Avançar para Agendamento
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowQuickRequest(false)}
                  className="text-xs"
                >
                  Cancelar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
