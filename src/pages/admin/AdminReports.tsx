import React, { useState } from 'react';
import { Download, FileText, TrendingUp, Users, Tag } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

export default function AdminReports() {
  const [exporting, setExporting] = useState<string | null>(null);

  const exportToCSV = (filename: string, rows: any[]) => {
    if (!rows || !rows.length) {
      alert('Não há dados para exportar.');
      return;
    }

    const separator = ',';
    const keys = Object.keys(rows[0]);
    
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          if (typeof cell === 'object') cell = JSON.stringify(cell);
          cell = cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExport = async (type: string) => {
    setExporting(type);
    try {
      if (type === 'partnerships') {
        const { data, error } = await supabase.from('partnerships').select('*');
        if (error) throw error;
        exportToCSV('parceiros.csv', data);
      } else if (type === 'requests') {
        const { data, error } = await supabase.from('service_requests').select('*, profiles(name, email), services(title)');
        if (error) throw error;
        
        const flattenedData = data.map(req => ({
          id: req.id,
          status: req.status,
          created_at: req.created_at,
          user_name: req.profiles?.name || '',
          user_email: req.profiles?.email || '',
          service_title: req.services?.title || '',
          problem_description: req.problem_description || '',
          preferred_date: req.preferred_date || '',
          preferred_time: req.preferred_time || '',
          contact_number: req.contact_number || ''
        }));
        
        exportToCSV('solicitacoes.csv', flattenedData);
      } else if (type === 'users') {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) throw error;
        exportToCSV('moradores.csv', data);
      } else {
        alert('Este relatório ainda não possui dados suficientes para exportação.');
      }
    } catch (error: any) {
      console.error('Error exporting data:', error);
      alert('Erro ao exportar dados: ' + error.message);
    } finally {
      setExporting(null);
    }
  };

  const reports = [
    { id: 'partnerships', title: 'Parceiros e Cupons', description: 'Relatório de parceiros cadastrados no clube de vantagens.', icon: Tag, color: 'text-[#27C875]' },
    { id: 'requests', title: 'Solicitações de Serviço', description: 'Histórico de serviços solicitados e status.', icon: FileText, color: 'text-[#2867F5]' },
    { id: 'users', title: 'Engajamento de Moradores', description: 'Métricas de acesso e uso do aplicativo.', icon: Users, color: 'text-[#4480FF]' },
    { id: 'economy', title: 'Economia Gerada', description: 'Estimativa de economia total gerada pelo clube de vantagens.', icon: TrendingUp, color: 'text-[#27C875]' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F5FC]">Relatórios & Exportações</h1>
        <p className="text-xs sm:text-sm text-[#8B91A8] mt-1">Exporte dados em formato CSV para auditoria e prestação de contas condominial.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="p-5 rounded-3xl bg-[#111528] border border-[#232942] hover:border-[#2867F5]/40 transition-all flex flex-col justify-between shadow-lg">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-[#191D32] border border-[#232942] ${report.color} shrink-0`}>
                <report.icon size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#F3F5FC]">{report.title}</h3>
                <p className="text-xs text-[#8B91A8] leading-relaxed">{report.description}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#232942]/60 flex justify-end">
              <Button 
                variant="secondary" 
                size="sm"
                className="text-xs gap-1.5"
                onClick={() => handleExport(report.id)}
                disabled={exporting === report.id}
              >
                <Download size={14} />
                <span>{exporting === report.id ? 'Exportando...' : 'Exportar CSV'}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
