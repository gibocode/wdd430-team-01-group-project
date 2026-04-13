"use client";

import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserDropdown from "./header/UserDropdown";
import { useAuth } from "@/lib/context/AuthProvider";
import { useEffect, useState } from "react";

export default function DashboardHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const { user, loading } = useAuth();
  const [profileUrl, setProfileUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchSellerProfile = async () => {
      if (!user?.userId) {
        setProfileUrl(undefined);
        return;
      }

      try {
        const response = await fetch(`/api/sellers/${user.userId}`, {
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && data.data?.profileUrl) {
          setProfileUrl(data.data.profileUrl);
        } else {
          setProfileUrl(undefined);
        }
      } catch (error) {
        console.error("Failed to fetch seller profile:", error);
        setProfileUrl(undefined);
      }
    };

    fetchSellerProfile();
  }, [user?.userId]);

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 2100,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: 1.5,
          minHeight: 64,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={onMenuClick}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              aria-label="open dashboard navigation"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {!loading && user && (
            <UserDropdown user={user} profileUrl={profileUrl} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
