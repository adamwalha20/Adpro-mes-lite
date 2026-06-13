import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Tableau de Bord', path: '/', icon: 'dashboard' },
  { name: 'Production', path: '/production', icon: 'factory' },
  { name: 'Machines', path: '/machines', icon: 'precision_manufacturing' },
  { name: 'Arrêts Machines', path: '/arrets', icon: 'error' },
  { name: 'Contrôle Qualité', path: '/qualite', icon: 'biotech' },
  { name: 'Maintenance', path: '/maintenance', icon: 'build' },
  { name: 'Historique Production', path: '/historique', icon: 'history' },
  { name: 'Rapports', path: '/rapports', icon: 'assessment' },
  { name: 'Utilisateurs', path: '/utilisateurs', icon: 'group' },
  { name: 'Paramètres', path: '/parametres', icon: 'settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 h-screen flex flex-col z-40 overflow-y-auto bg-surface border-r border-outline-variant w-72 hidden md:flex">
      <div className="p-6 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center text-on-primary font-bold text-lg">
            A
          </div>
          <div>
            <h1 className="font-headline-md text-[20px] font-bold text-primary">ADPRO MES Lite</h1>
            <p className="text-xs text-on-surface-variant font-label-md">Manufacturing Excellence</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          if (isActive) {
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-bold scale-95 duration-100 transition-transform"
              >
                <span className="material-symbols-outlined icon-fill">{item.icon}</span>
                <span className="font-label-md text-label-md">{item.name}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:bg-surface-container-highest transition-colors rounded-lg font-label-md text-label-md group"
            >
              <span className="material-symbols-outlined text-outline group-hover:text-primary">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-outline-variant space-y-1 mt-auto">
        <Link to="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-lg font-label-md text-label-md">
          <span className="material-symbols-outlined text-outline">help</span>
          <span className="font-label-md text-label-md">Aide</span>
        </Link>
        <Link to="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-lg font-label-md text-label-md">
          <span className="material-symbols-outlined text-outline">description</span>
          <span className="font-label-md text-label-md">Documentation</span>
        </Link>
      </div>
    </nav>
  );
}
