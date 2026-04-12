"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthNavLinks from "./navigation/AuthNavLinks";
import NextLink from "./NextLink";
import theme from "@/utils/theme";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#FFFFFF",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        <Typography
          component={NextLink}
          href="/"
          variant="h6"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700,
            letterSpacing: 0.2,
          }}
        >
          Handcrafted Haven
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <AuthNavLinks />
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            onClick={handleOpen}
            aria-label="open navigation menu"
            sx={{ color: "#FFFFFF" }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 180,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                px: 2,
                py: 1.5,
                gap: 1.5,
              }}
            >
              <AuthNavLinks mobile onNavigate={handleClose} />
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}