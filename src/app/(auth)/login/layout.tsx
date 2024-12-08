export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-16 flex items-center justify-center">{children}</div>
  );
}
