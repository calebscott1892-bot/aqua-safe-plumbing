/** Shared "Scroll" hint with the dripping bar — sits at the bottom of each hero. */
export function ScrollHint() {
  return (
    <div className="scroll-hint" aria-hidden="true">
      <span>Scroll</span>
      <span className="bar" />
    </div>
  );
}
