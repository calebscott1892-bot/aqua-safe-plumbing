import { Button } from "@/components/ui/Button";
import { business } from "@/content/business";

/** Sticky bottom call/book bar — shown on small screens only (CSS). */
export function MobileCallBar() {
  return (
    <div className="mbar">
      <Button variant="line" href={business.phoneHref} ariaLabel={`Call ${business.name}`}>
        Call
      </Button>
      <Button variant="fill" href="#book">
        Book now
      </Button>
    </div>
  );
}
