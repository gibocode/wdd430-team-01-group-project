"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthNavLinks from "./navigation/AuthNavLinks";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: 700 }}
        >
          Handcrafted Haven
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <AuthNavLinks />
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton onClick={handleOpen} aria-label="open navigation menu">
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                px: 2,
                py: 1.5,
                gap: 1.5,
                minWidth: 160,
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