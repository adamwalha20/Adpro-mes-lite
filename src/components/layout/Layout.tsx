import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md min-h-screen flex">
      <Sidebar />
      <div className="flex-1 md:ml-72 flex flex-col h-screen overflow-hidden w-full transition-all duration-300">
        <Header />
        <main className="flex-1 mt-16 p-6 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
