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
import Link from "next/link";
import { IconUser } from "@tabler/icons-react";
import { User } from "@/types/user";

export default function UserDropdown({ user }: { user: User }) {
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
        alignItems="right"
        sx={{ marginLeft: "auto", marginRight: 1, gap: 1 }}
      >
        <Tooltip title="Account Settings">
          <IconButton
            size="small"
            color="inherit"
            aria-label="account settings"
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar sx={{ width: 40, height: 40 }} />
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
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
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
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ minWidth: 300 }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          px={3}
          py={0.5}
        >
          <Avatar sx={{ width: 40, height: 40 }} />
          <Box display="flex" flexDirection="column">
            <Typography
              variant="h6"
              sx={{ fontSize: 16, fontWeight: 600, lineHeight: "1rem" }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: 12, fontWeight: 400, lineHeight: "1rem" }}
            >
              Seller
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h6"
            sx={{
              fontSize: 11,
              textTransform: "uppercase",
              fontWeight: 600,
              lineHeight: "1.5rem",
              color: "grey.400",
              px: 2,
              py: 0.5,
            }}
          >
            Catalog
          </Typography>
          <MenuItem
            component={Link}
            href="/dashboard/manage/products"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Products
            </Typography>
          </MenuItem>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column">
          <MenuItem
            component={Link}
            href="/dashboard/manage/profile"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon>
              <IconUser fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleClose} component={Link} href="/logout">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
