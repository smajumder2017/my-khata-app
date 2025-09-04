import type { Metadata } from "next";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "MyKhata",
  description: "A simple ledger app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header>{/* Header content */}</Header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
