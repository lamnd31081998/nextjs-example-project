import TemplateComponent from "@/component/layout/template.component";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User Info",
  icons:
    "https://images.squarespace-cdn.com/content/v1/575a6067b654f9b902f452f4/1552683653140-0UUVQSSUEWVC73AWAEQG/300Logo.png",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <TemplateComponent children={children} />
      </body>
    </html>
  );
}