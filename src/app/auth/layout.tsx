"use client";

import NotficationComponent from "@/component/shared/notification.component";
import { AppStore, makeStore } from "@/lib/store/index.store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <html lang="en">
        <NotficationComponent />
        <body>{children}</body>
      </html>
    </Provider>
  );
}
