export default function Button({varient, children, className, onClick}) {
  return (
    <button
      className={className}
      onClick={onClick}>
      {children}
    </button>
  );
}
