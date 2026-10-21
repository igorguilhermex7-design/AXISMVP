import React, { useEffect, useState } from 'react';
import { Search, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminResidents() {
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResidents();
  }, []);

  async function fetchResidents() {
    setLoading(true);
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setResidents(data);
    setLoading(false);
  }

  const filteredResidents = residents.filter(r => 
    (r.name && r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.address && r.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.condo && r.condo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.email && r.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F5FC]">
            Base de Condôminos Atendidos
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/30">
            Rede Ativa
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#8B91A8] mt-1">
          Moradores ativos com acesso aos serviços técnicos homologados e convênios da rede Axis Condo.
        </p>
      </div>

      <div className="bg-[#111528] border border-[#232942] rounded-3xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#232942] flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B91A8]" size={16} />
            <input
              type="text"
              placeholder="Buscar por morador, condomínio ou unidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#191D32] border border-[#232942] rounded-2xl py-2 pl-10 pr-4 text-xs text-[#F3F5FC] placeholder:text-[#8B91A8]/60 focus:outline-none focus:border-[#2867F5] transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase font-bold text-[#8B91A8] bg-[#050713]/60 border-b border-[#232942]">
              <tr>
                <th scope="col" className="px-6 py-3.5">Condômino</th>
                <th scope="col" className="px-6 py-3.5">Condomínio & Unidade</th>
                <th scope="col" className="px-6 py-3.5">Contato</th>
                <th scope="col" className="px-6 py-3.5">Membro Desde</th>
                <th scope="col" className="px-6 py-3.5 text-right">Status do Clube</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232942]/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Carregando base de condôminos...
                  </td>
                </tr>
              ) : filteredResidents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Nenhum condômino encontrado.
                  </td>
                </tr>
              ) : (
                filteredResidents.map((resident) => (
                  <tr key={resident.id} className="hover:bg-[#191D32]/50 transition-colors">
                    {/* Condômino */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#191D32] overflow-hidden border border-[#232942] shrink-0">
                          <img 
                            src={resident.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(resident.name || 'User')}&background=191D32&color=F3F5FC`} 
                            alt={resident.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-xs text-[#F3F5FC]">{resident.name || 'Sem nome'}</p>
                          <p className="text-[11px] text-[#8B91A8]">{resident.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Condomínio e Unidade */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F3F5FC]">
                        <Building size={13} className="text-[#2867F5]" />
                        <span>{resident.condo || 'Edifício Solar das Flores'}</span>
                      </div>
                      <p className="text-[11px] text-[#8B91A8] ml-4">
                        {resident.unit || resident.address || 'Unidade Residencial'}
                      </p>
                    </td>

                    {/* Contato */}
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-[#8B91A8]">
                        <Phone size={12} className="text-[#27C875]" />
                        {resident.phone || '(11) 98765-4321'}
                      </span>
                    </td>

                    {/* Data */}
                    <td className="px-6 py-4 text-xs text-[#8B91A8]">
                      {new Date(resident.created_at).toLocaleDateString('pt-BR')}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/30">
                        Ativo
                      </span>
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
