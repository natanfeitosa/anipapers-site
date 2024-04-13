import "./globals.scss";

import { Viewport } from "next";
import { defineMetadata } from "@/helpers";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata = defineMetadata({
  title: {
    default: "Anipapers",
    template: "%s | Anipapers",
  },
  description: "Sua plataforma com os melhores papéis de paredes de animes",
  applicationName: "Anipapers",
  openGraph: {
    type: "website",
    siteName: "Anipapers",
  },
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
  ],
});

/*
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
*/

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <GoogleAnalytics />
      <body className="bg-slate-100 dark:bg-slate-800 dark:text-gray-100 text-gray-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
