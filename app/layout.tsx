import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chaimaa — A Portrait in Light",
  description: "A cinematic photo portrait celebrating Chaimaa Nouassi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
