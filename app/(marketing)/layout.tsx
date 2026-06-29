import { Footer } from "@/components/layout/footer";
import { MarketingNavbar } from "@/components/layout/marketing-navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
