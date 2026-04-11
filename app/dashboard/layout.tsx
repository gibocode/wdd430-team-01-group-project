"use client";

import Sidebar from "@/app/components/dashboard/layout/Sidebar";
import { IconDashboard, IconShoppingCart, IconUser } from "@tabler/icons-react";
import { SidebarItem } from "@/types/dashboard/sidebar-item";
import DashboardHeader from "../components/dashboard/layout/DashboardHeader";
import { Box } from "@mui/material";
import theme from "@/utils/theme";
import AuthProvider from "@/lib/context/AuthProvider";

const items: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: IconDashboard as React.ElementType,
  },
  {
    label: "Products",
    href: "/dashboard/manage/products",
    icon: IconShoppingCart as React.ElementType,
  },
  {
    label: "Profile",
    href: "/dashboard/manage/profile",
    icon: IconUser as React.ElementType,
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <>
        <DashboardHeader />
        <Sidebar items={items} />
        <Box
          sx={{
            padding: 2,
            marginLeft: "270px",
            marginTop: "64px",
            backgroundColor: theme.palette.background.paper,
            color: "black",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </Box>
      </>
    </>
  );
}
