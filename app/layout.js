import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Template from "./template";
import { Providers } from "./provider/Provider";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Your Default Site Title",
    template: "%s | Your Site Name",
  },
  description: "Default description for your website",
  keywords: ["relevant", "keywords", "for", "your", "site"],
  authors: [{ name: "Your Name", url: "https://shumonkhan.vercel.app" }],
  metadataBase: new URL("https://shumonkhan.vercel.app"),
  openGraph: {
    title: "Your Site Name",
    description: "Default Open Graph description",
    url: "https://yourwebsite.com",
    siteName: "Your Site Name",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Template>
            <ClientLayout>{children}</ClientLayout>
          </Template>
        </Providers>
      </body>
    </html>
  );
}
