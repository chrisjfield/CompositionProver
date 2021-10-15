import SvgIconProps from '../../types/props/SvgIcon.interface';

const ExportIcon = ({ className }: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <title>Export</title>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M176 262.62L256 342l80-79.38M256 330.97V170" />
    <path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
  </svg>
);

ExportIcon.defaultProps = {
  className: '',
};

export default ExportIcon;
