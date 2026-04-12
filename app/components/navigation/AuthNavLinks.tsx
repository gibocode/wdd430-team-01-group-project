"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/AuthProvider";
import { Box } from "@mui/material";
import theme from "@/utils/theme";

type Props = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function AuthNavLinks({ mobile = false, onNavigate }: Props) {
  const { user } = useAuth();

  const baseStyle = {
    textDecoration: "none",
    color: "inherit",
    fontWeight: 500,
    transition: "all 0.2s ease",
    cursor: "pointer",
  };

  const desktopStyle = {
    ...baseStyle,
    "&:hover": {
      color: theme.palette.secondary.main, // teal accent
    },
  };

  const mobileStyle = {
    ...baseStyle,
    color: theme.palette.text.primary,
    padding: "6px 0",
    "&:hover": {
      color: theme.palette.primary.main, // indigo on hover
    },
  };

  const renderLinks = (style: any) => (
    <>
      <Link href="/" onClick={onNavigate} style={style}>
        Home
      </Link>
      <Link href="/catalog" onClick={onNavigate} style={style}>
        Catalog
      </Link>
      <Link href="/sellers" onClick={onNavigate} style={style}>
        Sellers
      </Link>

      {user ? (
        <>
          <Link href="/dashboard" onClick={onNavigate} style={style}>
            Dashboard
          </Link>
          <a href="/logout" onClick={onNavigate} style={style}>
            Logout
          </a>
        </>
      ) : (
        <Link href="/login" onClick={onNavigate} style={style}>
          Login
        </Link>
      )}
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        gap: mobile ? 1 : 3,
      }}
    >
      {renderLinks(mobile ? mobileStyle : desktopStyle)}
    </Box>
  );
}