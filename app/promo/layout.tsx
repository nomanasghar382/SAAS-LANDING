export const metadata = {
  title: "SellPilot AI — Promo",
  robots: { index: false, follow: false },
};

export default function PromoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {children}
    </div>
  );
}
