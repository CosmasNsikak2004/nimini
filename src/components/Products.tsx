import React from 'react';
import { productsData } from '../data/siteData';

interface ProductsProps {
  onOpenModal: () => void;
}

export function Products({ onOpenModal }: ProductsProps) {
  const mobileProducts = [
    { name: 'Diagnostic Equipment', image: '/assets/product (1).webp' },
    { name: 'Surgical Supplies', image: '/assets/product (2).webp' },
    { name: 'Monitoring Devices', image: '/assets/product (6).webp' },
    { name: 'Sterilisation Tools', image: '/assets/product (7).webp' },
    { name: 'Mobility Aids', image: '/assets/product (5).webp' },
  ];

  const handleMobileCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenModal();
  };

  return (
    <section className="products reusable" id="product">
      <header className="headings">
        <h3>PRODUCTS</h3>
        <h1>Our Medical Equipment &amp; Supply Catalogue</h1>
        <p>
          Premium medical supplies, equipment, and consumables for healthcare facilities of all
          sizes, sourced, verified, and delivered with care.
        </p>
      </header>

      {/* 3D Carousel (Desktop) */}
      <div className="product">
        <div className="box">
          {productsData.map((prod) => (
            <span
              key={prod.id}
              style={{ ['--i' as string]: prod.index } as React.CSSProperties}
            >
              <img src={prod.image} alt={prod.name} />
            </span>
          ))}
        </div>
      </div>

      {/* Mobile Product Grid */}
      <div className="sec-products">
        <div className="products-container p-container">
          {mobileProducts.map((prod, idx) => (
            <div key={idx}>
              <a href="#" onClick={handleMobileCardClick}>
                <div className="product-card">
                  <img src={prod.image} className="product-image" alt={prod.name} />
                  <div className="mobile-product-label">{prod.name}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="duct">
        <button className="btn" onClick={onOpenModal}>
          REQUEST A PRODUCT
        </button>
      </div>
    </section>
  );
}
