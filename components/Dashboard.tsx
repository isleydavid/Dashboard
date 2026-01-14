import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  FileText,
  TrendingUp,
  LayoutGrid,
  Zap,
  Star,
  ArrowUpRight,
  User,
  Activity
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ServiceMetric, DeptEfficiency } from '../types';

const METRICS_DATA: ServiceMetric[] = [
  { label: 'Limpeza Urbana', days: 2.5, totalPercentage: 75, operational: 40, fiscalization: 25, administrative: 10 },
  { label: 'Iluminação', days: 1.8, totalPercentage: 60, operational: 35, fiscalization: 20, administrative: 5 },
  { label: 'Poda de Árvore', days: 4.2, totalPercentage: 45, operational: 25, fiscalization: 15, administrative: 5 },
  { label: 'Drenagem', days: 3.0, totalPercentage: 30, operational: 15, fiscalization: 10, administrative: 5 },
];

const EFFICIENCY_DATA: DeptEfficiency[] = [
  { id: 1, code: 'EM', name: 'EMLUR', subName: 'LIMPEZA & COLETA', efficiency: 95, solicitations: '12.5k', color: 'bg-emerald-500' },
  { id: 2, code: 'SE', name: 'SEURB', subName: 'URBANISMO', efficiency: 88, solicitations: '10.2k', color: 'bg-blue-500' },
  { id: 3, code: 'SM', name: 'SEMOB', subName: 'MOBILIDADE', efficiency: 72, solicitations: '8.1k', color: 'bg-orange-500' },
  { id: 4, code: 'SS', name: 'SESAU', subName: 'SAÚDE', efficiency: 81, solicitations: '5.4k', color: 'bg-emerald-400' },
];

interface Highlight {
  icon: React.ReactNode;
  label: string;
  value: string;
  type: 'trend' | 'rating' | 'demand' | 'alert';
}

const Dashboard: React.FC = () => {
  const [total, setTotal] = useState(1024560);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [highlights, setHighlights] = useState<Highlight[]>([
    { icon: <Zap size={14} />, label: 'MAIS SOLICITADO', value: 'Limpeza Urbana', type: 'demand' },
    { icon: <Star size={14} />, label: 'MELHOR AVALIADO', value: 'Iluminação Pública (4.9)', type: 'rating' },
    { icon: <ArrowUpRight size={14} />, label: 'TENDÊNCIA', value: '+12% em Poda de Árvore', type: 'trend' },
    { icon: <Bell size={14} />, label: 'ALERTA EM TEMPO REAL', value: 'Novo vazamento em Tambaú', type: 'alert' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prev => prev + Math.floor(Math.random() * 15));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
      
      if (Math.random() > 0.4) {
        setHighlights(prev => {
          const next = [...prev];
          const updateIdx = Math.floor(Math.random() * prev.length);
          if (next[updateIdx].type === 'alert') {
            const locations = ['Centro', 'Bessa', 'Manaíra', 'Mangabeira', 'Cabo Branco', 'Torre'];
            const alerts = ['Novo chamado em', 'Manutenção necessária em', 'Poste reparado em', 'Semáforo ativo em'];
            next[updateIdx].value = `${alerts[Math.floor(Math.random() * alerts.length)]} ${locations[Math.floor(Math.random() * locations.length)]}`;
          }
          return next;
        });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="min-h-screen pb-20 flex flex-col bg-[#f8fafc]">
      <header className="blue-gradient-bg text-white px-4 md:px-12 pt-8 md:pt-12 pb-24 md:pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <nav className="flex items-center justify-between mb-12 relative z-10 max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
              <LayoutGrid size={24} />
            </div>
            <h1 className="font-black text-xl md:text-2xl tracking-tighter">Cidade<span className="text-blue-300 font-light">Conectada</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-300 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SISTEMA ONLINE
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
              <User size={20} />
            </div>
          </div>
        </nav>

        <div className="max-w-[1600px] mx-auto relative z-10 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16">
            <div className="flex-1">
              <p className="text-blue-300 uppercase tracking-[0.3em] text-[10px] md:text-xs font-black mb-2 flex items-center gap-2">
                <Activity size={14} /> FLUXO DE SOLICITAÇÕES
              </p>
              <h2 className="text-6xl sm:text-8xl md:text-9xl xl:text-[11rem] font-black tracking-tighter leading-[0.8] mb-8">
                <AnimatedCounter target={total} />
              </h2>
              
              <div className="relative h-16 w-full max-w-lg">
                {highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 transition-all duration-1000 ease-in-out
                      ${idx === highlightIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}
                  >
                    <div className="p-2 bg-blue-500/30 rounded-lg text-blue-200">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-0.5">{item.label}</span>
                      <span className="font-bold text-white text-sm md:text-lg truncate">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-80 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
               <h4 className="font-black text-white text-lg mb-6">Eficiência Global</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                     <span className="text-[11px] font-black text-blue-300 uppercase">Satisfação</span>
                     <span className="text-2xl font-black">4.8</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                     <span className="text-[11px] font-black text-blue-300 uppercase">Resolução</span>
                     <span className="text-2xl font-black">92%</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <MetricCard label="TOTAL ACUMULADO" value={total} icon={<FileText />} color="blue" />
            <MetricCard label="PENDÊNCIAS HOJE" value={Math.floor(total * 0.05)} icon={<Clock />} color="orange" />
            <MetricCard label="FINALIZADOS (24H)" value={2450} icon={<CheckCircle />} color="emerald" />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto w-full -mt-12 md:-mt-24 px-4 md:px-12 flex flex-col xl:flex-row gap-8 relative z-20">
        <section className="flex-1 bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <h3 className="font-black text-gray-900 text-2xl tracking-tighter">Carga por Secretaria</h3>
            <div className="flex gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-full" /> OPERACIONAL</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-500 rounded-full" /> FISCALIZAÇÃO</div>
            </div>
          </div>

          <div className="space-y-10">
            {METRICS_DATA.map((metric) => (
              <div key={metric.label} className="group">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-black text-lg md:text-xl text-gray-800 group-hover:text-blue-600 transition-colors">{metric.label}</span>
                  <span className="text-xs font-black text-gray-300 uppercase tracking-widest">{metric.totalPercentage}% CARGA</span>
                </div>
                <div className="w-full h-4 bg-gray-50 rounded-full overflow-hidden flex ring-4 ring-gray-50 shadow-inner">
                  <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${metric.operational}%` }} />
                  <div className="bg-indigo-500 h-full transition-all duration-1000 delay-100" style={{ width: `${metric.fiscalization}%` }} />
                  <div className="bg-gray-200 h-full" style={{ width: `${metric.administrative}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="xl:w-[450px] space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100">
            <h3 className="font-black text-gray-900 text-xl mb-10 tracking-tight">Ranking de Eficiência</h3>
            <div className="space-y-6">
              {EFFICIENCY_DATA.map((dept) => (
                <div key={dept.id} className="p-6 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black group-hover:bg-blue-600 transition-colors">
                      {dept.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-gray-800 text-lg truncate">{dept.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{dept.subName}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-black text-emerald-500">{dept.efficiency}%</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${dept.color} transition-all duration-[2s]`} style={{ width: `${dept.efficiency}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 hover:translate-y-[-4px] transition-all group">
      <div className="flex justify-between items-start mb-8">
        <p className="text-blue-600 font-black text-[10px] tracking-widest uppercase">{label}</p>
        <div className={`p-3 bg-gray-50 rounded-xl group-hover:bg-${color}-50 transition-colors`}>
          {/* Use React.isValidElement and cast to React.ReactElement<any> to fix cloneElement typing error */}
          {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: `text-${color}-500 size-6` })}
        </div>
      </div>
      <p className="text-5xl font-black tracking-tighter text-gray-900 leading-none">
        <AnimatedCounter target={value} />
      </p>
    </div>
  );
};

export default Dashboard;