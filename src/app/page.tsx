"use client";
import { useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

type SocialMedia = {
  name: string;
  url: string;
  icon: React.ElementType;
};

const products = [
  {
    name: "Strawberry Delight",
    price: "$5.99",
    image: "/imagen1.jpg",
    description: "Un delicioso dulce de fresa con un toque cremoso.",
  },
  {
    name: "Blueberry Bliss",
    price: "$6.49",
    image: "/imagen2.jpg",
    description: "Arándanos y fresa en perfecta armonía.",
  },
  {
    name: "Fresa Magic",
    price: "$5.49",
    image: "/imagen3.jpg",
    description: "Sabor a Fresa tropical en cada bocado.",
  },
];

const socialMedia: SocialMedia[] = [
  { name: "Instagram", url: "https://instagram.com", icon: Instagram },
  { name: "Facebook", url: "https://facebook.com", icon: Facebook },
  { name: "Twitter", url: "https://twitter.com", icon: Twitter },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<SocialMedia | null>(
    null
  );
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);

  const handleIconClick = (media: SocialMedia) => {
    setSelectedSocial(media);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSocial(null);
  };

  const handleCopyLink = () => {
    if (selectedSocial) {
      navigator.clipboard.writeText(selectedSocial.url);
    }
  };

  const handleBuyNowClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        background: "#fff0f6",
        minHeight: "100vh",
        padding: "0 0 40px 0",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px 30px 20px",
          background: "#ffb3de",
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Creamberry</h1>
        <p style={{ fontSize: "1.3rem", margin: "10px 0 0 0" }}>
          ¡Endulza tu día con nuestras deliciosas delicias!{" "}
        </p>
      </section>

      {/* Product List */}
      <section
        style={{ maxWidth: 900, margin: "40px auto 0 auto", padding: "0 20px" }}
      >
        <h2 style={{ textAlign: "center", color: "#d72660" }}>Nuestros productos</h2>
        <div
          style={{
            display: "flex",
            gap: 30,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          {products.map((product) => (
            <div
              key={product.name}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px #eee",
                padding: 20,
                width: 220,
                textAlign: "center",
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                style={{ borderRadius: 8 }}
              />
              <h3 style={{ margin: "15px 0 5px 0", color: "#d72660" }}>
                {product.name}
              </h3>
              <p style={{ fontWeight: "bold", color: "#333" }}>
                {product.price}
              </p>
              <button
                style={{
                  background: "#d72660",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 18px",
                  cursor: "pointer",
                  marginTop: 10,
                }}
                onClick={() => handleBuyNowClick(product)}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media */}
      <section style={{ textAlign: "center", margin: "50px 0 0 0" }}>
        <h2 style={{ color: "#d72660" }}>Follow Us</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            marginTop: 15,
          }}
        >
          {socialMedia.map((media) => {
            const Icon = media.icon;
            return (
              <button
                key={media.name}
                onClick={() => handleIconClick(media)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-block",
                  padding: 0,
                }}
                aria-label={media.name}
              >
                <Icon size={40} />
              </button>
            );
          })}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedSocial && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 300,
              boxShadow: "0 2px 16px #0002",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, color: "#d72660", textAlign: "center" }}>
              {selectedSocial.name}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0" }}>
              <li>
                <a
                  href={selectedSocial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#d72660",
                    textDecoration: "none",
                    fontWeight: "bold",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  Visitar perfil
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigator.share
                      ? navigator.share({ url: selectedSocial.url })
                      : window.open(selectedSocial.url, "_blank");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#d72660",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "8px 0",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  Compartir
                </button>
              </li>
              <li>
                <button
                  onClick={handleCopyLink}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#d72660",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "8px 0",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  Copiar enlace
                </button>
              </li>
            </ul>
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: 10,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#888",
                cursor: "pointer",
              }}
              aria-label="Cerrar modal"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {productModalOpen && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseProductModal}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 320,
              boxShadow: "0 2px 16px #0002",
              position: "relative",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={120}
              height={120}
              style={{ borderRadius: 10 }}
            />
            <h3 style={{ color: "#d72660", margin: "18px 0 8px 0" }}>
              {selectedProduct.name}
            </h3>
            <p style={{ fontWeight: "bold", color: "#333", margin: 0 }}>
              {selectedProduct.price}
            </p>
            <p style={{ color: "#555", margin: "16px 0 0 0" }}>
              {selectedProduct.description}
            </p>
            <button
              onClick={handleCloseProductModal}
              style={{
                marginTop: 24,
                background: "#d72660",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 24px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* About Us */}
      <section
        style={{
          maxWidth: 700,
          margin: "60px auto 0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px #eee",
          padding: 30,
        }}
      >
        <h2 style={{ color: "#d72660", textAlign: "center" }}>Nosotros</h2>
        <p
          style={{
            color: "#444",
            fontSize: "1.1rem",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          En Creamberry nos dedicamos a ofrecerte los postres y dulces más
          frescos y deliciosos. Nuestra pasión por la calidad y el sabor es la
          esencia de todo lo que hacemos. Ya sea que estés celebrando una
          ocasión especial o simplemente quieras darte un gusto, ¡Cremaberry
          está aquí para hacerte el día más dulce!
        </p>
      </section>
    </main>
  );
}
