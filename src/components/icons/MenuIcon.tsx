import SvgIconProps from '../../types/props/SvgIcon.interface';

const MenuIcon = ({ className }: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <title>Menu</title>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352" />
  </svg>
);

MenuIcon.defaultProps = {
  className: '',
};

export default MenuIcon;
