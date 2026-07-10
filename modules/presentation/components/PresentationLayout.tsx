import Navbar from '@/modules/presentation/components/Navbar';
import Footer from '@/modules/presentation/components/Footer';

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer />
    </>
  );
}
