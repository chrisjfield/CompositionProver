import { useState } from 'react';
import { AppFrameProps } from '../../types/props';
import CloseIcon from '../icons/CloseIcon';
import MenuIcon from '../icons/MenuIcon';
import SidenavItems from '../navigation/SidenavItems';

const AppFrame = (
  { children }: AppFrameProps,
) => {
  const [navOpen, setNavOpen] = useState(false);

  const openNav = () => {
    setNavOpen(true);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const sidebarClasses = `flex flex-col fixed lg:relative inset-0 z-10 w-full lg:w-auto lg:max-w-xs min-h-screen px-4 bg-brand-primary text-center lg:text-left transform transition-all lg:translate-x-0 lg:visible ${navOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'}`;

  return (
    <main className="flex w-full min-h-screen">
      {/* Side navigation */}
      <div className={sidebarClasses}>
        <div className="flex flex-col justify-between h-full overflow-y-auto">
          <nav className="flex flex-col">
            <button onClick={closeNav} type="button" className="absolute top-0 left-0 flex mt-3 ml-3 lg:hidden">
              <CloseIcon className="w-8 h-8 text-gray-200 fill-current" />
            </button>
            <h1 className="px-2 py-4 text-2xl text-gray-200 whitespace-nowrap">
              Composition Prover
            </h1>
            <SidenavItems closeNav={closeNav} />
          </nav>
          <a href="https://github.com/chrisjfield/CompositionProver" className="py-4 text-xs text-gray-200 underline">
            View source code on GitHub
          </a>
        </div>
      </div>
      {/* Main content */}
      <div className="w-full">
        {/* Mobile header */}
        <header className="flex px-3 py-2 bg-blue-700 shadow-lg lg:hidden">
          <button onClick={openNav} type="button">
            <MenuIcon className="w-8 h-8 text-gray-200 fill-current" />
          </button>
        </header>
        <div className="p-4 pt-6 lg:pt-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AppFrame;
