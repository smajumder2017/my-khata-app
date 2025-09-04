import type { Metadata } from "next";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { SessionProvider } from "next-auth/react";
import {auth} from "../../auth";

export const metadata: Metadata = {
  title: "MyKhata",
  description: "A simple ledger app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session?.user.role.name);
  
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
