import Navbar from "@/components/common/layout/Navbar";
import Footer from "@/components/common/layout/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
