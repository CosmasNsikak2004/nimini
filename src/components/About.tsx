import { statsData } from '../data/siteData';

export function About() {
  return (
    <section className="about" id="about">
      <div className="about-image">
        <div className="abt-image">
          <div className="image-grid abt-grid">
            <img
              className="image-grid-col-2 image-grid-row-2 g-1"
              src="/assets/abt-grid (1).jpg"
              alt="Our team"
            />
            <img className="g-2" src="/assets/abt-grid (3).jpg" alt="Healthcare facility" />
            <img className="g-3" src="/assets/abt-grid (2).jpg" alt="Medical distribution" />
          </div>
        </div>
      </div>

      <div className="about-desc">
        <h3>OUR COMPANY</h3>
        <h2>
          NIMINI Company began as a long-term care pharmacy, run and owned by a tight-knit family
          known for unmatched service.
        </h2>
        <p>
          As time progressed, we underwent transformation and growth, now encompassing the
          distribution of medical supplies to both national chains and independent healthcare
          facilities such as skilled nursing centers, rehabilitation units, home care services,
          hospices, medical practitioners, hospitals, retail DME outlets, veterinarians, dialysis and
          surgery centers, as well as smaller medical supply distributors.
          <br />
          <br />
          This expansion marks not only the breadth of our reach, but also the depth of our
          commitment to providing essential healthcare solutions. Through each partnership we've
          forged and every facility we've supported, our values of excellence, reliability, and
          personalised care have remained unwavering.
        </p>
        <div className="about-stats">
          {statsData.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <span className="stat-num">{stat.num}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
