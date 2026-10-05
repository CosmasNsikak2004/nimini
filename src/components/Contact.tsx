import React, { useState } from 'react';
import { contactInfoData } from '../data/siteData';

export function Contact() {
  const [name, setName] = useState('');
  const [facility, setFacility] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setFacility('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <section className="contact reusable" id="contact">
      <header className="headings">
        <h3>CONTACT US</h3>
        <h1>Get in Touch with Our Team</h1>
        <p>
          Reach out to discuss supply needs, partnerships, or place a custom order. Available Monday
          – Saturday, 8am – 6pm CST.
        </p>
      </header>

      {/* Contact Form */}
      <div className="contact-form-wrapper" data-aos="fade-up">
        <h3 className="form-section-title">Send Us a Message</h3>
        {!isSubmitted ? (
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Facility / Organisation</label>
                <input
                  type="text"
                  placeholder="Hospital or clinic name"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (000) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea
                placeholder="Tell us about your supply needs, enquiry, or partnership interest..."
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn contact-submit-btn">
              Send Message <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        ) : (
          <div className="contact-success" id="contactSuccess">
            <i className="fa-solid fa-circle-check"></i>
            <p>Message sent! We'll be in touch within 24 hours.</p>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="map" data-aos="fade-up">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6998899.062377542!2d-105.37252707493494!3d31.0699310270131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864070360b823249%3A0x16eb1c8f1808de3c!2sTexas%2C%20USA!5e0!3m2!1sen!2sng!4v1692995711700!5m2!1sen!2sng"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>

      {/* Contact Icons */}
      <div className="contact-icon-container">
        {contactInfoData.map((item, idx) => (
          <div key={idx} className="con-icon-box">
            <div className="con-icon-wrapper">
              <i className={item.icon}></i>
            </div>
            <h4>{item.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
