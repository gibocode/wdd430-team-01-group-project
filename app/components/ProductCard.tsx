import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "white",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
      >
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "6px",
            marginBottom: "0.5rem",
          }}
        />

        <h3 style={{ margin: "0.5rem 0" }}>{name}</h3>

        <p style={{ fontSize: "0.9rem", color: "#555" }}>{description}</p>

        <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>{price}</p>
      </article>
    </Link>
  );
}
