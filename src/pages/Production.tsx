import React, { useEffect, useState } from 'react';
import { useProductionStore } from '../store/production';
import { format } from 'date-fns';

export function Production() {
  const { sessions, machines, products, operators, loading, fetchInitialData, startSession, updateSessionStatus } = useProductionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSessionData, setNewSessionData] = useState({
    machine_id: '',
    product_id: '',
    operator_id: '',
    lot_number: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionData.machine_id || !newSessionData.product_id || !newSessionData.operator_id) return;
    
    await startSession(newSessionData);
    setIsModalOpen(false);
    setNewSessionData({ machine_id: '', product_id: '', operator_id: '', lot_number: '' });
  };

  const getMachineName = (id: string | null) => machines.find(m => m.id === id)?.name || 'Inconnu';
  const getProductName = (id: string | null) => products.find(p => p.id === id)?.name || 'Inconnu';
  const getOperatorName = (id: string | null) => operators.find(o => o.id === id)?.name || 'Inconnu';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-display-md text-on-background">Production</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Gestion et suivi des ordres de fabrication</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary hover:bg-primary/90 px-6 py-3 rounded-full font-label-lg font-bold transition-colors card-shadow flex items-center gap-2"
        >
          <span className="material-symbols-outlined icon-fill">add</span>
          Nouvel Ordre
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
          <h3 className="font-headline-md text-headline-md text-on-background">Ordres en cours</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface">
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Lot</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Machine</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Produit</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Opérateur</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Début</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">Statut</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-body-md text-body-md">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-on-surface-variant">Chargement...</td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-on-surface-variant">Aucun ordre de fabrication en cours.</td>
                </tr>
              ) : sessions.map(session => (
                <tr key={session.id} className="hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                  <td className="p-4 font-medium text-on-background">{session.lot_number || '-'}</td>
                  <td className="p-4 text-on-background">{getMachineName(session.machine_id)}</td>
                  <td className="p-4 text-on-surface-variant">{getProductName(session.product_id)}</td>
                  <td className="p-4 text-on-surface-variant">{getOperatorName(session.operator_id)}</td>
                  <td className="p-4 text-on-surface-variant">
                    {session.start_time ? format(new Date(session.start_time), 'HH:mm dd/MM') : '-'}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-label-md text-xs ${
                      session.status === 'En cours' 
                        ? 'bg-secondary-container/20 text-secondary' 
                        : session.status === 'Terminé' 
                        ? 'bg-primary-container/20 text-primary'
                        : 'bg-surface-variant/20 text-on-surface-variant'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        session.status === 'En cours' ? 'bg-secondary' : session.status === 'Terminé' ? 'bg-primary' : 'bg-on-surface-variant'
                      }`}></span> 
                      {session.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {session.status === 'En cours' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateSessionStatus(session.id, 'Terminé', new Date().toISOString()); }}
                        className="text-primary hover:bg-primary-container px-3 py-1 rounded-lg transition-colors font-label-md text-sm cursor-pointer"
                      >
                        Terminer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-lg card-shadow">
            <h2 className="font-headline-sm text-headline-sm mb-6 text-on-background">Nouvel Ordre de Fabrication</h2>
            <form onSubmit={handleStartSession} className="space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Machine</label>
                <select 
                  required
                  value={newSessionData.machine_id}
                  onChange={e => setNewSessionData({...newSessionData, machine_id: e.target.value})}
                  className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background"
                >
                  <option value="">Sélectionner une machine</option>
                  {machines.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Produit</label>
                <select 
                  required
                  value={newSessionData.product_id}
                  onChange={e => setNewSessionData({...newSessionData, product_id: e.target.value})}
                  className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background"
                >
                  <option value="">Sélectionner un produit</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.reference})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Opérateur</label>
                <select 
                  required
                  value={newSessionData.operator_id}
                  onChange={e => setNewSessionData({...newSessionData, operator_id: e.target.value})}
                  className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background"
                >
                  <option value="">Sélectionner un opérateur</option>
                  {operators.map(o => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Numéro de Lot</label>
                <input 
                  type="text"
                  required
                  value={newSessionData.lot_number}
                  onChange={e => setNewSessionData({...newSessionData, lot_number: e.target.value})}
                  className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background"
                  placeholder="EX: LOT-2023-XYZ"
                />
              </div>

              <div className="flex gap-3 justify-end mt-8">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-full font-label-md font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 rounded-full font-label-md font-bold bg-primary text-on-primary hover:bg-primary/90 transition-colors"
                >
                  Démarrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
