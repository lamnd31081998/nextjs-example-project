import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashbroad",
  description: "Dashbroad",
};

export default function DashbroadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
