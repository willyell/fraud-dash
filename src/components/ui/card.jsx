export function Card({ children }) {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="text-gray-700">{children}</div>;
}
