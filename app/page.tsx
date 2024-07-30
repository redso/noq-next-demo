"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home({}) {
  const checkExpiry = () => {
    RoomQ.getExpiryTime(console.log);
  };

  useEffect(() => {
    RoomQ.checkTicket();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link href="/test">To Test</Link>
        <button onClick={checkExpiry}>Check Expiry</button>
      </div>
    </main>
  );
}
