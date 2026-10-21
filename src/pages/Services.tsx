import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Brush, 
  Key, 
  Scissors, 
  Truck, 
  MoreHorizontal, 
  Camera, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const iconMap: Record<string, any> = {
  Wrench, Zap, Hammer, Brush, Key, Scissors, Truck, MoreHorizontal
};

export default function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactNumber, setContactNumber] = useState('(11) 98765-4321');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase.from('services').select('*');
        if (error) throw error;
        if (data) setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetUserId = user?.id || 'demo-user-morador';
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('service_requests')
        .insert([
          {
            user_id: targetUserId,
            service_id: selectedCategory,
            contact_number: contactNumber || '(11) 98765-4321',
            problem_description: problemDescription,
            preferred_date: preferredDate || new Date().toISOString().split('T')[0],
            preferred_time: preferredTime || 'morning',
            status: 'pending'
          }
        ]);
        
      if (error) throw error;
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedCategory(null);
        setProblemDescription('');
        setPreferredDate('');
      }, 3500);
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceObj = services.find(c => c.id === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header */}
      <div className="space-y-1 pt-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3F5FC]">
          Serviços Residenciais
        </h1>
        <p className="text-xs text-[#8B91A8]">
          Profissionais homologados com garantia e desconto do condomínio
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Quick Emergency Banner */}
            <div className="p-4 rounded-2xl bg-[#111528] border border-[#232942]/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2867F5]/15 text-[#2867F5] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#F3F5FC] uppercase tracking-wider">
                    Plantão Emergencial 24h
                  </h3>
                  <p className="text-xs text-[#8B91A8] mt-0.5">
                    Chaveiro e desentupimento com chegada em até 40 min
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(services[0]?.id || '1')}
                className="px-3 py-1.5 rounded-xl bg-[#2867F5] hover:bg-[#1D54DB] text-white text-xs font-semibold shadow-sm shrink-0"
              >
                Chamar
              </button>
            </div>

            {/* Service Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {isLoading ? (
                <div className="col-span-full py-12 text-center text-[#8B91A8] text-xs">
                  Carregando catálogo de serviços...
                </div>
              ) : services.map((cat) => {
                const IconComponent = iconMap[cat.icon_name] || Wrench;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex flex-col items-start p-4 rounded-2xl bg-[#111528] border border-[#232942]/70 hover:border-[#2867F5]/60 hover:bg-[#191D32] transition-all group text-left active:scale-[0.98] shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#191D32] group-hover:bg-[#2867F5] border border-[#232942] group-hover:border-[#2867F5] flex items-center justify-center text-[#2867F5] group-hover:text-white transition-all mb-3">
                      <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-sm font-bold text-[#F3F5FC] leading-snug">
                      {cat.title}
                    </span>
                    <span className="text-[11px] text-[#8B91A8] mt-1 line-clamp-1">
                      {cat.description || 'Profissional credenciado'}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="w-9 h-9 rounded-xl bg-[#111528] border border-[#232942] hover:bg-[#191D32] text-[#8B91A8] hover:text-[#F3F5FC] flex items-center justify-center transition-colors"
                title="Voltar ao catálogo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-lg font-bold text-[#F3F5FC]">
                  Solicitar {selectedServiceObj?.title || 'Serviço'}
                </h2>
                <p className="text-xs text-[#8B91A8]">
                  Condomínio Solar das Flores · Apto 402
                </p>
              </div>
            </div>

            {isSuccess ? (
              <Card className="bg-[#111528] border border-[#27C875]/40 p-8 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#27C875]/15 text-[#27C875] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#F3F5FC]">Solicitação enviada com sucesso!</h3>
                <p className="text-xs text-[#8B91A8] max-w-xs">
                  Em até 30 minutos o prestador homologado entrará em contato para confirmar o horário e detalhar a visita.
                </p>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="mt-2 text-xs"
                >
                  Voltar ao Início
                </Button>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="bg-[#111528] border border-[#232942]/80 p-4 sm:p-5 space-y-4 rounded-3xl">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#8B91A8]">
                      Descrição do problema ou serviço
                    </label>
                    <textarea 
                      required
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      className="w-full h-28 rounded-2xl border border-[#232942] bg-[#191D32] px-4 py-3 text-sm text-[#F3F5FC] placeholder:text-[#8B91A8]/50 focus:outline-none focus:border-[#2867F5] focus:ring-1 focus:ring-[#2867F5] resize-none"
                      placeholder="Ex: Registro do banheiro com pequeno gotejamento constante, precisa de troca de carrapeta ou vedação..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#8B91A8]">
                      Fotos do local (opcional)
                    </label>
                    <div className="border border-dashed border-[#232942] hover:border-[#2867F5]/50 bg-[#191D32]/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-[#111528] group-hover:bg-[#2867F5]/20 text-[#8B91A8] group-hover:text-[#2867F5] flex items-center justify-center transition-colors mb-1.5">
                        <Camera className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-[#F3F5FC]">Adicionar foto do reparo</p>
                      <p className="text-[10px] text-[#8B91A8] mt-0.5">Ajuda o profissional a trazer peças adequadas</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#8B91A8]">
                      WhatsApp / Telefone para contato
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="(11) 98765-4321" 
                      required 
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#8B91A8]">
                        Data preferida
                      </label>
                      <Input 
                        type="date" 
                        required 
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#8B91A8]">
                        Turno de preferência
                      </label>
                      <select 
                        required
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="flex h-12 w-full rounded-2xl border border-[#232942] bg-[#111528] px-4 py-2 text-sm text-[#F3F5FC] focus:outline-none focus:border-[#2867F5] focus:ring-1 focus:ring-[#2867F5] transition-all"
                      >
                        <option value="morning">Manhã (08h às 12h)</option>
                        <option value="afternoon">Tarde (13h às 18h)</option>
                        <option value="evening">Noite (18h às 21h)</option>
                      </select>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-2.5">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    size="md" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Confirmar e Enviar Solicitação'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="md"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
