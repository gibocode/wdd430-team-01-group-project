"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/AuthProvider";

type Props = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function AuthNavLinks({
  mobile = false,
  onNavigate,
}: Props) {
  const { user } = useAuth();

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const commonProps = {
    onClick: onNavigate,
    style: linkStyle,
  };

  if (mobile) {
    return (
      <>
        <Link href="/" {...commonProps}>
          Home
        </Link>
        <Link href="/catalog" {...commonProps}>
          Catalog
        </Link>
        <Link href="/sellers" {...commonProps}>
          Sellers
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" {...commonProps}>
              Dashboard
            </Link>
            <a href="/logout" onClick={onNavigate} style={linkStyle}>
              Logout
            </a>
          </>
        ) : (
          <Link href="/login" {...commonProps}>
            Login
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      <Link href="/" style={linkStyle}>
        Home
      </Link>
      <Link href="/catalog" style={linkStyle}>
        Catalog
      </Link>
      <Link href="/sellers" style={linkStyle}>
        Sellers
      </Link>

      {user ? (
        <>
          <Link href="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
          <a href="/logout" style={linkStyle}>
            Logout
          </a>
        </>
      ) : (
        <Link href="/login" style={linkStyle}>
          Login
        </Link>
      )}
    </>
  );
}