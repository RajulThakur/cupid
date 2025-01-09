import {dimensions} from './Dimensions';

export default function DynamicSVG({
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
        d="M 4.488 17.001 L 8.689 9.866 C 9.404 8.65 10.566 8.65 11.279 9.866 L 15.482 17.001 M 14.259 14.927 L 15.408 12.979 C 16.122 11.763 17.284 11.763 17.998 12.979 L 20.368 17.001 M 5.71 22.189 L 19.146 22.189 C 19.821 22.189 20.368 21.26 20.368 20.114 L 20.368 3.515 C 20.368 2.369 19.821 1.44 19.146 1.44 L 5.71 1.44 C 5.036 1.44 4.488 2.369 4.488 3.515 L 4.488 20.114 C 4.488 21.26 5.036 22.189 5.71 22.189 Z M 14.259 6.628 L 14.266 6.628 L 14.266 6.638 L 14.259 6.638 L 14.259 6.628 Z M 14.565 6.628 C 14.565 7.026 14.311 7.276 14.108 7.078 C 14.013 6.983 13.955 6.812 13.955 6.628 C 13.955 6.226 14.21 5.978 14.413 6.179 C 14.507 6.27 14.565 6.443 14.565 6.628 Z"
      />
    </svg>
  );
}
