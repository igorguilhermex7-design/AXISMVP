import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  ExternalLink, 
  QrCode, 
  ChevronLeft, 
  Navigation, 
  Star,
  Tag,
  Copy,
  Check,
  Percent
} from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

const filters = ['Todos', 'Mercado', 'Pet', 'Farmácia', 'Restaurante', 'Academia', 'Salão'];

export default function Partnerships() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [partners, setPartners] = useState<any[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  useEffect(() => {
    async function fetchPartnerships() {
      try {
        const { data, error } = await supabase.from('partnerships').select('*');
        if (error) throw error;
        if (data) setPartners(data);
      } catch (error) {
        console.error('Error fetching partnerships:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPartnerships();
  }, []);

  const filteredPartners = partners.filter(p => {
    const matchesFilter = activeFilter === 'Todos' || p.category === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      <AnimatePresence mode="wait">
        {!selectedPartner ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="space-y-1 pt-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3F5FC]">
                Clube de Descontos
              </h1>
              <p className="text-xs text-[#8B91A8]">
                Economia exclusiva para moradores credenciados pelo condomínio
              </p>
            </div>

            {/* Search Input */}
            <Input 
              placeholder="Buscar por farmácia, mercado, academia..." 
              icon={<Search className="w-4 h-4 text-[#8B91A8]" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#111528] border-[#232942]"
            />
            
            {/* Filter Pills */}
            <div className="flex overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 hide-scrollbar">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0 ${
                    activeFilter === filter 
                      ? 'bg-[#2867F5] text-white shadow-sm shadow-[#2867F5]/30' 
                      : 'bg-[#111528] border border-[#232942] text-[#8B91A8] hover:text-[#F3F5FC]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Partner Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {isLoading ? (
                <div className="col-span-full py-12 text-center text-xs text-[#8B91A8]">
                  Carregando parceiros conveniados...
                </div>
              ) : filteredPartners.map(partner => (
                <div 
                  key={partner.id} 
                  onClick={() => setSelectedPartner(partner)}
                  className="rounded-2xl bg-[#111528] border border-[#232942]/80 hover:border-[#2867F5]/50 overflow-hidden cursor-pointer group transition-all active:scale-[0.98] shadow-md shadow-black/20 flex flex-col"
                >
                  <div className="h-36 relative overflow-hidden bg-[#191D32]">
                    <img 
                      src={partner.image_url || partner.image} 
                      alt={partner.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050713]/90 via-[#050713]/30 to-transparent" />
                    
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold bg-[#111528]/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#232942] text-amber-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{partner.rating}</span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-white">
                      <span className="bg-[#27C875] text-[#050713] text-[11px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm">
                        {partner.discount}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#8B91A8] font-medium bg-[#111528]/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-[#232942]">
                        <MapPin className="w-3 h-3 text-[#2867F5]" /> {partner.distance}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-[#F3F5FC] group-hover:text-[#2867F5] transition-colors leading-tight">
                          {partner.name}
                        </h3>
                        <span className="text-[10px] uppercase font-bold text-[#8B91A8]">
                          {partner.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8B91A8] truncate mt-0.5">
                        {partner.address}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#232942]/60 flex items-center justify-between text-xs">
                      <span className="text-[#27C875] font-semibold text-[11px] truncate">
                        {partner.coupon_title}
                      </span>
                      <span className="text-[#2867F5] font-bold text-[11px] shrink-0">
                        Resgatar →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {!isLoading && filteredPartners.length === 0 && (
                <div className="col-span-full py-12 text-center text-xs text-[#8B91A8]">
                  Nenhum parceiro encontrado para esta busca.
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="details"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-4"
          >
            <button 
              onClick={() => {
                setSelectedPartner(null);
                setShowQR(false);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#8B91A8] hover:text-[#F3F5FC] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar aos parceiros</span>
            </button>

            {/* Partner Hero Card */}
            <div className="rounded-3xl overflow-hidden relative h-56 bg-[#191D32] border border-[#232942]">
              <img 
                src={selectedPartner.image_url || selectedPartner.image} 
                alt={selectedPartner.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050713] via-[#050713]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#2867F5] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {selectedPartner.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-[#111528]/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#232942]">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{selectedPartner.rating}</span>
                  </div>
                </div>
                <h1 className="text-2xl font-extrabold text-[#F3F5FC] tracking-tight">
                  {selectedPartner.name}
                </h1>
                <p className="text-[#27C875] text-lg font-extrabold">
                  {selectedPartner.discount}
                </p>
              </div>
            </div>

            {/* Voucher & QR Card */}
            <Card className="bg-[#111528] border border-[#232942]/80 p-5 rounded-3xl space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#F3F5FC] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#2867F5]" />
                  <span>Benefício: {selectedPartner.coupon_title}</span>
                </h3>
                <p className="text-xs text-[#8B91A8] leading-relaxed">
                  Apresente o cupom ou QR Code no momento do fechamento da conta para validar o desconto exclusivo de condômino.
                </p>
              </div>
              
              {showQR ? (
                <div className="p-4 rounded-2xl bg-white text-[#050713] max-w-xs mx-auto text-center space-y-3 shadow-lg">
                  <div className="w-40 h-40 mx-auto bg-slate-100 rounded-xl p-2 flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-[#050713]" />
                  </div>
                  <div className="font-mono font-bold tracking-widest text-sm text-[#050713]">
                    {selectedPartner.coupon || `AXIS-${selectedPartner.id.toUpperCase()}`}
                  </div>
                  <button
                    onClick={() => handleCopyCoupon(selectedPartner.coupon || `AXIS-${selectedPartner.id.toUpperCase()}`)}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#050713] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    {copiedCoupon ? <Check className="w-3.5 h-3.5 text-[#27C875]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCoupon ? 'Copiado!' : 'Copiar Cupom'}</span>
                  </button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowQR(true)} 
                  className="w-full text-xs font-semibold"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar QR Code de Desconto
                </Button>
              )}

              <div className="pt-3 border-t border-[#232942] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B91A8]">
                  Condições do Convênio
                </h4>
                <p className="text-xs text-[#8B91A8] leading-relaxed">
                  {selectedPartner.rules || 'Válido para compras presenciais e delivery oficial. Não cumulativo com outras promoções sazonais.'}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => alert(`Endereço: ${selectedPartner.address} (A ${selectedPartner.distance} do condomínio)`)}
                >
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#2867F5]" />
                  Localização
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => alert(`Telefone do parceiro: ${selectedPartner.phone}`)}
                >
                  <Phone className="w-3.5 h-3.5 mr-1 text-[#27C875]" />
                  Contato
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
