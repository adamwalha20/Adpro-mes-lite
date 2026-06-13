import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const [stats, setStats] = useState({
    todayProd: 0,
    monthProd: 0,
    waste: 0,
    efficiency: 0,
    activeMachines: 0,
    stoppedMachines: 0,
  });

  const chartData = [
    { time: '08:00', value: 6000, target: 15000 },
    { time: '10:00', value: 9000, target: 15000 },
    { time: '12:00', value: 12000, target: 15000 },
    { time: '14:00', value: 14200, target: 15000 },
    { time: '16:00', value: 4500, target: 15000 },
  ];

  return (
    <div className="max-w-[1440px] mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap mb-card-gap">
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant card-shadow hover:border-primary transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary-container/10 rounded-lg text-primary">
              <span className="material-symbols-outlined icon-fill">inventory_2</span>
            </div>
            <span className="flex items-center text-secondary font-label-md text-label-md gap-1 bg-secondary-container/20 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">trending_up</span> +5.2%
            </span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Production du Jour</p>
          <h3 className="font-stat-display text-stat-display text-on-background group-hover:text-primary transition-colors">
            {stats.todayProd} <span className="text-2xl text-on-surface-variant font-normal">unités</span>
          </h3>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant card-shadow hover:border-primary transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-tint/10 rounded-lg text-surface-tint">
              <span className="material-symbols-outlined icon-fill">date_range</span>
            </div>
            <span className="flex items-center text-secondary font-label-md text-label-md gap-1 bg-secondary-container/20 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">trending_up</span> +1.8%
            </span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Production du Mois</p>
          <h3 className="font-stat-display text-stat-display text-on-background group-hover:text-surface-tint transition-colors">
            {stats.monthProd}k <span className="text-2xl text-on-surface-variant font-normal">unités</span>
          </h3>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant card-shadow hover:border-primary transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-error-container rounded-lg text-error">
              <span className="material-symbols-outlined icon-fill">delete_sweep</span>
            </div>
            <span className="flex items-center text-error font-label-md text-label-md gap-1 bg-error-container/50 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">trending_up</span> +0.4%
            </span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Quantité Déchets</p>
          <h3 className="font-stat-display text-stat-display text-on-background group-hover:text-error transition-colors">
            {stats.waste} <span className="text-2xl text-on-surface-variant font-normal">kg</span>
          </h3>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant card-shadow hover:border-primary transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container/30 rounded-lg text-secondary">
              <span className="material-symbols-outlined icon-fill">speed</span>
            </div>
            <span className="flex items-center text-secondary font-label-md text-label-md gap-1 bg-secondary-container/20 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">trending_up</span> +2.1%
            </span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Taux de Rendement (TRS)</p>
          <h3 className="font-stat-display text-stat-display text-on-background group-hover:text-secondary transition-colors">
            {stats.efficiency.toFixed(1)} <span className="text-2xl text-on-surface-variant font-normal">%</span>
          </h3>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant card-shadow hover:border-primary transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container/30 rounded-lg text-secondary">
              <span className="material-symbols-outlined icon-fill">precision_manufacturing</span>
            </div>
            <span className="text-on-surface-variant font-label-md text-label-md">Sur 12 au total</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Machines Actives</p>
          <h3 className="font-stat-display text-stat-display text-on-background group-hover:text-secondary transition-colors">
            {stats.activeMachines}
          </h3>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant card-shadow hover:border-primary transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed">
              <span className="material-symbols-outlined icon-fill">warning</span>
            </div>
            <span className="flex items-center text-error font-label-md text-label-md gap-1 bg-error-container/50 px-2 py-1 rounded-full">
              Maint. Prévue
            </span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Machines Arrêtées</p>
          <h3 className="font-stat-display text-stat-display text-on-background group-hover:text-tertiary transition-colors">
            {stats.stoppedMachines}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow flex flex-col">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-background">Production Quotidienne</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Volume par heure vs Objectif</p>
            </div>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center min-h-[300px] h-[300px] relative overflow-hidden group">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#002869" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#002869" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c4c6d3" opacity={0.5} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#434652', fontSize: 12}} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#002869" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute top-1/4 left-0 w-full border-t-2 border-dashed border-error opacity-50 px-8 pointer-events-none"></div>
            <span className="absolute top-1/4 left-10 -mt-6 font-label-md text-label-md text-error pointer-events-none">Objectif (15k)</span>
          </div>
        </div>

        <div className="flex flex-col gap-card-gap">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow p-6 flex-1">
            <h3 className="font-headline-md text-headline-md text-on-background mb-4">Temps d'arrêt par motif</h3>
            <div className="relative w-48 h-48 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-[16px] border-surface-variant"></div>
              <div className="absolute inset-0 rounded-full border-[16px] border-tertiary-fixed border-t-transparent border-l-transparent transform rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-[16px] border-error border-b-transparent border-r-transparent transform -rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="font-stat-display text-3xl text-on-background">4.2h</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Total</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant">Panne Mécanique</span>
                </div>
                <span className="font-label-md text-label-md text-on-background">2.1h</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tertiary-fixed"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant">Manque Matière</span>
                </div>
                <span className="font-label-md text-label-md text-on-background">1.5h</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                  <span className="font-body-md text-body-md text-on-surface-variant">Changement Format</span>
                </div>
                <span className="font-label-md text-label-md text-on-background">0.6h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-background">Activités Récentes</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Suivi en temps réel des opérations</p>
            </div>
            <button className="font-label-md text-label-md text-primary hover:bg-surface-container-high px-4 py-2 rounded-lg transition-colors border border-outline-variant bg-surface-container-lowest">
              Voir tout l'historique
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface">
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Heure</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Machine</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Produit</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Opérateur</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-md text-body-md">
                <tr className="hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                  <td className="p-4 text-on-surface-variant group-hover:text-on-background">10:45</td>
                  <td className="p-4 font-medium text-on-background">Ligne Assemblage B</td>
                  <td className="p-4 text-on-surface-variant">Pièce Moteur XZ-4</td>
                  <td className="p-4 text-on-surface-variant flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-[10px]">JD</div>
                    Jean D.
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-secondary-container/20 text-secondary px-2 py-1 rounded-full font-label-md text-xs">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> En cours
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                  <td className="p-4 text-on-surface-variant group-hover:text-on-background">10:30</td>
                  <td className="p-4 font-medium text-on-background">Presse Injection 1</td>
                  <td className="p-4 text-on-surface-variant">Boîtier Plastique</td>
                  <td className="p-4 text-on-surface-variant flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-label-md text-[10px]">ML</div>
                    Marie L.
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-error-container/50 text-error px-2 py-1 rounded-full font-label-md text-xs">
                      <span className="w-2 h-2 rounded-full bg-error"></span> Arrêt (Maint.)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
