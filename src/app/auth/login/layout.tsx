import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to System",
  description: "Login to System",
};

export default function LoginLayout({
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
