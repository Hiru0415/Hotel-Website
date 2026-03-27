import "./Gallery.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import logo from "../assets/logo.png";
import hero from "../assets/renuka.png";
import dine from "../assets/dine.png";
import facility from "../assets/facility.png";
import meeting from "../assets/meeting.png";
import special from "../assets/special.png";
import pool from "../assets/pool.png";

function GalleryCard({ image, title, onView }) {
  return (
    <div className="gallery-card">
      <img src={image} alt={title} className="gallery-card-image" />
      <div className="gallery-card-body">
        <h3>{title}</h3>
      </div>
      <button type="button" className="gallery-card-btn" onClick={onView}>
        View
      </button>
    </div>
  );
}

function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <img src={hero} alt="Gallery" className="gallery-hero-bg" />
        <div className="gallery-hero-overlay" />

        <header className="gallery-top-bar">
          <img src={logo} alt="Logo" className="gallery-logo" />

          <button
            className="gallery-menu-btn"
            aria-label="Back to menu"
            onClick={() => navigate("/menu")}
            type="button"
          >
            &#9776;
          </button>
        </header>

        <div className="gallery-hero-content">
          <h1>Gallery</h1>
        </div>
      </section>

      <section className="gallery-content">
        <div className="gallery-grid">
          <GalleryCard
            image={dine}
            title="Dine & Drink"
            onView={() => navigate("/gallery/dine")}
          />
          <GalleryCard
            image={facility}
            title="Facilities"
            onView={() => navigate("/gallery/facilities")}
          />
          <GalleryCard
            image={meeting}
            title="Meetings"
            onView={() => navigate("/gallery/meetings")}
          />
          <GalleryCard
            image={special}
            title="Special Occasion"
            onView={() => navigate("/gallery/special")}
          />
          <GalleryCard
            image={pool}
            title="General"
            onView={() => navigate("/gallery/general")}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Gallery;