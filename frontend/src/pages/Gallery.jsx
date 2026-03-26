import "./Gallery.css";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import hero from "../assets/renuka.png";
import dine from "../assets/dine.png";
import facility from "../assets/facility.png";
import meeting from "../assets/meeting.png";
import special from "../assets/special.png";
import pool from "../assets/pool.png";

function GalleryCard({ image, title }) {
  return (
    <div className="gallery-card">
      <img src={image} alt={title} className="gallery-card-image" />
      <div className="gallery-card-body">
        <h3>{title}</h3>
      </div>
      <button type="button" className="gallery-card-btn">
        View
      </button>
    </div>
  );
}

function Gallery({ onBackToMenu, onBookingClick }) {
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

        {/* <div className="gallery-booking-bar">
          <div className="gallery-booking-item">📅 CHECK IN</div>
          <div className="gallery-booking-item">📅 CHECK OUT</div>
          <div className="gallery-booking-item">👥 GUESTS</div>
          <button
            className="gallery-book-now-btn"
            type="button"
            onClick={onBookingClick}
          >
            BOOK NOW
          </button>
        </div> */}
      </section>

      <section className="gallery-content">
        <div className="gallery-grid">
          <GalleryCard image={dine} title="Dine & Drink" />
          <GalleryCard image={facility} title="Facilities" />
          <GalleryCard image={meeting} title="Meetings" />
          <GalleryCard image={special} title="Special Occasion" />
          <GalleryCard image={pool} title="Genaral" />
        </div>
      </section>

      <footer className="gallery-footer">
        <div className="gallery-footer-col gallery-footer-brand">
          <img src={logo} alt="Logo" className="gallery-footer-logo" />
          <ul>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
            <li>Powered by SLK</li>
            <li>Copyright © 2023 Renuka City Hotel</li>
          </ul>
        </div>

        <div className="gallery-footer-col">
          <ul>
            <li>home</li>
            <li>rooms</li>
            <li>• super deluxe room</li>
            <li>• deluxe room</li>
            <li>• standard room</li>
            <li>dine & drink</li>
            <li>• Palmyrah restaurant & bar</li>
            <li>gallery</li>
          </ul>
        </div>

        <div className="gallery-footer-col">
          <ul>
            <li>meetings</li>
            <li>special occasions</li>
            <li>facilities</li>
            <li>Colombo</li>
            <li>offers</li>
            <li>our story</li>
            <li>careers</li>
            <li>blog</li>
            <li>privacy policy</li>
            <li>contact us</li>
          </ul>
        </div>

        <div className="gallery-footer-col">
          <ul>
            <li>328 Galle Road Colombo 3 Sri Lanka</li>
            <li>+94-112573598/602</li>
            <li>+94-112573145/8</li>
            <li>+94-112574137</li>
            <li>+94-112576183</li>
            <li>renukah@renukahotel.com</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Gallery;