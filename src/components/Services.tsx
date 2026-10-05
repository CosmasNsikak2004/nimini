import { servicesData } from '../data/siteData';

export function Services() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(href.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="services reusable" id="services">
      <header className="headings">
        <h3>SERVICES</h3>
        <h1>We deliver exceptional healthcare solutions</h1>
        <p>
          From seamless ordering to specialised drop-shipping, we provide everything your facility
          needs to operate without interruption.
        </p>
      </header>

      <div className="services-container">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="service-box"
            data-aos="fade-up"
            data-aos-delay={service.delay}
          >
            <div className="icon-wrapper">
              <i className={service.icon}></i>
            </div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <a
              href={service.linkHref}
              target={service.linkHref.startsWith('http') ? '_blank' : undefined}
              rel={service.linkHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleScrollToContact(e, service.linkHref)}
            >
              {service.linkText} <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
