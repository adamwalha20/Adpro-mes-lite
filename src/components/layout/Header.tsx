import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-72 h-16 flex justify-between items-center px-6 z-50 bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex items-center gap-8">
        <button aria-label="Open menu" className="md:hidden p-2 text-on-surface-variant">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden md:flex gap-6 h-full items-center">
          <a className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary h-16 flex items-center opacity-80" href="#">Aujourd'hui</a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors h-16 flex items-center" href="#">Équipe A</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48 focus:w-64 transition-all" placeholder="Rechercher..." type="text"/>
        </div>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative min-w-[48px] min-h-[48px] flex items-center justify-center">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center">
          <span className="material-symbols-outlined">schedule</span>
        </button>
        <div className="h-8 w-px bg-outline-variant mx-2"></div>
        <button className="font-label-md text-label-md text-primary hover:bg-surface-container-low px-4 py-2 h-[48px] rounded-lg transition-colors flex items-center justify-center gap-2">
          Déconnexion
          <span className="material-symbols-outlined text-[18px]">logout</span>
        </button>
      </div>
    </header>
  );
}
