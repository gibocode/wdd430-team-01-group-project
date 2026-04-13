"use client";

import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarItem } from "@/types/dashboard/sidebar-item";

export default function Sidebar({
  items,
  mobile = false,
  onNavigate,
}: {
  items: SidebarItem[];
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            letterSpacing: 0.2,
          }}
        >
          Handcrafted Haven
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1.5 }}>
        {items.map((item) => {
          const isActive = item.href === pathname;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 2,
                  backgroundColor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "#FFFFFF" : "text.primary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: isActive ? "primary.main" : "action.hover",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <item.icon stroke={1.5} size="1.5rem" />
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: isActive ? 600 : 500,
                    color: "inherit",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </>
  );

  if (mobile) {
    return (
      <Box
        sx={{
          width: 270,
          height: "100%",
          backgroundColor: "background.paper",
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        width: 270,
        flexShrink: 0,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        backgroundColor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        px: 0,
      }}
    >
      {content}
    </Box>
  );
}
