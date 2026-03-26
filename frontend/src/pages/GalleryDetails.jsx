import "./GalleryDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

import hero from "../assets/home.png";
import logo from "../assets/logo.png";

import dine1 from "../assets/dine1.png";
import dine2 from "../assets/dine2.png";
import dine3 from "../assets/dine3.png";
import dine4 from "../assets/dine4.png";

import facility1 from "../assets/facility1.png";
import meeting1 from "../assets/meeting.png";
import special1 from "../assets/special.png";
import general1 from "../assets/general1.png";

const galleryData = {
  dine: {
    title: "Dine & Drink",
    images: [dine1, dine2, dine3, dine4],
  },
  facilities: {
    title: "Facilities",
    images: [facility1],
  },
  meetings: {
    title: "Meetings",
    images: [meeting1],
  },
  special: {
    title: "Special Occasion",
    images: [special1],
  },
  general: {
    title: "General",
    images: [general1],
  },
};

function GalleryDetails() {
  const navigate = useNavigate();
  const { category } = useParams();
  const selectedGallery = galleryData[category];

  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!selectedGallery) {
    return <div>Gallery category not found.</div>;
  }

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? selectedGallery.images.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === selectedGallery.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="gallery-details-page">
      <section className="gallery-details-hero">
        <img
          src={hero}
          alt={selectedGallery.title}
          className="gallery-details-hero-bg"
        />
        <div className="gallery-details-hero-overlay" />

        <header className="gallery-details-top-bar">
          <img src={logo} alt="Logo" className="gallery-details-logo" />
          <button
            className="gallery-details-menu-btn"
            aria-label="Back to gallery"
            onClick={() => navigate("/gallery")}
            type="button"
          >
            &#9776;
          </button>
        </header>

        <div className="gallery-details-hero-content">
          <h1>{selectedGallery.title}</h1>
        </div>
      </section>

      <section className="gallery-details-content">
        <div className="gallery-details-grid">
          {selectedGallery.images.map((image, index) => (
            <div
              key={index}
              className="gallery-details-card"
              onClick={() => openLightbox(index)}
            >
              <img src={image} alt={`${selectedGallery.title} ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {selectedIndex !== null && (
        <div className="lightbox-overlay">
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>

          <button className="lightbox-arrow left" onClick={showPrev}>
            ‹
          </button>

          <div className="lightbox-content">
            <img
              src={selectedGallery.images[selectedIndex]}
              alt={`${selectedGallery.title} ${selectedIndex + 1}`}
              className="lightbox-main-image"
            />

            <div className="lightbox-thumbnails">
              {selectedGallery.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`lightbox-thumb ${
                    selectedIndex === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>

          <button className="lightbox-arrow right" onClick={showNext}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default GalleryDetails;