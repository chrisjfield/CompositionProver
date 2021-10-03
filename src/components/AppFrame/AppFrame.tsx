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

  const sidebarClasses = `flex flex-col justify-between absolute md:relative top-0 left-0 w-full md:w-auto md:max-w-xs min-h-screen px-4 bg-blue-700 text-center md:text-left transform transition-all md:translate-x-0 md:visible ${navOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'}`;

  return (
    <main className="flex w-full min-h-screen">
      {/* Side navigation */}
      <div className={sidebarClasses}>
        <nav className="flex flex-col">
          <button onClick={closeNav} type="button" className="flex md:hidden absolute top-0 left-0 ml-3 mt-3">
            <CloseIcon className="text-gray-200 fill-current w-8 h-8" />
          </button>
          <h1 className="py-4 text-gray-200 text-2xl whitespace-nowrap px-2">
            Composition Prover
          </h1>
          <SidenavItems />
        </nav>
        <a href="https://github.com/chrisjfield/CompositionProver" className="text-xs text-gray-200 underline pb-4">
          View source code on GitHub
        </a>
      </div>
      {/* Main content */}
      <div className="flex w-full flex-col">
        {/* Mobile header */}
        <header className="flex md:hidden bg-blue-700 shadow-lg py-2 px-3">
          <button onClick={openNav} type="button">
            <MenuIcon className="text-gray-200 fill-current w-8 h-8" />
          </button>
        </header>
        <div className="p-4 pt-6 md:pt-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AppFrame;
