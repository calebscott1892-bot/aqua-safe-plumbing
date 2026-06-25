/** The recurring asymmetric "NN — Label" index head (aqua, top-ruled). */
export function IndexLabel({
  num,
  label,
  className = "",
}: {
  num: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`num ${className}`.trim()}>
      {num} — {label}
    </div>
  );
}
