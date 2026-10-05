import { siteConfig } from '../data/siteData';

export function TopBar() {
  const handleViewProducts = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="top-bar">
      <div className="text-start">
        <p className="top-text">
          <img src="/assets/phone-call.svg" alt="svg" />
          <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
        </p>
      </div>
      <div className="text-ends" style={{ textAlign: 'right' }}>
        <button className="btn top-btn" onClick={handleViewProducts}>
          VIEW PRODUCTS
        </button>
      </div>
    </div>
  );
}
