import type { Metadata, Viewport } from "next";
import { RefuelApp } from "@/components/scenes/Refuel";

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Refuel · Ladder",
  description: "Post-workout check-in — a tap-through prototype.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Refuel",
  },
};

export default function LivePage() {
  return <RefuelApp />;
}
