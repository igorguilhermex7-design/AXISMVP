import React, { useEffect, useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, Building, UserCheck, Wrench, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    const { data } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setRequests(data);
    setLoading(false);
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('service_requests')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (!error) {
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = 
      (r.profiles?.name && r.profiles.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (r.services?.title && r.services.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.condo_name && r.condo_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.problem_description && r.problem_description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-400/15 text-amber-400 border border-amber-400/25">
            <Clock size={13} /> Aguardando Despacho
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#2867F5]/15 text-[#2867F5] border border-[#2867F5]/25">
            <Wrench size={13} /> Técnico Despachado
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/25">
            <CheckCircle size={13} /> Concluído
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F05268]/15 text-[#F05268] border border-[#F05268]/25">
            <XCircle size={13} /> Cancelado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F5FC]">
            Central de Chamados dos Condôminos
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2867F5]/20 text-[#2867F5] border border-[#2867F5]/30">
            Fila Axis Condo
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#8B91A8] mt-1">
          Recepção, triagem e despacho operacional de chamados técnicos abertos pelos condôminos dos condomínios parceiros.
        </p>
      </div>

      <div className="bg-[#111528] border border-[#232942] rounded-3xl overflow-hidden shadow-lg">
        {/* Search & Status Filters */}
        <div className="p-4 border-b border-[#232942] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B91A8]" size={16} />
            <input
              type="text"
              placeholder="Buscar por morador, condomínio ou problema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#191D32] border border-[#232942] rounded-2xl py-2 pl-10 pr-4 text-xs text-[#F3F5FC] placeholder:text-[#8B91A8]/60 focus:outline-none focus:border-[#2867F5] transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'pending', label: 'Pendentes' },
              { id: 'completed', label: 'Concluídos' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterStatus === tab.id
                    ? 'bg-[#2867F5] text-white shadow-sm'
                    : 'bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase font-bold text-[#8B91A8] bg-[#050713]/60 border-b border-[#232942]">
              <tr>
                <th scope="col" className="px-5 py-3.5">Condômino</th>
                <th scope="col" className="px-5 py-3.5">Condomínio & Unidade</th>
                <th scope="col" className="px-5 py-3.5">Serviço Técnico</th>
                <th scope="col" className="px-5 py-3.5">Descrição do Chamado</th>
                <th scope="col" className="px-5 py-3.5">Data / Turno</th>
                <th scope="col" className="px-5 py-3.5">Status Operacional</th>
                <th scope="col" className="px-5 py-3.5 text-right">Ação Axis Condo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232942]/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Carregando chamados da central Axis Condo...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Nenhum chamado encontrado para este filtro.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#191D32]/50 transition-colors">
                    {/* Morador */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-xs text-[#F3F5FC]">
                        {req.profiles?.name || 'Condômino'}
                      </div>
                      <div className="text-[11px] text-[#8B91A8] flex items-center gap-1 mt-0.5">
                        <Phone size={10} className="text-[#27C875]" />
                        <span>{req.contact_number || '(11) 98765-4321'}</span>
                      </div>
                    </td>

                    {/* Condomínio de Origem */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#F3F5FC]">
                        <Building size={13} className="text-[#2867F5] shrink-0" />
                        <span className="truncate max-w-[170px]">{req.condo_name || 'Edifício Solar das Flores'}</span>
                      </div>
                      <span className="text-[11px] text-[#8B91A8] block ml-4">
                        {req.unit_label || 'Apto 402'}
                      </span>
                    </td>

                    {/* Serviço */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold text-[#2867F5] block">
                        {req.services?.title || 'Serviço Geral Axis Condo'}
                      </span>
                      <span className="text-[10px] text-[#8B91A8]">
                        Tabela Conveniada
                      </span>
                    </td>

                    {/* Descrição */}
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-xs text-[#F3F5FC] line-clamp-2" title={req.problem_description}>
                        {req.problem_description || 'Solicitação de atendimento técnico padrão.'}
                      </p>
                    </td>

                    {/* Data / Turno */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-xs text-[#F3F5FC]">
                        {req.preferred_date ? new Date(req.preferred_date).toLocaleDateString('pt-BR') : new Date(req.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-[10px] text-[#8B91A8]">
                        {req.preferred_time === 'morning' ? 'Manhã (08h - 12h)' : req.preferred_time === 'afternoon' ? 'Tarde (13h - 18h)' : 'Horário Comercial'}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getStatusBadge(req.status)}
                    </td>

                    {/* Ação Operacional */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <select 
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className="bg-[#191D32] border border-[#232942] rounded-xl text-xs px-2.5 py-1.5 text-[#F3F5FC] focus:outline-none focus:border-[#2867F5] transition-colors cursor-pointer"
                      >
                        <option value="pending">Pendente Despacho</option>
                        <option value="in_progress">Em Atendimento</option>
                        <option value="completed">Concluído</option>
                        <option value="cancelled">Cancelar</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
