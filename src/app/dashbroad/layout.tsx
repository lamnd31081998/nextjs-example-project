import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashbroad",
};

export default function DashbroadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
