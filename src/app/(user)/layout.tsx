import TopNavBar from "@/components/shared/top_navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavBar />
      <main className="relative  md:top-28">{children}</main>
    </>
  );
}
