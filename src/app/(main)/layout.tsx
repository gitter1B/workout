import { Header } from "@/components/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="p-4 sm:p-8">{children}</main>
    </>
  );
}
