export default function PrimaryButton({ children, href, variant = "primary", className = "", ...rest }) {
  const Comp = href ? "a" : "button";
  const styles =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
      : "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/15";
  return (
    <Comp
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition focus:outline-none focus:ring-2 focus:ring-white/70 ${styles} ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}

