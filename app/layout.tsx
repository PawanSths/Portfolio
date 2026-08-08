import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});
export const metadata: Metadata = {
  title: "Pawan Shrestha — Computer Engineer",
  description:  
    "Recent Computer Engineering graduate with a strong foundation in full-stack web development, machine learning,and AI systems."
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
