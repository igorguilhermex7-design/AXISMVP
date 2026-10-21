import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  Tag, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    condosCount: 8,
    activeRequests: 5,
    pendingRequests: 2,
    providersCount: 18,
    partnersCount: 6,
    totalEconomy: 'R$ 38.450,00'
  });
  const [recentRequests, setRecentRequests] = useState<any[]>([]);

  const requestChartData = [
    { name: 'Mai', chamados: 18 },
    { name: 'Jun', chamados: 22 },
    { name: 'Jul', chamados: 29 },
    { name: 'Ago', chamados: 34 },
    { name: 'Set', chamados: 25 },
    { name: 'Out', chamados: 28 },
  ];

  const economyChartData = [
    { name: 'Mai', economia: 18200 },
    { name: 'Jun', economia: 22400 },
    { name: 'Jul', economia: 27900 },
    { name: 'Ago', economia: 31600 },
    { name: 'Set', economia: 34200 },
    { name: 'Out', economia: 38450 },
  ];

  useEffect(() => {
    async function fetchDashboardData() {
      const { data: requests } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (requests) {
        setRecentRequests(requests);
      }
    }

    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      title: 'Condomínios Atendidos', 
      value: '8', 
      icon: Building2, 
      color: 'text-[#2867F5]', 
      desc: 'Solar das Flores, Grand Park, etc.', 
      link: '/admin/moradores' 
    },
    { 
      title: 'Chamados no Mês', 
      value: '28', 
      icon: FileText, 
      color: 'text-amber-400', 
      desc: '2 pendentes de despacho imediato', 
      link: '/admin/solicitacoes' 
    },
    { 
      title: 'Prestadores Homologados', 
      value: '18', 
      icon: Briefcase, 
      color: 'text-[#2867F5]', 
      desc: 'Encanadores, eletricistas, chaveiros', 
      link: '/admin/prestadores' 
    },
    { 
      title: 'Economia Total Entregue', 
      value: 'R$ 38.450', 
      icon: TrendingUp, 
      color: 'text-[#27C875]', 
      desc: 'Média de R$ 380/morador participante', 
      link: '/admin/relatorios' 
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header: Company Operations Command */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F5FC]">
              Central de Operações Axis Condo
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2867F5]/20 text-[#2867F5] border border-[#2867F5]/30">
              Painel da Empresa
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8B91A8] mt-1">
            Central operacional para recepção, triagem e despacho de chamados de todos os condomínios atendidos.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/solicitacoes')}
          className="px-4 py-2.5 rounded-xl bg-[#2867F5] hover:bg-[#1D54DB] text-white font-semibold text-xs transition-colors shadow-md shadow-[#2867F5]/25 flex items-center gap-1.5 self-start sm:self-auto active:scale-95"
        >
          <span>Fila de Chamados Recebidos</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            onClick={() => navigate(stat.link)}
            className="p-4 rounded-2xl bg-[#111528] border border-[#232942]/80 hover:border-[#2867F5]/50 cursor-pointer transition-all shadow-md group"
          >
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B91A8]">{stat.title}</span>
              <div className="p-2 rounded-xl bg-[#191D32] group-hover:scale-105 transition-transform">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F5FC] tabular-nums">
              {stat.value}
            </div>
            <p className="text-[11px] text-[#8B91A8] mt-1 truncate">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Operational Dispatch Summary & Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Company ticket volume */}
        <div className="p-5 rounded-3xl bg-[#111528] border border-[#232942]/80 space-y-4">
          <div className="flex items-center justify-between border-b border-[#232942]/60 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#F3F5FC]">Volume de Chamados Recebidos</h3>
              <p className="text-xs text-[#8B91A8]">Histórico semestral de demandas dos condomínios</p>
            </div>
            <span className="text-xs font-semibold text-[#2867F5]">156 chamados no semestre</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232942" />
                <XAxis dataKey="name" stroke="#8B91A8" fontSize={11} />
                <YAxis stroke="#8B91A8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111528', borderColor: '#232942', borderRadius: '12px', color: '#F3F5FC', fontSize: '12px' }}
                />
                <Bar dataKey="chamados" name="Chamados Recebidos" fill="#2867F5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Economy generated across all condominiums */}
        <div className="p-5 rounded-3xl bg-[#111528] border border-[#232942]/80 space-y-4">
          <div className="flex items-center justify-between border-b border-[#232942]/60 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#F3F5FC]">Economia Total Gerada aos Moradores</h3>
              <p className="text-xs text-[#8B91A8]">Economia acumulada repassada aos condôminos atendidos</p>
            </div>
            <span className="text-xs font-semibold text-[#27C875]">+12.4% este mês</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={economyChartData}>
                <defs>
                  <linearGradient id="colorEcoCorporate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#27C875" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#27C875" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#232942" />
                <XAxis dataKey="name" stroke="#8B91A8" fontSize={11} />
                <YAxis stroke="#8B91A8" fontSize={11} tickFormatter={(val) => `R$${val/1000}k`} />
                <Tooltip 
                  formatter={(val: any) => [`R$ ${Number(val).toLocaleString('pt-BR')}`, 'Economia Total']}
                  contentStyle={{ backgroundColor: '#111528', borderColor: '#232942', borderRadius: '12px', color: '#F3F5FC', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="economia" stroke="#27C875" strokeWidth={2.5} fillOpacity={1} fill="url(#colorEcoCorporate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live Ticket Dispatch Queue (Company overview showing multiple condo origins) */}
      <div className="p-5 rounded-3xl bg-[#111528] border border-[#232942]/80 space-y-4">
        <div className="flex items-center justify-between border-b border-[#232942]/60 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#F3F5FC]">
              Fila Recente de Chamados dos Condôminos
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/15 text-amber-400 border border-amber-400/25">
              Tempo Real
            </span>
          </div>
          <button
            onClick={() => navigate('/admin/solicitacoes')}
            className="text-xs font-semibold text-[#2867F5] hover:text-[#4480FF] transition-colors"
          >
            Gerenciar todos
          </button>
        </div>

        <div className="space-y-2.5">
          {recentRequests.map((req) => (
            <div 
              key={req.id}
              className="p-3.5 rounded-2xl bg-[#191D32] border border-[#232942] hover:border-[#2867F5]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  req.status === 'pending' 
                    ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30' 
                    : 'bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/30'
                }`}>
                  {req.status === 'pending' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F3F5FC]">
                      {req.profiles?.name || 'Condômino'}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#111528] text-[#2867F5] border border-[#232942] font-medium">
                      {req.condo_name || 'Edifício Solar das Flores'} · {req.unit_label || 'Apto 402'}
                    </span>
                  </div>
                  <p className="text-xs text-[#8B91A8] mt-0.5 line-clamp-1">
                    {req.services?.title || 'Serviço Axis Condo'}: {req.problem_description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#232942]/60">
                <span className="text-[11px] text-[#8B91A8]">
                  {new Date(req.created_at).toLocaleDateString('pt-BR')}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  req.status === 'pending'
                    ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                    : 'bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/30'
                }`}>
                  {req.status === 'pending' ? 'Pendente Despacho' : 'Atendido'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
