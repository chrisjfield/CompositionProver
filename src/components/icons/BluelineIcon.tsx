import { SvgIconProps } from '../../types/props';

const BluelineIcon = ({ className }: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 320h64l64-256 64 384 64-224 32 96h64" />
    <circle cx="432" cy="320" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
  </svg>
);

BluelineIcon.defaultProps = {
  className: '',
};

export default BluelineIcon;
