import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '../../types/navigation';
import BarChartIcon from '../icons/BarChartIcon';
import BellIcon from '../icons/BellIcon';
import CaretIcon from '../icons/CaretIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';
import HelpIcon from '../icons/HelpIcon';
import HomeIcon from '../icons/HomeIcon';
import ImportExportIcon from '../icons/ImportExportIcon';
import MusicalNoteIcon from '../icons/MusicalNoteIcon';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';
import ResetButton from './ResetButton';

interface SidenavItemsProps {
  closeNav: () => void;
}

const SidenavItems = ({ closeNav }: SidenavItemsProps) => {
  const [importMenuOpen, setImportMenuOpen] = useState(false);

  const location = useLocation();

  const isNavItemActive = (navItem: NavItem) => navItem.url === location.pathname;

  const toggleImportMenu = () => {
    setImportMenuOpen(!importMenuOpen);
  };

  const navItems: NavItem[] = [
    {
      name: 'Home',
      url: '/',
      icon: <HomeIcon className="w-6 h-6 fill-current" />,
    },
    {
      name: 'Composition',
      url: '/composition',
      icon: <MusicalNoteIcon className="w-6 h-6 fill-current" />,
    },
    {
      name: 'Methods',
      url: '/methods',
      icon: <BellIcon className="w-6 h-6 fill-current" />,
    },
    {
      name: 'Calls',
      url: '/calls',
      icon: <ChatBubbleIcon className="w-6 h-6 fill-current" />,
    },
    {
      name: 'Results',
      url: '/results',
      icon: <BarChartIcon className="w-6 h-6 fill-current" />,
    },
    {
      name: 'Help',
      url: '/help',
      icon: <HelpIcon className="w-6 h-6 fill-current" />,
    },
  ];

  return (
    <>
      {/* Navigation Items */}
      {navItems.map((navItem) => (
        <Link to={navItem.url} key={navItem.url} onClick={closeNav} className={`flex items-center rounded-lg hover:bg-brand-primary-dark hover:text-white mx-2 my-px p-3 pr-6  ${isNavItemActive(navItem) ? 'bg-brand-primary-dark text-white' : 'text-gray-200'}`}>
          {navItem.icon}
          <p className="ml-3 text-base">
            {navItem.name}
          </p>
        </Link>
      ))}
      <hr className="border-gray-200 opacity-50 my-4" />
      {/* Import/Export */}
      <button onClick={toggleImportMenu} type="button" aria-expanded={importMenuOpen} className="flex items-center relative rounded-lg hover:bg-brand-primary-dark text-gray-200 hover:text-white mx-2 my-px p-3 pr-6">
        <ImportExportIcon className="w-6 h-6 mr-3 fill-current" />
        <p className="text-base">
          Import/Export
        </p>
        <CaretIcon className={`absolute right-0 mr-3 w-4 h-4 fill-current transform transition-transform ${importMenuOpen && 'rotate-90'}`} />
      </button>
      <div className={importMenuOpen ? 'flex flex-col' : 'hidden'}>
        <ImportButton />
        <ExportButton />
        <ResetButton />
      </div>
    </>
  );
};

export default SidenavItems;
