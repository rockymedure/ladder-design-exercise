import type { Metadata, Viewport } from "next";
import { RefuelPulseApp } from "@/components/scenes/RefuelPulse";

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Refuel · Pulse",
  description: "Post-workout, one-tap refuel — a living visualization.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Refuel",
  },
};

export default function PulsePage() {
  return <RefuelPulseApp />;
}
