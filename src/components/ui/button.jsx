export function Button({ children, onClick, variant }) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded ${variant === 'destructive' ? 'bg-red-500' : 'bg-blue-500'} text-white`}
    >
      {children}
    </button>
  );
}
