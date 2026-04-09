import { Box, Button, Typography } from "@mui/material";
import theme from "@/utils/theme";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarItem } from "@/types/dashboard/sidebar-item";

export default function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsState, setItemsState] = useState<SidebarItem[]>([]);

  const handleItemClick = (item: SidebarItem) => {
    items.forEach((item) => {
      item.active = false;
    });
    item.active = true;
    setItemsState([...items, item]);
  };

  items.forEach((item) => {
    item.active = false;
  });

  const item = items.find((item) => item.href === pathname);

  if (item) {
    item.active = true;
  }

  return (
    <Box
      sx={{
        width: "270px",
        flexShrink: 0,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        backgroundColor: "var(--sidebar-background)",
        borderRight: `1px solid ${theme.palette.divider}`,
        paddingX: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          py: 1,
          verticalAlign: "middle",
          left: -10,
          position: "relative",
        }}
      >
        <Box gap={0} position="relative" color={theme.palette.grey[600]}>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.3rem", fontWeight: 600, lineHeight: "2.75rem" }}
          >
            Handcrafted Haven
          </Typography>
        </Box>
      </Box>
      <Box flexDirection="column" display="flex" gap={1} p={1}>
        {items.map((item) => (
          <Button
            component={Link}
            key={item.href}
            href={item.href}
            sx={{
              margin: "0 2px",
              justifyContent: "left",
              backgroundColor: item.active
                ? "var(--sidebar-item-active)"
                : "var(--sidebar-background)",
              boxShadow: "none",
              gap: 1,
              "&:hover": {
                backgroundColor: item.active
                  ? "var(--sidebar-item-active)"
                  : "var(--sidebar-item-hover)",
                boxShadow: "none",
              },
            }}
            onClick={() => handleItemClick(item)}
          >
            <Box
              width={20}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx={1}
            >
              <item.icon stroke={1.5} size="1.5rem" />
            </Box>
            <Typography
              variant="body1"
              color={theme.palette.grey[600]}
              sx={{ textTransform: "capitalize" }}
            >
              {item.label}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
