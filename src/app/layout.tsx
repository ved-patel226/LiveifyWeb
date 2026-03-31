import "./global.css";
import { Inter } from "next/font/google";
import { RootProviderWrapper } from "./root-provider-wrapper";
import ThemeInitializer from "../components/ThemeInitializer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>{/* Script removed from here */}</head>
      <body className="flex flex-col min-h-screen">
        <RootProviderWrapper>
          <ThemeInitializer />
          {children}
        </RootProviderWrapper>
      </body>
    </html>
  );
}
