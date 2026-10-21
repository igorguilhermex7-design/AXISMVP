import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  LogOut, 
  ChevronRight, 
  Camera, 
  Edit2, 
  Check, 
  ShieldCheck, 
  QrCode, 
  Sparkles,
  Building,
  Bell,
  Copy
} from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut, loginAsDemo } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showVirtualCard, setShowVirtualCard] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || 'Lucas Santos',
    email: user?.email || 'morador@axiscondo.com.br',
    phone: '(11) 98765-4321',
    address: 'Edifício Solar das Flores, Apto 402 - Bloco B',
    photo: user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfileData({
            name: data.name || 'Lucas Santos',
            email: user.email || data.email || 'morador@axiscondo.com.br',
            phone: data.phone || '(11) 98765-4321',
            address: data.address || 'Edifício Solar das Flores, Apto 402 - Bloco B',
            photo: data.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profileData.name,
          phone: profileData.phone,
          address: profileData.address,
          avatar_url: profileData.photo,
        });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleSwitchToAdmin = async () => {
    await loginAsDemo('admin');
    navigate('/admin/dashboard');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('AXIS-MORADOR-402-B');
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3F5FC]">
          Meu Perfil & Carteirinha
        </h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#111528] border border-[#232942] hover:border-[#2867F5] text-[#2867F5] transition-colors"
        >
          {isEditing ? 'Salvar Dados' : 'Editar Perfil'}
        </button>
      </div>

      {/* User Header Profile Card */}
      <div className="p-4 rounded-3xl bg-[#111528] border border-[#232942]/80 flex items-center gap-4 relative overflow-hidden">
        {/* Subtle indigo glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10275C]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#2867F5]/50 bg-[#191D32]">
            <img 
              src={profileData.photo} 
              alt={profileData.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#27C875] rounded-full border-2 border-[#111528]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#F3F5FC] truncate">
              {profileData.name}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2867F5]/20 text-[#2867F5] font-bold shrink-0">
              Morador
            </span>
          </div>
          <p className="text-xs text-[#8B91A8] truncate mt-0.5">
            {profileData.email}
          </p>
          <p className="text-[11px] text-[#27C875] font-semibold mt-1">
            Plano Axis Condo Residencial Ativo
          </p>
        </div>
      </div>

      {/* Digital Carteirinha Virtual Card (high-end credit card / ID card look) */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-[#10275C] via-[#111528] to-[#191D32] border border-[#2867F5]/40 shadow-xl relative overflow-hidden space-y-4">
        {/* Tech decorative watermark circle */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#2867F5]/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2867F5] flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
            <span className="font-bold text-sm tracking-tight text-[#F3F5FC]">
              Axis Condo
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#F3F5FC]">
            Carteirinha Digital
          </span>
        </div>

        <div className="space-y-1 relative z-10 pt-2">
          <span className="text-[10px] font-mono text-[#8B91A8] uppercase tracking-widest block">
            Titular
          </span>
          <div className="text-lg font-extrabold text-[#F3F5FC] tracking-wide">
            {profileData.name.toUpperCase()}
          </div>
          <p className="text-xs text-[#8B91A8]">
            Edifício Solar das Flores · Apto 402 - Bloco B
          </p>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
          <div>
            <span className="text-[10px] text-[#8B91A8] block">Matrícula</span>
            <span className="font-mono font-bold text-[#F3F5FC]">AXIS-402B</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8B91A8] block">Validade</span>
            <span className="font-mono font-bold text-[#27C875]">12/2027</span>
          </div>
          <button
            onClick={() => setShowVirtualCard(!showVirtualCard)}
            className="px-2.5 py-1 rounded-xl bg-[#2867F5] text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm active:scale-95"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{showVirtualCard ? 'Ocultar QR' : 'Exibir QR'}</span>
          </button>
        </div>

        {/* Expandable QR inside the card */}
        {showVirtualCard && (
          <div className="pt-3 border-t border-white/10 text-center space-y-2 bg-[#050713]/80 p-4 rounded-2xl relative z-10">
            <div className="p-3 bg-white rounded-xl w-36 h-36 mx-auto flex items-center justify-center">
              <QrCode className="w-28 h-28 text-[#050713]" />
            </div>
            <button
              onClick={handleCopy}
              className="text-[11px] font-mono text-[#8B91A8] hover:text-[#F3F5FC] flex items-center justify-center gap-1 mx-auto"
            >
              {copiedToken ? <Check className="w-3 h-3 text-[#27C875]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedToken ? 'Copiado!' : 'Token: AXIS-MORADOR-402-B'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Details or Edit Form */}
      <Card className="bg-[#111528] border border-[#232942]/80 p-4 sm:p-5 rounded-3xl space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B91A8]">
          Dados Residenciais
        </h3>

        {isEditing ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-[#8B91A8]">Nome Completo</label>
              <Input 
                value={profileData.name} 
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#8B91A8]">Telefone / Celular</label>
              <Input 
                value={profileData.phone} 
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#8B91A8]">Unidade Residencial</label>
              <Input 
                value={profileData.address} 
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              />
            </div>
            <Button onClick={handleSave} className="w-full text-xs">
              Confirmar Alterações
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#191D32] border border-[#232942]/60">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2867F5]" />
                <span className="text-[#8B91A8]">E-mail</span>
              </div>
              <span className="font-semibold text-[#F3F5FC]">{profileData.email}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#191D32] border border-[#232942]/60">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#27C875]" />
                <span className="text-[#8B91A8]">Telefone</span>
              </div>
              <span className="font-semibold text-[#F3F5FC]">{profileData.phone}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#191D32] border border-[#232942]/60">
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-[#2867F5]" />
                <span className="text-[#8B91A8]">Condomínio</span>
              </div>
              <span className="font-semibold text-[#F3F5FC] truncate max-w-[200px]">{profileData.address}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Presentation Switch & Actions */}
      <div className="space-y-2.5">
        <button
          onClick={handleSwitchToAdmin}
          className="w-full p-4 rounded-2xl bg-[#191D32] hover:bg-[#232942] border border-[#2867F5]/40 text-[#F3F5FC] text-xs font-semibold flex items-center justify-between transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2867F5]/20 text-[#2867F5] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#F3F5FC]">Painel da Empresa (Axis Condo)</p>
              <p className="text-[10px] text-[#8B91A8]">Acessar central corporativa e fila de chamados</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8B91A8]" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full p-3.5 rounded-2xl bg-[#111528] hover:bg-[#F05268]/10 border border-[#232942] text-[#F05268] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>
  );
}
