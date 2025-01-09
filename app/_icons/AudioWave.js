import {dimensions} from './Dimensions';

export default function AudioWave({
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
      <path d="M1 10v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-2 0zM6 6v12a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0zM21 10v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-2 0zM16 6v12a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0zM11 2v20a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0z" />
    </svg>
  );
}
