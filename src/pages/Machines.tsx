export function Machines() {
  const machines = [
    { id: 1, name: 'Ligne Assemblage B', code: 'AS-B12', status: 'En production', eff: 92, lastMaint: '12 Oct 2023' },
    { id: 2, name: 'Presse Injection 1', code: 'PI-001', status: 'Arrêt (Maintenance)', eff: 0, lastMaint: 'Aujourd\'hui' },
    { id: 3, name: 'Robot Soudure Alpha', code: 'RS-A01', status: 'En production', eff: 98, lastMaint: '05 Sep 2023' },
    { id: 4, name: 'Ligne Emballage C', code: 'EMB-C03', status: 'En attente', eff: 85, lastMaint: '28 Aoû 2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-display-md text-on-background">Machines</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Gestion du parc machines et statuts</p>
        </div>
        <button className="bg-primary text-on-primary hover:bg-primary/90 px-6 py-3 rounded-full font-label-lg font-bold transition-colors card-shadow flex items-center gap-2">
          <span className="material-symbols-outlined icon-fill">add</span>
          Ajouter Machine
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-card-gap">
        {machines.map(m => (
          <div key={m.id} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant card-shadow hover:border-primary transition-colors cursor-pointer group flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-surface-container-low rounded-lg text-on-surface-variant">
                <span className="material-symbols-outlined icon-fill">precision_manufacturing</span>
              </div>
              <span className={`px-2 py-1 rounded-full font-label-md text-xs ${
                m.status.includes('production') ? 'bg-secondary-container/20 text-secondary' :
                m.status.includes('Arrêt') ? 'bg-error-container/50 text-error' :
                'bg-surface-variant/20 text-on-surface-variant'
              }`}>
                {m.status}
              </span>
            </div>
            
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-background group-hover:text-primary transition-colors">{m.name}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{m.code}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant mt-auto">
              <div>
                <p className="font-label-md text-xs text-on-surface-variant mb-1 uppercase tracking-wider">TRS</p>
                <p className="font-body-lg font-bold text-on-background">{m.eff}%</p>
              </div>
              <div>
                <p className="font-label-md text-xs text-on-surface-variant mb-1 uppercase tracking-wider">Dernière Maint.</p>
                <p className="font-body-sm text-on-background">{m.lastMaint}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
