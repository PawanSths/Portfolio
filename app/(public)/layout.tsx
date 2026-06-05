import { PortfolioNav } from "@/components/portfolio-nav";
import { ClientEffects } from "@/components/client-effects";
import { StarfieldBg } from "@/components/starfield-bg";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StarfieldBg />
      <PortfolioNav>
        {children}
        <ClientEffects />
      </PortfolioNav>
    </>
  );
}
