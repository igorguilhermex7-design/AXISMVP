import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function AdminPartnerships() {
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    discount: '',
    rating: '',
    image_url: '',
    address: '',
    distance: '',
    phone: '',
    rules: '',
    coupon_title: ''
  });

  useEffect(() => {
    fetchPartnerships();
  }, []);

  async function fetchPartnerships() {
    setLoading(true);
    const { data, error } = await supabase.from('partnerships').select('*').order('created_at', { ascending: false });
    if (data) setPartnerships(data);
    setLoading(false);
  }

  const handleOpenModal = (partner: any = null) => {
    if (partner) {
      setEditingId(partner.id);
      setFormData({
        name: partner.name || '',
        category: partner.category || '',
        discount: partner.discount || '',
        rating: partner.rating || '',
        image_url: partner.image_url || partner.image || '',
        address: partner.address || '',
        distance: partner.distance || '',
        phone: partner.phone || '',
        rules: partner.rules || '',
        coupon_title: partner.coupon_title || partner.couponTitle || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category: '',
        discount: '',
        rating: '',
        image_url: '',
        address: '',
        distance: '',
        phone: '',
        rules: '',
        coupon_title: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      image: formData.image_url, // fallback for older schema
      couponTitle: formData.coupon_title // fallback for older schema
    };

    if (editingId) {
      const { error } = await supabase.from('partnerships').update(payload).eq('id', editingId);
      if (error) alert('Erro ao atualizar parceiro: ' + error.message);
      else {
        fetchPartnerships();
        handleCloseModal();
      }
    } else {
      const { error } = await supabase.from('partnerships').insert([payload]);
      if (error) alert('Erro ao criar parceiro: ' + error.message);
      else {
        fetchPartnerships();
        handleCloseModal();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este parceiro?')) {
      const { error } = await supabase.from('partnerships').delete().eq('id', id);
      if (error) alert('Erro ao excluir: ' + error.message);
      else fetchPartnerships();
    }
  };

  const filteredPartnerships = partnerships.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão de Parceiros</h1>
          <p className="opacity-60">Gerencie os estabelecimentos do clube de vantagens.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          <span>Novo Parceiro</span>
        </Button>
      </div>

      <div className="bg-[#111528] border border-[#232942] rounded-3xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#232942] flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B91A8]" size={18} />
            <input
              type="text"
              placeholder="Buscar parceiros por nome ou categoria..."
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
                <th scope="col" className="px-6 py-3.5">Nome</th>
                <th scope="col" className="px-6 py-3.5">Categoria</th>
                <th scope="col" className="px-6 py-3.5">Desconto</th>
                <th scope="col" className="px-6 py-3.5">Avaliação</th>
                <th scope="col" className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232942]/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Carregando parceiros...
                  </td>
                </tr>
              ) : filteredPartnerships.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-[#8B91A8]">
                    Nenhum parceiro encontrado.
                  </td>
                </tr>
              ) : (
                filteredPartnerships.map((partner) => (
                  <tr key={partner.id} className="hover:bg-[#191D32]/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#F3F5FC] flex items-center gap-3">
                      <img src={partner.image_url || partner.image} alt={partner.name} className="w-10 h-10 rounded-xl object-cover bg-[#191D32]" />
                      <span>{partner.name}</span>
                    </td>
                    <td className="px-6 py-4 capitalize text-[#8B91A8]">{partner.category}</td>
                    <td className="px-6 py-4 text-[#27C875] font-bold">{partner.discount}</td>
                    <td className="px-6 py-4 text-[#F3F5FC]">{partner.rating}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => handleOpenModal(partner)} className="p-2 text-[#8B91A8] hover:text-[#2867F5] hover:bg-[#191D32] rounded-xl transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(partner.id)} className="p-2 text-[#F05268] hover:bg-[#F05268]/15 rounded-xl transition-colors">
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
          <div className="bg-[#111528] border border-[#232942] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-[#232942] flex justify-between items-center sticky top-0 bg-[#111528] z-10">
              <h2 className="text-lg font-bold text-[#F3F5FC]">{editingId ? 'Editar Parceiro' : 'Novo Parceiro'}</h2>
              <button onClick={handleCloseModal} className="p-1.5 rounded-lg bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Nome</label>
                  <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Categoria</label>
                  <Input name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Desconto (ex: 15% OFF)</label>
                  <Input name="discount" value={formData.discount} onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Avaliação (ex: 4.8)</label>
                  <Input name="rating" value={formData.rating} onChange={handleChange} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">URL da Imagem</label>
                  <Input name="image_url" value={formData.image_url} onChange={handleChange} required />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">Endereço</label>
                  <Input name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Distância (ex: 2.5 km)</label>
                  <Input name="distance" value={formData.distance} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8B91A8]">Telefone</label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">Título do Cupom</label>
                  <Input name="coupon_title" value={formData.coupon_title} onChange={handleChange} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#8B91A8]">Regras de Uso</label>
                  <textarea 
                    name="rules" 
                    value={formData.rules} 
                    onChange={handleChange} 
                    className="w-full bg-[#191D32] border border-[#232942] rounded-2xl px-4 py-3 text-sm text-[#F3F5FC] placeholder:text-[#8B91A8]/50 focus:outline-none focus:border-[#2867F5] min-h-[90px] resize-none"
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
