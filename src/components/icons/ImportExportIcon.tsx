import SvgIconProps from '../../types/props/SvgIcon.interface';

const ImportExportIcon = ({ className }: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <title>Swap Vertical</title>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M464 208L352 96 240 208M352 113.13V416M48 304l112 112 112-112M160 398V96" />
  </svg>
);

ImportExportIcon.defaultProps = {
  className: '',
};

export default ImportExportIcon;
