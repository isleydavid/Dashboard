
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
  Activity,
  Maximize2,
  Minimize2
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ServiceMetric, DeptEfficiency } from '../types';

const METRICS_DATA: ServiceMetric[] = [
  { label: 'Limpeza Urbana', days: 2.5, totalPercentage: 75, operational: 45, fiscalization: 35, administrative: 20 },
  { label: 'Iluminação Pública', days: 1.8, totalPercentage: 60, operational: 50, fiscalization: 30, administrative: 20 },
  { label: 'Poda de Árvores', days: 4.2, totalPercentage: 45, operational: 40, fiscalization: 40, administrative: 20 },
  { label: 'Drenagem Pluvial', days: 3.0, totalPercentage: 30, operational: 60, fiscalization: 30, administrative: 10 },
  { label: 'Manutenção Viária', days: 3.5, totalPercentage: 55, operational: 55, fiscalization: 25, administrative: 20 },
  { label: 'Sinalização', days: 2.1, totalPercentage: 40, operational: 40, fiscalization: 40, administrative: 20 },
];

const EFFICIENCY_DATA: DeptEfficiency[] = [
  { id: 1, code: 'EM', name: 'EMLUR', subName: 'LIMPEZA & COLETA', efficiency: 95, solicitations: '12.5k', color: 'bg-emerald-500' },
  { id: 2, code: 'SE', name: 'SEURB', subName: 'URBANISMO', efficiency: 88, solicitations: '10.2k', color: 'bg-blue-500' },
  { id: 3, code: 'SS', name: 'SESAU', subName: 'SAÚDE', efficiency: 81, solicitations: '8.4k', color: 'bg-emerald-400' },
  { id: 4, code: 'SM', name: 'SEMOB', subName: 'MOBILIDADE', efficiency: 72, solicitations: '8.1k', color: 'bg-orange-500' },
  { id: 5, code: 'SE', name: 'SEDUC', subName: 'EDUCAÇÃO', efficiency: 68, solicitations: '6.2k', color: 'bg-indigo-500' },
  { id: 6, code: 'SF', name: 'SEFIN', subName: 'FINANÇAS', efficiency: 65, solicitations: '4.1k', color: 'bg-slate-500' },
  { id: 7, code: 'SG', name: 'SEGOV', subName: 'GOVERNO', efficiency: 60, solicitations: '2.5k', color: 'bg-blue-400' },
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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [highlights] = useState<Highlight[]>([
    { icon: <Zap size={14} />, label: 'MAIS SOLICITADO', value: 'Limpeza Urbana', type: 'demand' },
    { icon: <Star size={14} />, label: 'MELHOR AVALIADO', value: 'Iluminação Pública (4.9)', type: 'rating' },
    { icon: <ArrowUpRight size={14} />, label: 'TENDÊNCIA', value: '+12% em Poda de Árvore', type: 'trend' },
    { icon: <Bell size={14} />, label: 'ALERTA EM TEMPO REAL', value: 'Novo vazamento em Tambaú', type: 'alert' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prev => prev + Math.floor(Math.random() * 20));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className={`transition-all duration-500 flex flex-col bg-[#f8fafc] ${isFullScreen ? 'h-screen overflow-hidden p-2 md:p-4 2xl:p-6' : 'min-h-screen pb-20'}`}>
      
      {/* HEADER */}
      <header className={`blue-gradient-bg text-white relative overflow-hidden transition-all duration-700 rounded-b-[2rem] md:rounded-b-[4rem] flex-none
        ${isFullScreen ? 'rounded-[1.5rem] md:rounded-[2.5rem] px-6 md:px-10 pt-4 md:pt-6 pb-6 md:pb-8' : 'px-6 md:px-12 2xl:px-24 pt-8 md:pt-12 2xl:pt-20 pb-24 md:pb-48 2xl:pb-64'}`}>
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] 2xl:w-[800px] 2xl:h-[800px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <nav className={`flex items-center justify-between relative z-10 max-w-[2000px] mx-auto w-full transition-all ${isFullScreen ? 'mb-4' : 'mb-8 md:mb-12 2xl:mb-16'}`}>
          <div className="flex items-center gap-3 md:gap-5">
            <div className={`bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-xl transition-all ${isFullScreen ? 'p-2' : 'p-2 md:p-4'}`}>
              <LayoutGrid className={`${isFullScreen ? 'size-4 md:size-6' : 'size-5 md:size-8 2xl:size-10'}`} />
            </div>
            <div>
              <h1 className={`font-black tracking-tighter leading-none transition-all ${isFullScreen ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl 2xl:text-5xl'}`}>Cidade<span className="text-blue-300 font-light">Conectada</span></h1>
              <p className={`font-bold text-blue-200/60 uppercase tracking-[0.2em] mt-0.5 transition-all ${isFullScreen ? 'text-[7px] md:text-[9px]' : 'text-[8px] md:text-xs 2xl:text-base'}`}>Gestão Inteligente v4.0</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={toggleFullScreen}
              className={`bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all flex items-center gap-2 group ${isFullScreen ? 'p-2 md:p-3' : 'p-3 md:p-4'}`}
              title={isFullScreen ? "Sair da Tela Cheia" : "Modo Tela Cheia"}
            >
              {isFullScreen ? <Minimize2 size={16} className="md:size-5" /> : <Maximize2 size={20} className="2xl:size-8" />}
              <span className="hidden md:inline font-bold text-[10px] md:text-xs 2xl:text-lg">{isFullScreen ? 'REDUZIR' : 'MODO PAINEL'}</span>
            </button>
            <div className={`rounded-xl bg-white/10 flex items-center justify-center border border-white/10 transition-all ${isFullScreen ? 'w-8 h-8 md:w-10 md:h-10' : 'w-10 h-10 md:w-14 md:h-14 2xl:w-20 2xl:h-20'}`}>
              <User className={`${isFullScreen ? 'size-4 md:size-5' : 'size-5 md:size-8 2xl:size-12'}`} />
            </div>
          </div>
        </nav>

        <div className="max-w-[2000px] mx-auto relative z-10 w-full">
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 2xl:gap-24 transition-all ${isFullScreen ? 'mb-4' : 'mb-16'}`}>
            <div className="flex-1">
              <p className={`text-blue-300 uppercase tracking-[0.4em] font-black flex items-center gap-2 transition-all ${isFullScreen ? 'text-[7px] md:text-[9px] mb-1' : 'text-[8px] md:text-xs 2xl:text-xl mb-4'}`}>
                <Activity className={`animate-pulse ${isFullScreen ? 'size-3' : 'size-4 2xl:size-8'}`} /> MONITORAMENTO LIVE
              </p>
              <h2 className={`font-black tracking-tighter leading-[0.75] transition-all drop-shadow-2xl 
                ${isFullScreen ? 'text-4xl md:text-7xl 2xl:text-[9rem] mb-4' : 'text-7xl md:text-[10rem] 2xl:text-[15rem] mb-12'}`}>
                <AnimatedCounter target={total} />
              </h2>
              
              <div className={`relative w-full max-w-xl 2xl:max-w-4xl transition-all ${isFullScreen ? 'h-10 md:h-14' : 'h-20 md:h-24 2xl:h-32'}`}>
                {highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 flex items-center gap-3 md:gap-4 bg-white/10 backdrop-blur-2xl px-4 md:px-6 py-2 rounded-2xl border border-white/20 shadow-2xl transition-all duration-1000 ease-in-out
                      ${idx === highlightIndex ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}
                  >
                    <div className={`bg-blue-500/30 rounded-lg text-blue-100 transition-all ${isFullScreen ? 'p-1.5' : 'p-3'}`}>
                      {React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<any>, { className: isFullScreen ? 'size-4' : 'size-6 md:size-8 2xl:size-12' })}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`font-black text-blue-300 uppercase tracking-widest transition-all ${isFullScreen ? 'text-[6px] md:text-[8px]' : 'text-[8px] md:text-xs 2xl:text-lg'}`}>{item.label}</span>
                      <span className={`font-black text-white tracking-tight truncate transition-all ${isFullScreen ? 'text-xs md:text-lg' : 'text-base md:text-2xl 2xl:text-4xl'}`}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAINEL LATERAL HEADER */}
            <div className={`hidden lg:block bg-white/5 p-5 2xl:p-14 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl transition-all
              ${isFullScreen ? 'w-64 2xl:w-[400px]' : 'w-96 2xl:w-[500px]'}`}>
               <div className={`flex items-center gap-3 mb-4 transition-all ${isFullScreen ? 'mb-3' : 'mb-10'}`}>
                  <TrendingUp className={`text-blue-300 transition-all ${isFullScreen ? 'size-5' : 'size-8 2xl:size-14'}`} />
                  <h4 className={`font-black text-white transition-all ${isFullScreen ? 'text-sm 2xl:text-2xl' : 'text-xl 2xl:text-4xl'}`}>Eficiência</h4>
               </div>
               <div className={`space-y-3 transition-all ${isFullScreen ? 'space-y-2' : 'space-y-6 2xl:space-y-10'}`}>
                  <div className={`flex justify-between items-center bg-white/5 rounded-2xl border border-white/5 transition-all ${isFullScreen ? 'p-3' : 'p-6 2xl:p-8'}`}>
                     <span className={`font-black text-blue-300 uppercase tracking-widest transition-all ${isFullScreen ? 'text-[8px]' : 'text-[11px] 2xl:text-lg'}`}>Satisfação</span>
                     <div className="flex items-center gap-2">
                        <span className={`font-black transition-all ${isFullScreen ? 'text-lg 2xl:text-3xl' : 'text-3xl 2xl:text-6xl'}`}>4.8</span>
                        <Star className={`text-yellow-400 fill-current transition-all ${isFullScreen ? 'size-3' : 'size-5 2xl:size-8'}`} />
                     </div>
                  </div>
                  <div className={`flex justify-between items-center bg-white/5 rounded-2xl border border-white/5 transition-all ${isFullScreen ? 'p-3' : 'p-6 2xl:p-8'}`}>
                     <span className={`font-black text-blue-300 uppercase tracking-widest transition-all ${isFullScreen ? 'text-[8px]' : 'text-[11px] 2xl:text-lg'}`}>Resolução</span>
                     <span className={`font-black text-emerald-400 transition-all ${isFullScreen ? 'text-lg 2xl:text-3xl' : 'text-3xl 2xl:text-6xl'}`}>92%</span>
                  </div>
               </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 transition-all ${isFullScreen ? 'mt-2' : 'mt-8 2xl:gap-16'}`}>
            <MetricCard label="NOVAS SOLICITAÇÕES" value={total} icon={<FileText />} color="blue" compact={true} isFS={isFullScreen} />
            <MetricCard label="EM ATENDIMENTO" value={Math.floor(total * 0.05)} icon={<Clock />} color="orange" compact={true} isFS={isFullScreen} />
            <MetricCard label="CONCLUÍDAS" value={2450} icon={<CheckCircle />} color="emerald" compact={true} isFS={isFullScreen} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={`max-w-[2000px] mx-auto w-full transition-all duration-700 px-6 md:px-12 2xl:px-24 flex flex-col xl:flex-row gap-4 md:gap-6 relative z-20 
        ${isFullScreen ? 'flex-1 mt-4 mb-2 overflow-hidden' : '-mt-16 md:-mt-28 2xl:-mt-40'}`}>
        
        {/* CARD CARGA / SERVIÇOS */}
        <section className={`flex-1 bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all
          ${isFullScreen ? 'h-full p-6 md:p-8' : 'p-10 md:p-14 2xl:p-20'}`}>
          <div className={`flex justify-between items-center gap-4 transition-all ${isFullScreen ? 'mb-4' : 'mb-12'}`}>
            <h3 className={`font-black text-gray-900 tracking-tighter transition-all ${isFullScreen ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl 2xl:text-5xl'}`}>Serviços oferecidos e participação de setores</h3>
            <div className={`flex gap-3 font-black text-gray-400 uppercase tracking-widest bg-gray-50 rounded-xl border border-gray-100 transition-all ${isFullScreen ? 'p-2 text-[7px]' : 'p-4 md:p-6 text-[9px] md:text-xs 2xl:text-base'}`}>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-600 rounded-full" /> OPERACIONAL</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> FISCALIZAÇÃO</div>
            </div>
          </div>

          <div className={`transition-all pr-4 pl-1 custom-scrollbar overflow-y-auto ${isFullScreen ? 'flex-1 space-y-5' : 'space-y-12 2xl:space-y-16'}`}>
            {METRICS_DATA.map((metric) => (
              <div key={metric.label} className="group">
                <div className={`flex justify-between items-end transition-all ${isFullScreen ? 'mb-1.5' : 'mb-4'}`}>
                  <span className={`font-black text-gray-800 group-hover:text-blue-600 transition-all ${isFullScreen ? 'text-sm md:text-base' : 'text-xl md:text-2xl 2xl:text-4xl'}`}>{metric.label}</span>
                  <span className={`font-black text-gray-300 uppercase tracking-widest transition-all ${isFullScreen ? 'text-[8px]' : 'text-xs md:text-sm 2xl:text-xl'}`}>{metric.totalPercentage}% CARGA</span>
                </div>
                <div className={`w-full bg-gray-50 rounded-full overflow-hidden flex ring-offset-1 ring-gray-100 shadow-inner transition-all
                  ${isFullScreen ? 'h-5 md:h-6 ring-[4px]' : 'h-8 md:h-10 2xl:h-16 ring-[8px]'}`}>
                  <div 
                    className="bg-blue-600 h-full transition-all duration-1000 shadow-lg flex items-center justify-center relative group/bar" 
                    style={{ width: `${metric.operational}%` }}
                  >
                    <span className="text-[7px] md:text-[9px] 2xl:text-sm font-black text-white/90 drop-shadow-sm pointer-events-none">
                      {metric.operational}%
                    </span>
                  </div>
                  <div 
                    className="bg-indigo-500 h-full transition-all duration-1000 delay-100 flex items-center justify-center relative group/bar" 
                    style={{ width: `${metric.fiscalization}%` }}
                  >
                    <span className="text-[7px] md:text-[9px] 2xl:text-sm font-black text-white/90 drop-shadow-sm pointer-events-none">
                      {metric.fiscalization}%
                    </span>
                  </div>
                  <div className="bg-gray-100 h-full flex items-center justify-center" style={{ width: `${metric.administrative}%` }}>
                     <span className="text-[7px] md:text-[9px] 2xl:text-sm font-black text-gray-400">
                      {metric.administrative}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RANKING EFICIÊNCIA */}
        <aside className={`xl:w-[350px] 2xl:w-[550px] transition-all ${isFullScreen ? 'h-full flex flex-col shrink-0' : 'space-y-10'}`}>
          <div className={`bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 transition-all flex flex-col 
            ${isFullScreen ? 'flex-1 overflow-hidden p-6 md:p-8' : 'p-10 2xl:p-16'}`}>
            <h3 className={`font-black text-gray-900 tracking-tight transition-all ${isFullScreen ? 'text-lg md:text-xl mb-4' : 'text-2xl md:text-3xl 2xl:text-5xl mb-12'}`}>Ranking Eficiência</h3>
            {/* Scroll container com padding extra à esquerda para não cortar o número da posição */}
            <div className={`transition-all pl-3 pr-4 custom-scrollbar overflow-y-auto ${isFullScreen ? 'flex-1 space-y-4' : 'space-y-8 2xl:space-y-12'}`}>
              {EFFICIENCY_DATA.map((dept, index) => (
                <div key={dept.id} className={`bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all group border border-transparent hover:border-blue-50 relative ${isFullScreen ? 'p-3' : 'p-6 2xl:p-10'}`}>
                  {/* NUMERAÇÃO POSIÇÃO - Ajustado para garantir que não corte */}
                  <div className="absolute -top-1.5 -left-1.5 md:-top-2 md:-left-2 bg-gray-900 text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black shadow-lg z-10 ring-2 ring-white">
                    {index + 1}º
                  </div>
                  
                  <div className={`flex items-center gap-3 transition-all ${isFullScreen ? 'mb-2' : 'mb-6'}`}>
                    <div className={`rounded-xl bg-gray-900 text-white flex items-center justify-center font-black transition-all group-hover:bg-blue-600 ${isFullScreen ? 'w-8 h-8 text-[10px]' : 'w-12 h-12 2xl:w-20 2xl:h-20 text-xs 2xl:text-2xl'}`}>
                      {dept.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-black text-gray-800 truncate transition-all ${isFullScreen ? 'text-xs md:text-sm' : 'text-base md:text-xl 2xl:text-3xl'}`}>{dept.name}</h4>
                      <p className={`font-bold text-gray-400 tracking-widest uppercase transition-all ${isFullScreen ? 'text-[6px]' : 'text-[8px] md:text-[10px] 2xl:text-lg'}`}>{dept.solicitations}</p>
                    </div>
                    <div className="text-right">
                       <p className={`font-black text-emerald-500 transition-all ${isFullScreen ? 'text-sm md:text-lg' : 'text-xl md:text-3xl 2xl:text-5xl'}`}>{dept.efficiency}%</p>
                    </div>
                  </div>
                  <div className={`w-full bg-gray-200 rounded-full overflow-hidden shadow-inner transition-all ${isFullScreen ? 'h-1.5' : 'h-3 md:h-4 2xl:h-6'}`}>
                    <div className={`h-full ${dept.color} transition-all duration-[2s] rounded-full`} style={{ width: `${dept.efficiency}%` }} />
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

const MetricCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string; compact?: boolean; isFS?: boolean }> = ({ label, value, icon, color, compact, isFS }) => {
  return (
    <div className={`bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-gray-100 hover:translate-y-[-3px] transition-all group relative overflow-hidden
      ${isFS ? 'p-3 md:p-5' : compact ? 'p-6 md:p-10 2xl:p-16' : 'p-8 md:p-10 2xl:p-20'}`}>
      <div className={`flex justify-between items-start relative z-10 transition-all ${isFS ? 'mb-1.5' : compact ? 'mb-4 md:mb-8' : 'mb-8 md:mb-10'}`}>
        <p className={`text-blue-600 font-black tracking-widest uppercase transition-all ${isFS ? 'text-[7px]' : 'text-[9px] md:text-xs 2xl:text-xl'}`}>{label}</p>
        <div className={`bg-gray-50 rounded-xl group-hover:bg-${color}-50 transition-colors ${isFS ? 'p-2' : 'p-3 md:p-5 2xl:p-8'}`}>
          {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: `text-${color}-500 transition-all ${isFS ? 'size-3 md:size-4' : 'size-5 md:size-8 2xl:size-16'}` })}
        </div>
      </div>
      <p className={`font-black tracking-tighter text-gray-900 leading-none transition-all
        ${isFS ? 'text-2xl md:text-4xl' : compact ? 'text-4xl md:text-5xl 2xl:text-[7rem]' : 'text-5xl sm:text-6xl md:text-7xl 2xl:text-[9rem]'}`}>
        {/* Fix: use "value" prop instead of non-existent "total" */}
        <AnimatedCounter target={value} />
      </p>
      <div className={`absolute -right-10 -bottom-10 w-24 h-24 bg-${color}-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
    </div>
  );
};

export default Dashboard;
