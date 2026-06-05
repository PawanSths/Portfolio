import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});
//small changes
export const metadata: Metadata = {
  title: "Pawan Shrestha",
  description:
    "Portfolio for Pawan Shrestha, a computer engineering graduate focused on AI, ML, Python, data science, and software engineering."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.dataset.theme="dark"}catch(e){}})();`
          }}
        />
        {children}
      </body>
    </html>
  );
}
