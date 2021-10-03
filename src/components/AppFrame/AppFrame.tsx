import { cloneElement, useState } from 'react';
import { NavItem } from '../../types/navigation';
import { AppFrameProps } from '../../types/props';
import BarChartIcon from '../icons/BarChartIcon';
import BellIcon from '../icons/BellIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';
import CloseIcon from '../icons/CloseIcon';
import HelpIcon from '../icons/HelpIcon';
import HomeIcon from '../icons/HomeIcon';
import MenuIcon from '../icons/MenuIcon';
import MusicalNoteIcon from '../icons/MusicalNoteIcon';

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

  const navItems: NavItem[] = [
    {
      name: 'Home',
      url: '/',
      icon: <HomeIcon />,
    },
    {
      name: 'Composition',
      url: '/composition',
      icon: <MusicalNoteIcon />,
    },
    {
      name: 'Methods',
      url: '/methods',
      icon: <BellIcon />,
    },
    {
      name: 'Calls',
      url: '/calls',
      icon: <ChatBubbleIcon />,
    },
    {
      name: 'Results',
      url: '/results',
      icon: <BarChartIcon />,
    },
    {
      name: 'Help',
      url: '/help',
      icon: <HelpIcon />,
    },
  ];

  return (
    <main className="flex w-full min-h-screen">
      {/* Side navigation */}
      <div className={`flex flex-col justify-between w-full min-h-screen px-4 bg-blue-700 absolute top-0 left-0 text-center transform transition-all ${navOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'} md:w-auto md:max-w-xs md:translate-x-0 md:visible md:relative md:text-left`}>
        <nav className="flex flex-col">
          <button type="button" onClick={() => closeNav()} className="flex md:hidden absolute top-0 left-0 ml-3 mt-3">
            <CloseIcon className="text-gray-200 fill-current w-8 h-8" />
          </button>
          <h1 className="py-4 text-white text-2xl whitespace-nowrap px-2">Composition Prover</h1>
          {navItems.map((navItem) => (
            <a href={navItem.url} key={navItem.url} className="flex items-center rounded-lg text-gray-200 mx-2 my-1 pr-6 p-3 hover:bg-blue-900 hover:text-white">
              {navItem.icon && cloneElement(navItem.icon, { className: 'w-6 h-6 mr-3 fill-current' }) }
              <p className=" text-base">{navItem.name}</p>
            </a>
          ))}
        </nav>
        <a href="https://github.com/chrisjfield/CompositionProver" className="text-xs text-gray-200 underline pb-4">View source code on GitHub</a>
      </div>
      {/* Main content */}
      <div className="flex w-full flex-col">
        {/* Mobile header */}
        <header className="flex md:hidden bg-blue-700 shadow-lg py-2 px-3">
          <button type="button" onClick={() => openNav()}>
            <MenuIcon className="text-gray-200 fill-current 2-8 h-8" />
          </button>
        </header>
        <div className="p-4 pt-12">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AppFrame;
