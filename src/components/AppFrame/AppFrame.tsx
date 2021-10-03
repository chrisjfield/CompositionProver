import { cloneElement } from 'react';
import { NavItem } from '../../types/navigation';
import { AppFrameProps } from '../../types/props';
import BarChartIcon from '../icons/BarChartIcon';
import BellIcon from '../icons/BellIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';
import HelpIcon from '../icons/HelpIcon';
import HomeIcon from '../icons/HomeIcon';
import MusicalNoteIcon from '../icons/MusicalNoteIcon';

const AppFrame = (
  { children }: AppFrameProps,
) => {
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
      <div className="flex flex-col justify-between max-w-xs px-4 bg-blue-700">
        <nav className="flex flex-col">
          <h1 className="py-4 text-white text-2xl whitespace-nowrap px-2">Composition Prover</h1>
          {navItems.map((navItem) => (
            <a href={navItem.url} key={navItem.url} className="flex items-center rounded-lg text-gray-200 mx-2 my-1 pr-6 p-3 hover:bg-blue-900 hover:text-white">
              {navItem.icon && cloneElement(navItem.icon, { className: 'w-6 h-6 mr-3 fill-current' }) }
              <p className=" text-base">{navItem.name}</p>
            </a>
          ))}
        </nav>
        <span className="text-xs text-gray-200 pb-4">Some content at the bottom of the sidebar</span>
      </div>
      {/* Main content */}
      <div className="flex w-full flex-col p-4 pt-12">
        {children}
      </div>
    </main>
  );
};

export default AppFrame;
