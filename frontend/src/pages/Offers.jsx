import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { offerApi } from "../api/api";
import "./Offers.css";

import logo from "../assets/logo.png";
import hero from "../assets/home.png";
import Footer from "../components/Footer";

function OfferCard({ offer, onClick }) {
  const getDiscountText = () => {
    if (offer.offerType === "percentage" && offer.discountPercentage) {
      return `${offer.discountPercentage}% OFF`;
    }

    if (offer.offerType === "fixed_amount" && offer.discountAmount) {
      return `LKR ${offer.discountAmount} OFF`;
    }

    if (offer.offerType === "special_package") {
      return "Special Package";
    }

    if (offer.offerType === "seasonal") {
      return "Seasonal Offer";
    }

    if (offer.offerType === "early_bird") {
      return "Early Bird";
    }

    if (offer.offerType === "last_minute") {
      return "Last Minute";
    }

    return "Offer";
  };

  return (
    <div className="offer-card" onClick={onClick}>
      {offer.imageUrl ? (
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className="offer-card-image"
        />
      ) : (
        <div className="offer-card-image-placeholder">No Image</div>
      )}

      <div className="offer-card-body">
        <div className="offer-card-top">
          <span className="offer-type">
            {offer.offerType.replaceAll("_", " ")}
          </span>
          {offer.isFeatured && (
            <span className="offer-featured-badge">Featured</span>
          )}
        </div>

        <h2>{offer.title}</h2>
        <p>{offer.description}</p>

        <div className="offer-discount-box">{getDiscountText()}</div>

        <div className="offer-meta">
          <span>
            Valid: {new Date(offer.validFrom).toLocaleDateString()} -{" "}
            {new Date(offer.validTo).toLocaleDateString()}
          </span>
        </div>

        {offer.code && (
          <div className="offer-code">
            Code: <strong>{offer.code}</strong>
          </div>
        )}

        {offer.applicableRooms?.length > 0 && (
          <div className="offer-rooms">
            Applicable Rooms:{" "}
            {offer.applicableRooms.map((room) => room.roomType).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

function Offers() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOffers = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 6,
      };

      if (selectedType) params.offerType = selectedType;
      if (featuredOnly) params.isFeatured = true;

      const response = await offerApi.getAll(params);

      const offerData = response.data?.data;
      setOffers(offerData?.docs || []);
      setTotalPages(offerData?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [page, selectedType, featuredOnly]);

  const handleResetFilters = () => {
    setSelectedType("");
    setFeaturedOnly(false);
    setPage(1);
  };

  const handleOpenOffer = (offer) => {
    navigate(`/offers/${offer.slug || offer._id}`);
  };

  return (
    <div className="offers-page">
      <section className="offers-hero">
        <img src={hero} alt="Offers" className="offers-hero-bg" />
        <div className="offers-hero-overlay" />

        <header className="offers-top-bar">
          <img src={logo} alt="Logo" className="offers-logo" />
          <button
            className="offers-menu-btn"
            type="button"
            onClick={() => navigate("/menu")}
          >
            &#9776;
          </button>
        </header>

        <div className="offers-hero-content">
          <p>Special deals & exclusive packages</p>
          <h1>Offers</h1>
        </div>
      </section>

      <section className="offers-filter-section">
        <div className="offers-filter-bar">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Offer Types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed_amount">Fixed Amount</option>
            <option value="special_package">Special Package</option>
            <option value="seasonal">Seasonal</option>
            <option value="early_bird">Early Bird</option>
            <option value="last_minute">Last Minute</option>
          </select>

          <label className="offers-featured-toggle">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => {
                setFeaturedOnly(e.target.checked);
                setPage(1);
              }}
            />
            Featured only
          </label>

          <button
            type="button"
            className="offers-reset-btn"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="offers-content">
        {loading ? (
          <div className="offers-empty-state">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="offers-empty-state">No offers found.</div>
        ) : (
          <div className="offers-grid">
            {offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                onClick={() => handleOpenOffer(offer)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="offers-pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Offers;
