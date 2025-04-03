"use client";

import { useEffect, useState } from "react";
import Terminal from "@/components/terminal";
import BootSequence from "@/components/boot-sequence";
import { CRTToggle } from "@/components/crt-toggle";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wp14013807.jpg-R0GMP9bCUVPW5Qfg2rbLlUeYSGymlM.jpeg")',
          backgroundPosition: "center 40%",
          filter: "brightness(0.7) contrast(1.1)",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 py-8 h-screen flex flex-col relative z-10">
        {booting ? <BootSequence /> : <Terminal />}
      </div>
    </main>
  );
}
