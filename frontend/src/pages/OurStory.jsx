import "./OurStory.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import logo from "../assets/logo.png";
import hero from "../assets/home.png";
import building from "../assets/Building.png";
import meeting from "../assets/meeting.png";

function DirectorCard({ name, role }) {
  return (
    <div className="director-card">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

function OurStory() {
  const navigate = useNavigate();

  return (
    <div className="ourstory-page">
      <section className="ourstory-hero">
        <img src={hero} alt="Our Story" className="ourstory-hero-bg" />
        <div className="ourstory-hero-overlay" />

        <header className="ourstory-top-bar">
          <img src={logo} alt="Logo" className="ourstory-logo" />
          <button
            className="ourstory-menu-btn"
            aria-label="Back to menu"
            onClick={() => navigate("/menu")}
            type="button"
          >
            &#9776;
          </button>
        </header>

        <div className="ourstory-hero-content">
          <p>Legacy, vision and leadership</p>
          <h1>Our Story</h1>
        </div>
      </section>

      <section className="ourstory-section">
        <div className="ourstory-grid">
          <div className="ourstory-image-wrap">
            <img src={building} alt="Hotel history" className="ourstory-image" />
          </div>

          <div className="ourstory-text">
            <h2>The Beginning of Hotel Renuka</h2>
            <p>
              The late Mr. A.L. Thambiayah, who represented Kayts in Sri
              Lanka’s first two parliaments between 1947 and 1956, was chairman
              of Cargills and Millers as well as Cargo Boat Dispatch Company
              Limited. He is credited with the vision that saw the birth of
              Hotel Renuka.
            </p>
            <p>
              A.L. Thambiayah saw strong prospects in the hotel industry when
              development incentives were offered in 1970 and decided to embark
              on setting up a star-class city hotel on family property in Galle
              Road, Kollupitiya.
            </p>
          </div>
        </div>
      </section>

      <section className="ourstory-section alt">
        <div className="ourstory-grid reverse">
          <div className="ourstory-image-wrap">
            <img src={meeting} alt="Growth of the hotel" className="ourstory-image" />
          </div>

          <div className="ourstory-text">
            <h2>Growth Through Generations</h2>
            <p>
              He sent his younger son, Ravi, for training at the Royal
              Lancaster in London. Ravi returned to Colombo and took over the
              management of Hotel Renuka in June 1972, when the first hotel was
              commissioned.
            </p>
            <p>
              Renuka City Hotel was built on the adjacent property in 1995 under
              the auspices of a quoted company. Ravi Thambiayah later passed on
              leadership responsibilities to the next generation, continuing the
              family legacy in hospitality.
            </p>
          </div>
        </div>
      </section>

      <section className="milestone-section">
        <h2>Milestones</h2>
        <div className="milestone-grid">
          <div className="milestone-card">
            <span className="year">1970</span>
            <p>Vision for a star-class city hotel was established.</p>
          </div>
          <div className="milestone-card">
            <span className="year">1972</span>
            <p>Hotel Renuka began operations under family leadership.</p>
          </div>
          <div className="milestone-card">
            <span className="year">1995</span>
            <p>Renuka City Hotel was built on the adjacent property.</p>
          </div>
          <div className="milestone-card">
            <span className="year">Today</span>
            <p>The legacy continues with modern hospitality and family values.</p>
          </div>
        </div>
      </section>

      <section className="directors-section">
        <div className="section-heading">
          <p>Leadership</p>
          <h2>Executive and Non-Executive Directors</h2>
        </div>

        <div className="directors-grid">
          <DirectorCard
            name="Mr. R. B. Thambiayah"
            role="Chairman – Renuka City Hotels PLC / Director – Renuka Hotels PLC"
          />
          <DirectorCard
            name="Ms. S. R. Thambiayah"
            role="Chairperson / Jt. Managing Director – Renuka Hotels PLC / Jt. Managing Director – Renuka City Hotels PLC"
          />
          <DirectorCard
            name="Mrs. N. A. Thambiayah"
            role="Deputy Chairman – Renuka City Hotels PLC & Renuka Hotels PLC"
          />
          <DirectorCard
            name="Ms. A. L. Thambiayah"
            role="Jt. Managing Director – Renuka City Hotels PLC & Renuka Hotels PLC"
          />
          <DirectorCard
            name="Mrs. M. A. Jayawardena"
            role="Director – Renuka City Hotels PLC"
          />
          <DirectorCard
            name="Ms. N. R. Thambiayah"
            role="Director – Renuka City Hotels PLC & Renuka Hotels PLC"
          />
          <DirectorCard
            name="Mr. M. J Fernando"
            role="Director – Renuka Hotels PLC"
          />
          <DirectorCard
            name="Mr. T. Dharmarajah"
            role="Director – Renuka City Hotels PLC"
          />
          <DirectorCard
            name="Mr. P. M. B. Fernando"
            role="Director – Renuka Hotels PLC"
          />
          <DirectorCard
            name="Mr. C. V. Cabraal"
            role="Director – Renuka City Hotels PLC"
          />
          <DirectorCard
            name="Mrs. S. M. A. N. Ranaweera"
            role="Director – Renuka Hotels PLC"
          />
          <DirectorCard
            name="Dr. D. Senathirajah"
            role="Director – Renuka City Hotels PLC"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OurStory;