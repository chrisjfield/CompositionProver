import { ReactElement } from 'react';

export default interface NavItem {
  name: string;
  url: string;
  icon?: ReactElement;
}
