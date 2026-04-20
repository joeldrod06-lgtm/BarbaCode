const iconPaths = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  cart: "M4 6h2l2.4 8.5h8.8L20 8H8.5M10 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z",
  box: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18m8-13.5L12 12 4 7.5",
  layers: "M12 4l8 4-8 4-8-4 8-4zm-8 8l8 4 8-4m-16 4l8 4 8-4",
  bag: "M7 8V7a5 5 0 0110 0v1m-11 0h12l1 12H5L6 8z",
  wallet: "M4 7h14a2 2 0 012 2v8a2 2 0 01-2 2H4V7zm0 0a2 2 0 012-2h10m2 8h-3",
  bank: "M3 9l9-5 9 5M5 10v8m4-8v8m4-8v8m4-8v8M3 20h18",
  users: "M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m16 0v-2a4 4 0 00-3-3.87M15 3.13a4 4 0 010 7.75M12 7a4 4 0 11-8 0 4 4 0 018 0z",
  chart: "M5 19V9m7 10V5m7 14v-7",
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
};

export function ModuleIcon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={iconPaths[name] ?? iconPaths.grid} />
    </svg>
  );
}
