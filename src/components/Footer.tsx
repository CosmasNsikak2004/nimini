import React from 'react';
import { siteConfig, specialtiesList } from '../data/siteData';

interface FooterProps {
  onOpenModal: () => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenModal();
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="footer-col">
            <h4>
              <div className="logo ft">
                <i className="fa-brands fa-neos" style={{ color: 'hsl(195, 100%, 99%)' }}></i>{' '}
                {siteConfig.companyName}
              </div>
            </h4>
            <p className="ft-pa">
              NIMINI CO. is a trusted medical supplies and healthcare equipment distributor,
              committed to excellence, reliability, and personalised care for every facility we serve.
            </p>
          </div>

          <div className="footer-col">
            <h4>SPECIALITIES</h4>
            <ul>
              {specialtiesList.map((item, idx) => (
                <li key={idx}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>
                  About Us <i className="fa-solid fa-chevron-right ftcon" style={{ fontSize: '11px' }}></i>
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>
                  Our Services <i className="fa-solid fa-chevron-right ftcon" style={{ fontSize: '11px' }}></i>
                </a>
              </li>
              <li>
                <a href="#product" onClick={(e) => handleLinkClick(e, '#product')}>
                  Our Products <i className="fa-solid fa-chevron-right ftcon" style={{ fontSize: '11px' }}></i>
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>
                  Contact Us <i className="fa-solid fa-chevron-right ftcon" style={{ fontSize: '11px' }}></i>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleRequestClick}>
                  Request Supplies <i className="fa-solid fa-chevron-right ftcon" style={{ fontSize: '11px' }}></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            <div className="footer-emergency">
              <p className="emergency-label">Emergency Supply Line:</p>
              <a href={`tel:${siteConfig.phoneTel}`} className="emergency-link">
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 NIMINI CO. All rights reserved. | Houston, Texas</p>
        </div>
      </div>
    </footer>
  );
}
