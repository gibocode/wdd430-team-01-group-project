"use client";

import { useState } from "react";
import Sidebar from "@/app/components/dashboard/layout/Sidebar";
import { IconDashboard, IconShoppingCart, IconUser } from "@tabler/icons-react";
import { SidebarItem } from "@/types/dashboard/sidebar-item";
import DashboardHeader from "../components/dashboard/layout/DashboardHeader";
import { Box, Drawer } from "@mui/material";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenDrawer = () => {
    setMobileOpen(true);
  };

  const handleCloseDrawer = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <DashboardHeader onMenuClick={handleOpenDrawer} />

      <Sidebar items={items} />

      <Drawer
        open={mobileOpen}
        onClose={handleCloseDrawer}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 270,
            boxSizing: "border-box",
            backgroundColor: "background.paper",
          },
        }}
      >
        <Sidebar items={items} mobile onNavigate={handleCloseDrawer} />
      </Drawer>

      <Box
        sx={{
          p: 2,
          ml: { xs: 0, md: "270px" },
          mt: "64px",
          backgroundColor: "background.default",
          color: "text.primary",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </>
  );
}
