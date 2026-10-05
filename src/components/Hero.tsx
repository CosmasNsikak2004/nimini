import { siteConfig } from '../data/siteData';

interface HeroProps {
  onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <div className="tainer">
      <div className="hero">
        <div className="icon-container">
          <div
            className="vertical-line"
            style={{ width: '1px', height: '3rem', backgroundColor: '#3388ff' }}
          ></div>
          <div className="social-icon first">
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
          <div className="social-icon">
            <a href="#" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
          <div className="social-icon last">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <div
            className="vertical-line"
            style={{ width: '1px', height: '3rem', backgroundColor: '#3388ff' }}
          ></div>
        </div>

        <div className="hero-text">
          <h1>Bringing Smiles Back to Health</h1>
          <p className="f-p">
            NIMINI CO. delivers premium medical supplies and healthcare equipment to hospitals,
            clinics, and care facilities with unmatched reliability and professionalism.
          </p>
          <p className="s-2">
            Trusted by healthcare professionals nationwide, from skilled nursing centers to surgical
            suites, we are your committed supply partner.
          </p>
          <button className="btn" onClick={onOpenModal}>
            REQUEST SUPPLIES
          </button>
        </div>

        <div className="hero-image">
          <div className="image-grid hero-grid">
            <img
              className="image-grid-col-2 image-grid-row-2 g-1 animate__animated animate__fadeInRight"
              src="/assets/grid (1).jpg"
              alt="Healthcare supplies"
            />
            <img
              className="g-2 animate__animated animate__fadeInRight"
              src="/assets/grid (3).jpg"
              alt="Medical equipment"
            />
            <img
              className="g-3 animate__animated animate__fadeInRight"
              src="/assets/grid (2).jpg"
              alt="Hospital distribution"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
