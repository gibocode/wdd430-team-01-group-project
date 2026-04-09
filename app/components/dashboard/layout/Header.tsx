"use client";

import { AppBar, Box, Toolbar } from "@mui/material";
import theme from "@/utils/theme";
import UserDropdown from "./header/UserDropdown";
import { useAuth } from "@/lib/context/AuthProvider";

export default function Header() {
  const { user, loading } = useAuth();
  return (
    <AppBar
      sx={{
        backgroundColor: "white",
        color: "black",
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!loading && user && <UserDropdown user={user} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
