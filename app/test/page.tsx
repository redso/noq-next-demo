"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home({}) {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link href="/">To Home</Link>
      </div>
    </main>
  );
}
