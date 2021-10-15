import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '../../types/navigation';
import BarChartIcon from '../icons/BarChartIcon';
import BellIcon from '../icons/BellIcon';
import CaretIcon from '../icons/CaretIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';
import ExportIcon from '../icons/ExportIcon';
import HelpIcon from '../icons/HelpIcon';
import HomeIcon from '../icons/HomeIcon';
import ImportExportIcon from '../icons/ImportExportIcon';
import ImportIcon from '../icons/ImportIcon';
import MusicalNoteIcon from '../icons/MusicalNoteIcon';
import ResetIcon from '../icons/ResetIcon';

interface SidenavItemsProps {
  closeNav: () => void;
}

const SidenavItems = ({ closeNav }: SidenavItemsProps) => {
  const [importMenuOpen, setImportMenuOpen] = useState(false);

  const toggleImportMenu = () => {
    setImportMenuOpen(!importMenuOpen);
  };

  const importComposition = () => {
    console.log('import');
  };

  const exportComposition = () => {
    console.log('export');
  };

  const resetComposition = () => {
    console.log('reset');
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

  const importDropdownOptions = [
    {
      name: 'Import',
      icon: <ImportIcon className="w-6 h-6 fill-current" />,
      action: () => importComposition(),
    },
    {
      name: 'Export',
      icon: <ExportIcon className="w-6 h-6 fill-current" />,
      action: () => exportComposition(),
    },
    {
      name: 'Reset',
      icon: <ResetIcon className="w-6 h-6 fill-current" />,
      action: () => resetComposition(),
    },
  ];

  return (
    <>
      {/* Navigation Items */}
      {navItems.map((navItem) => (
        <Link to={navItem.url} key={navItem.url} onClick={closeNav} className="flex items-center rounded-lg hover:bg-blue-900 text-gray-200 hover:text-white mx-2 my-1 p-3 pr-6">
          {navItem.icon}
          <p className="ml-3 text-base">
            {navItem.name}
          </p>
        </Link>
      ))}
      <hr className="border-gray-200 opacity-50 my-4" />
      {/* Import/Export */}
      <button onClick={toggleImportMenu} type="button" className="flex items-center relative rounded-lg hover:bg-blue-900 text-gray-200 hover:text-white mx-2 my-1 p-3 pr-6">
        <ImportExportIcon className="w-6 h-6 mr-3 fill-current" />
        <p className="text-base">
          Import/Export
        </p>
        <CaretIcon className={`absolute right-0 mr-3 w-4 h-4 fill-current transform transition-transform ${importMenuOpen && 'rotate-90'}`} />
      </button>
      <div className={importMenuOpen ? 'flex flex-col' : 'hidden'}>
        {importDropdownOptions.map((option) => (
          <button onClick={option.action} type="button" key={option.name} className="flex items-center relative rounded-lg hover:bg-blue-900 text-gray-200 hover:text-white mx-2 mt-1 ml-6 px-3 py-2 pr-6">
            {option.icon}
            <p className="ml-3 text-base">
              {option.name}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};

export default SidenavItems;
