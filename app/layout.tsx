import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "सेवा खोज - Nepal's #1 Service Marketplace",
  description:
    "Connect with trusted service providers in Nepal. Find professionals for home services, tutoring, consulting, and more.",
  keywords:
    "nepal, marketplace, services, professionals, home services, tutoring, consulting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
