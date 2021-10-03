import { cloneElement } from 'react';
import { NavItem } from '../../types/navigation';
import BarChartIcon from '../icons/BarChartIcon';
import BellIcon from '../icons/BellIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';
import HelpIcon from '../icons/HelpIcon';
import HomeIcon from '../icons/HomeIcon';
import MusicalNoteIcon from '../icons/MusicalNoteIcon';

const SidenavItems = () => {
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
    <>
      {navItems.map((navItem) => (
        <a href={navItem.url} key={navItem.url} className="flex items-center rounded-lg hover:bg-blue-900 text-gray-200 hover:text-white mx-2 my-1 p-3 pr-6">
          {navItem.icon && cloneElement(navItem.icon, { className: 'w-6 h-6 mr-3 fill-current' })}
          <p className=" text-base">
            {navItem.name}
          </p>
        </a>
      ))}
    </>
  );
};

export default SidenavItems;
