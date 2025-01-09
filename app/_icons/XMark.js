import {dimensions} from './Dimensions';

export default function XMark({
  size = 'md',
  strokeWidth = 1.5,
  fill = 'none',
  color = 'currentColor',
  className = '',
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      className={`${dimensions[size]} ${className}`}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
