export default function ProductCard() {
  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      <img
        src="https://via.placeholder.com/200"
        alt="Sample Product"
        style={{ width: "100%", borderRadius: "6px", marginBottom: "0.5rem" }}
      />

      <h3 style={{ margin: "0.5rem 0" }}>Sample Product</h3>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Handmade item description goes here.
      </p>

      <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>$25.00</p>
    </article>
  );
}