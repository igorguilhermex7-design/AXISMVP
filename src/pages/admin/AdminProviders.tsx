import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function AdminProviders() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    icon_name: '',
    description: '',
    features: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (data) setServices(data);
    setLoading(false);
  }

  const handleOpenModal = (service: any = null) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title || '',
        category: service.category || '',
        price: service.price || '',
        icon_name: service.icon_name || '',
        description: service.description || '',
        features: Array.isArray(service.features) ? service.features.join('\n') : (service.features || '')
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: '',
        price: '',
        icon_name: '',
        description: '',
        features: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim() !== '')
    };

    if (editingId) {
      await supabase.from('services').update(payload).eq('id', editingId);
    } else {
      await supabase.from('services').insert([payload]);
    }

    handleCloseModal();
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este prestador?')) {
      await supabase.from('services').delete().eq('id', id);
      fetchServices();
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.category && s.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F5FC]">Gestão de Prestadores</h1>
          <p className="text-xs sm:text-sm text-[#8B91A8] mt-1">Gerencie os serviços e profissionais homologados no condomínio.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2 text-xs">
          <Plus size={16} />
          <span>Novo Prestador</span>
        </Button>
      </div>

      <div className="bg-[#111528] border border-[#232942] rounded-3xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#232942] flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B91A8]" size={18} />
            <input
              type="text"
              placeholder="Buscar prestadores por título ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#191D32] border border-[#232942] rounded-2xl py-2 pl-10 pr-4 text-sm text-[#F3F5FC] placeholder:text-[#8B91A8]/60 focus:outline-none focus:border-[#2867F5] transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase font-bold text-[#8B91A8] bg-[#050713]/60 border-b border-[#232942]">
              <tr>
                <th scope="col" className="px-6 py-3.5">Título</th>
                <th scope="col" className="px-6 py-3.5">Categoria</th>
                <th scope="col" className="px-6 py-3.5">Preço Base</th>
                <th scope="col" className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232942]/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Carregando prestadores...
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Nenhum prestador encontrado.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-[#191D32]/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#F3F5FC]">{service.title}</td>
                    <td className="px-6 py-4 capitalize text-[#8B91A8]">{service.category || '-'}</td>
                    <td className="px-6 py-4 text-[#2867F5] font-bold">{service.price || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => handleOpenModal(service)} className="p-2 text-[#8B91A8] hover:text-[#2867F5] hover:bg-[#191D32] rounded-xl transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(service.id)} className="p-2 text-[#F05268] hover:bg-[#F05268]/15 rounded-xl transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#111528] border border-[#232942] rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-[#232942] flex justify-between items-center sticky top-0 bg-[#111528] z-10">
              <h2 className="text-lg font-bold text-[#F3F5FC]">{editingId ? 'Editar Prestador' : 'Novo Prestador'}</h2>
              <button onClick={handleCloseModal} className="p-1.5 rounded-lg bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">Título do Serviço</label>
                  <Input name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Categoria</label>
                  <Input name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Preço Base</label>
                  <Input name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">Ícone (ex: Wrench, Zap, Key)</label>
                  <Input name="icon_name" value={formData.icon_name} onChange={handleChange} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">Descrição</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="w-full bg-[#191D32] border border-[#232942] rounded-2xl px-4 py-3 text-sm text-[#F3F5FC] placeholder:text-[#8B91A8]/50 focus:outline-none focus:border-[#2867F5] min-h-[80px] resize-none"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">Características (uma por linha)</label>
                  <textarea 
                    name="features" 
                    value={formData.features} 
                    onChange={handleChange} 
                    className="w-full bg-[#191D32] border border-[#232942] rounded-2xl px-4 py-3 text-sm text-[#F3F5FC] placeholder:text-[#8B91A8]/50 focus:outline-none focus:border-[#2867F5] min-h-[90px] resize-none"
                    placeholder="Atendimento 24h&#10;Garantia de 3 meses&#10;Profissionais certificados"
                  />
                </div>
              </div>
              <div className="pt-3 flex justify-end gap-2.5">
                <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
