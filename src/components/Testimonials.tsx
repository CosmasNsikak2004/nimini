import { useEffect, useRef, useState } from 'react';
import { testimonialsData } from '../data/siteData';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerView = windowWidth < 768 ? 1 : 2;
  const showNav = windowWidth >= 600;
  const totalSlides = testimonialsData.length;
  const maxIndex = totalSlides - itemsPerView;

  // Autoplay timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const slideWidthPercent = 100 / itemsPerView;
  const translateX = -(currentIndex * slideWidthPercent);

  // Number of dots
  const numDots = Math.ceil(totalSlides / itemsPerView);
  const activeDotIndex = Math.min(Math.floor(currentIndex / itemsPerView), numDots - 1);

  return (
    <section
      className="testimonials reusable"
      id="testimonial"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <header className="headings">
        <h3>TESTIMONIALS</h3>
        <h1>Trusted by healthcare professionals nationwide</h1>
        <p>
          Don't take our word for it, hear what the professionals who rely on us every day have to
          say.
        </p>
      </header>

      <div className="testimonials-container">
        <div className="testimonials-slider-wrapper">
          <div
            className="testimonials-track"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="testimonial-slide item testimonial-card"
                style={{ width: `${slideWidthPercent}%` }}
              >
                <main className="test-card-body">
                  <p>{item.quote}</p>
                  <div className="profile">
                    <div className="profile-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="profile-desc">
                      <span>{item.name}</span>
                      <span>{item.role}</span>
                    </div>
                  </div>
                  <div className="quote">
                    <i className="fa fa-quote-right"></i>
                  </div>
                </main>
              </div>
            ))}
          </div>
        </div>

        {showNav && (
          <div className="owl-nav">
            <button
              type="button"
              className="owl-prev"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              type="button"
              className="owl-next"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}

        <div className="owl-dots">
          {Array.from({ length: numDots }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`owl-dot ${dotIdx === activeDotIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(Math.min(dotIdx * itemsPerView, maxIndex))}
              aria-label={`Go to slide ${dotIdx + 1}`}
            >
              <span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
