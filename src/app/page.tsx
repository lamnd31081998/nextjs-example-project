"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    //@ts-ignore
    if (!localStorage.getItem("user_info") || localStorage.getItem("user_info") == "null" || !JSON.parse(localStorage.getItem("user_info"))?.user) router.push("/auth/login");
    else router.push("/dashbroad");
  }, []);

  return <></>;
}
