import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h1>Handcrafted Haven</h1>

      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/sellers">Sellers</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}