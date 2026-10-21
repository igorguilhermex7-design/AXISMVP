import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wrench, 
  ShoppingBag, 
  Tag, 
  ArrowUpRight, 
  Sparkles
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { motion } from 'motion/react';

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface ChartBarData {
  label: string;
  sublabel: string;
  value: number;
  highlight?: boolean;
  economy: number;
}

export default function Analytics() {
  const [activePeriod, setActivePeriod] = useState<Period>('monthly');
  const [selectedBarIndex, setSelectedBarIndex] = useState<number>(3); // Default to current month/period

  // Dynamic realistic data for client profile (few services, relevant and tangible savings)
  const periodData: Record<Period, { total: string; dateLabel: string; bars: ChartBarData[] }> = {
    daily: {
      total: 'R$ 45,50',
      dateLabel: 'Hoje · 21 Outubro 2026',
      bars: [
        { label: 'Seg', sublabel: '17 Out', value: 0, economy: 0 },
        { label: 'Ter', sublabel: '18 Out', value: 0, economy: 0 },
        { label: 'Qua', sublabel: '19 Out', value: 75, economy: 140 },
        { label: 'Qui', sublabel: '20 Out', value: 20, economy: 38 },
        { label: 'Hoje', sublabel: '21 Out', value: 35, highlight: true, economy: 45.5 },
      ]
    },
    weekly: {
      total: 'R$ 165,50',
      dateLabel: 'Esta Semana · Outubro 2026',
      bars: [
        { label: 'Sem 1', sublabel: '01-07 Out', value: 45, economy: 85 },
        { label: 'Sem 2', sublabel: '08-14 Out', value: 65, economy: 120 },
        { label: 'Sem 3', sublabel: '15-21 Out', value: 85, highlight: true, economy: 165.5 },
        { label: 'Sem 4', sublabel: '22-28 Out', value: 15, economy: 25 },
      ]
    },
    monthly: {
      total: 'R$ 380,00',
      dateLabel: 'Mês Atual (Outubro 2026)',
      bars: [
        { label: 'Jul', sublabel: 'Mês 07', value: 40, economy: 240 },
        { label: 'Ago', sublabel: 'Mês 08', value: 55, economy: 310 },
        { label: 'Set', sublabel: 'Mês 09', value: 50, economy: 290 },
        { label: 'Out', sublabel: 'Atual', value: 90, highlight: true, economy: 380 },
      ]
    },
    yearly: {
      total: 'R$ 1.840,00',
      dateLabel: 'Ano de 2026 · Acumulado',
      bars: [
        { label: '1º Tri', sublabel: 'Jan - Mar', value: 50, economy: 480 },
        { label: '2º Tri', sublabel: 'Abr - Jun', value: 60, economy: 540 },
        { label: '3º Tri', sublabel: 'Jul - Set', value: 75, economy: 620 },
        { label: '4º Tri', sublabel: 'Out - Dez', value: 90, highlight: true, economy: 200 },
      ]
    }
  };

  const currentDataset = periodData[activePeriod];
  const activeBar = currentDataset.bars[selectedBarIndex] || currentDataset.bars[0];

  const handlePeriodChange = (period: Period) => {
    setActivePeriod(period);
    const hlIdx = periodData[period].bars.findIndex(b => b.highlight);
    setSelectedBarIndex(hlIdx !== -1 ? hlIdx : 0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3F5FC]">
            Relatório de Economia Real
          </h1>
          <p className="text-xs text-[#8B91A8] mt-0.5">
            Benefícios e descontos obtidos no Ed. Solar das Flores
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111528] border border-[#232942] text-[11px] text-[#27C875] font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+22.5%</span>
        </div>
      </div>

      {/* Rounded Pill Filter Bar */}
      <div className="flex items-center justify-between p-1 rounded-full bg-[#111528] border border-[#232942]/80">
        {(['daily', 'weekly', 'monthly', 'yearly'] as Period[]).map((period) => {
          const labels: Record<Period, string> = {
            daily: 'Diário',
            weekly: 'Semanal',
            monthly: 'Mensal',
            yearly: 'Anual'
          };
          const isActive = activePeriod === period;
          return (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-[#2867F5] text-white shadow-md shadow-[#2867F5]/30'
                  : 'text-[#8B91A8] hover:text-[#F3F5FC]'
              }`}
            >
              {labels[period]}
            </button>
          );
        })}
      </div>

      {/* Main Metric & Clean Typography */}
      <div className="text-center pt-2 pb-1 space-y-1">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F3F5FC] tabular-nums">
          {currentDataset.total}
        </div>
        <p className="text-xs text-[#8B91A8] flex items-center justify-center gap-1.5">
          <span>{currentDataset.dateLabel}</span>
          <span className="text-[#232942]">·</span>
          <span className="text-[#27C875] font-medium">Economia Tangível</span>
        </p>
      </div>

      {/* Interactive Bar Chart Card with Single Electric Blue Highlight */}
      <Card className="bg-[#111528] border border-[#232942]/80 p-5 rounded-3xl relative overflow-hidden">
        {/* Subtle ambient indigo background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#10275C]/35 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Active selection callout banner */}
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#232942]/60">
            <span className="text-[#8B91A8]">
              Período selecionado: <strong className="text-[#F3F5FC]">{activeBar.label} ({activeBar.sublabel})</strong>
            </span>
            <span className="text-[#2867F5] font-semibold tabular-nums">
              R$ {activeBar.economy.toFixed(2)} economizados
            </span>
          </div>

          {/* Vertical Bar Chart */}
          <div className="h-44 flex items-end justify-between gap-3 sm:gap-4 px-2 pt-4">
            {currentDataset.bars.map((bar, idx) => {
              const isSelected = selectedBarIndex === idx;
              return (
                <div
                  key={bar.label}
                  onClick={() => setSelectedBarIndex(idx)}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-full h-32 flex items-end justify-center">
                    <motion.div
                      layout
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(bar.value, 8)}%` }}
                      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                      className={`w-full max-w-[48px] rounded-2xl transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-[#2867F5] shadow-lg shadow-[#2867F5]/40 ring-2 ring-[#4B83FF]/40'
                          : 'bg-[#1E243A] hover:bg-[#272E49]'
                      }`}
                    >
                      {isSelected && bar.economy > 0 && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#050713] text-[#F3F5FC] text-[10px] font-bold py-0.5 px-1.5 rounded border border-[#2867F5] shadow-sm whitespace-nowrap">
                          R$ {bar.economy}
                        </div>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Label under bar */}
                  <span
                    className={`text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'text-[#F3F5FC] font-bold'
                        : 'text-[#8B91A8] group-hover:text-[#F3F5FC]'
                    }`}
                  >
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-[#8B91A8]/80 text-center pt-2">
            Toque na coluna para detalhar a economia do intervalo
          </p>
        </div>
      </Card>

      {/* Realistic Category Breakdown Cards (Totals add up to R$ 1.840,00) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B91A8]">
            Detalhamento de Economia (Ano)
          </h2>
          <span className="text-xs text-[#8B91A8]">Total: R$ 1.840,00</span>
        </div>

        {/* Category 1: Manutenção & Reparos */}
        <div className="p-4 rounded-2xl bg-[#111528] border border-[#232942]/70 hover:border-[#2867F5]/50 transition-all flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#191D32] border border-[#2A3150] flex items-center justify-center text-[#2867F5]">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F3F5FC] leading-tight">
                Serviços & Manutenção Residencial
              </p>
              <p className="text-xs text-[#8B91A8] mt-0.5">
                Economia acumulada: <span className="text-[#F3F5FC] font-medium">R$ 1.040,00</span> (2 chamados)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/25 text-xs font-semibold tabular-nums">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>56% do total</span>
          </div>
        </div>

        {/* Category 2: Farmácias & Convênios */}
        <div className="p-4 rounded-2xl bg-[#111528] border border-[#232942]/70 hover:border-[#2867F5]/50 transition-all flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#191D32] border border-[#2A3150] flex items-center justify-center text-[#27C875]">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F3F5FC] leading-tight">
                Farmácias & Saúde (Drogasil)
              </p>
              <p className="text-xs text-[#8B91A8] mt-0.5">
                Economia acumulada: <span className="text-[#F3F5FC] font-medium">R$ 490,00</span> (cupons recorrentes)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/25 text-xs font-semibold tabular-nums">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>27% do total</span>
          </div>
        </div>

        {/* Category 3: Mercados & Alimentação */}
        <div className="p-4 rounded-2xl bg-[#111528] border border-[#232942]/70 hover:border-[#2867F5]/50 transition-all flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#191D32] border border-[#2A3150] flex items-center justify-center text-[#2867F5]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F3F5FC] leading-tight">
                Mercados & Alimentação Local
              </p>
              <p className="text-xs text-[#8B91A8] mt-0.5">
                Economia acumulada: <span className="text-[#F3F5FC] font-medium">R$ 310,00</span> (Carrefour / Pizzaria)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#27C875]/15 text-[#27C875] border border-[#27C875]/25 text-xs font-semibold tabular-nums">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>17% do total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
