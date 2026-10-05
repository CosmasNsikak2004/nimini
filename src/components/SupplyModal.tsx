import React, { useEffect, useState } from 'react';

interface SupplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupplyModal({ isOpen, onClose }: SupplyModalProps) {
  const [fullName, setFullName] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [supplyType, setSupplyType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      onClose();
    }, 3000);

    setTimeout(() => {
      setIsSubmitted(false);
      setFullName('');
      setFacilityName('');
      setEmail('');
      setPhone('');
      setSupplyType('');
      setMessage('');
    }, 3500);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      id="supplyModal"
      onClick={handleOverlayClick}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h2>Request Medical Supplies</h2>
        <p className="modal-sub">
          Fill in the form below and our team will get back to you within 24 hours.
        </p>

        {!isSubmitted ? (
          <form className="modal-form" id="supplyForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Dr. John Smith"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Facility Name *</label>
                <input
                  type="text"
                  placeholder="St. Luke's Hospital"
                  required
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="procurement@facility.com"
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
              <label>Supply Type *</label>
              <select
                required
                value={supplyType}
                onChange={(e) => setSupplyType(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option>Diagnostic Equipment</option>
                <option>Surgical Supplies</option>
                <option>Patient Care Kits</option>
                <option>Lab Equipment</option>
                <option>Mobility &amp; Rehabilitation Aids</option>
                <option>Monitoring Devices</option>
                <option>Sterilisation Tools</option>
                <option>Pharmaceutical Products</option>
                <option>Other / Custom Order</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message / Specifications</label>
              <textarea
                placeholder="Describe your supply needs, quantities, or any urgent requirements..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn modal-submit-btn">
              Submit Request
            </button>
          </form>
        ) : (
          <div className="form-success" id="formSuccess">
            <i className="fa-solid fa-circle-check"></i>
            <h3>Request Submitted!</h3>
            <p>Thank you. Our team will reach out to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
