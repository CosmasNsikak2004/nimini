import { useState } from 'react';
import { navLinks, siteConfig } from '../data/siteData';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo top-log">
        <i className="fa-brands fa-neos"></i> {siteConfig.companyName}
      </div>

      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-sci">
        {/* <a href="#" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a> */}
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      <div className="toggle_btn" onClick={toggleMenu} aria-label="Toggle navigation">
        <i className={isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'}></i>
      </div>

      <div className={`dropdown_menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link, idx) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={idx === 0 ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#" className="drop" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="drop" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="drop" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="drop" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </li>
      </div>
    </nav>
  );
}
