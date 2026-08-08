import { PortfolioNav } from "@/components/portfolio-nav";
import { TiltCards } from "@/components/tilt-cards";
import { BlackHole } from "@/components/black-hole";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PortfolioNav>
        {children}
        <TiltCards />
      </PortfolioNav>
      <BlackHole />
    </>
  );
}
