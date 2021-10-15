import SvgIconProps from '../../types/props/SvgIcon.interface';

const CloseIcon = ({ className }: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <title>Close</title>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368" />
  </svg>
);

CloseIcon.defaultProps = {
  className: '',
};

export default CloseIcon;