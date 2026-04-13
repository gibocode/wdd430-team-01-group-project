"use client";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Logout } from "@mui/icons-material";
import { IconUser } from "@tabler/icons-react";
import { AuthUser } from "@/types/auth-user";
import NextLink from "@/app/components/NextLink";

export default function UserDropdown({
  user,
  profileUrl,
}: {
  user: AuthUser;
  profileUrl?: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        sx={{ ml: "auto", mr: 1, gap: 1 }}
      >
        <Tooltip title="Account settings">
          <IconButton
            size="small"
            color="inherit"
            aria-label="account settings"
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              src={profileUrl}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {!profileUrl ? user.name?.charAt(0).toUpperCase() : null}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              minWidth: 260,
              overflow: "visible",
              backgroundColor: "background.paper",
              color: "text.primary",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 3,
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 36,
                height: 36,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                borderLeft: "1px solid",
                borderTop: "1px solid",
                borderColor: "divider",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          px={2.5}
          py={1.5}
        >
          <Avatar
            src={profileUrl}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {!profileUrl ? user.name?.charAt(0).toUpperCase() : null}
          </Avatar>

          <Box display="flex" flexDirection="column">
            <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              Seller
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box display="flex" flexDirection="column" py={0.5}>
          <Typography
            sx={{
              fontSize: 11,
              textTransform: "uppercase",
              fontWeight: 700,
              lineHeight: 1.5,
              color: "text.secondary",
              px: 2,
              py: 0.5,
            }}
          >
            Catalog
          </Typography>

          <MenuItem
            component={NextLink}
            href="/dashboard/manage/products"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body2" sx={{ ml: 1 }}>
              Products
            </Typography>
          </MenuItem>
        </Box>

        <Divider />

        <Box display="flex" flexDirection="column" py={0.5}>
          <MenuItem
            component={NextLink}
            href="/dashboard/manage/profile"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon>
              <IconUser size={18} />
            </ListItemIcon>
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
        </Box>

        <Divider />

        <MenuItem component="a" href="/logout">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
