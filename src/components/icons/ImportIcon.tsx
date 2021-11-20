import { SvgIconProps } from '../../types/props';

const ImportIcon = ({ className }: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M176 249.38L256 170l80 79.38M256 181.03V342" />
    <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
  </svg>
);

ImportIcon.defaultProps = {
  className: '',
};

export default ImportIcon;
