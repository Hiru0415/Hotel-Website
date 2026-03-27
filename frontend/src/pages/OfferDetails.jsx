import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { offerApi } from "../api/api";
import "./OfferDetails.css";

import logo from "../assets/logo.png";
import hero from "../assets/home.png";
import Footer from "../components/Footer";

function OfferDetails() {
  const navigate = useNavigate();
  const { identifier } = useParams();

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await offerApi.getByIdentifier(identifier);
        setOffer(response.data?.data || null);
      } catch (error) {
        console.error("Failed to fetch offer details:", error);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [identifier]);

  const getDiscountText = () => {
    if (!offer) return "";

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
      return "Early Bird Offer";
    }

    if (offer.offerType === "last_minute") {
      return "Last Minute Offer";
    }

    return "Offer";
  };

  return (
    <div className="offer-details-page">
      <section className="offer-details-hero">
        <img
          src={offer?.imageUrl || hero}
          alt={offer?.title || "Offer"}
          className="offer-details-hero-bg"
        />
        <div className="offer-details-hero-overlay" />

        <header className="offer-details-top-bar">
          <img src={logo} alt="Logo" className="offer-details-logo" />
          <button
            className="offer-details-menu-btn"
            type="button"
            onClick={() => navigate("/menu")}
          >
            &#9776;
          </button>
        </header>

        <div className="offer-details-hero-content">
          <p>Exclusive deal</p>
          <h1>{loading ? "Loading..." : offer?.title || "Offer Not Found"}</h1>
        </div>
      </section>

      <section className="offer-details-content">
        {loading ? (
          <div className="offer-details-empty">Loading offer details...</div>
        ) : !offer ? (
          <div className="offer-details-empty">Offer not found.</div>
        ) : (
          <div className="offer-details-card">
            <div className="offer-details-header">
              <div>
                <span className="offer-details-type">
                  {offer.offerType.replaceAll("_", " ")}
                </span>
                {offer.isFeatured && (
                  <span className="offer-details-featured">Featured</span>
                )}
              </div>

              <div className="offer-details-discount">{getDiscountText()}</div>
            </div>

            <h2>{offer.title}</h2>
            <p className="offer-details-description">{offer.description}</p>

            <div className="offer-details-info-grid">
              <div className="offer-details-box">
                <h3>Validity</h3>
                <p>
                  {new Date(offer.validFrom).toLocaleDateString()} -{" "}
                  {new Date(offer.validTo).toLocaleDateString()}
                </p>
              </div>

              <div className="offer-details-box">
                <h3>Status</h3>
                <p>{offer.status}</p>
              </div>

              {offer.code && (
                <div className="offer-details-box">
                  <h3>Offer Code</h3>
                  <p>{offer.code}</p>
                </div>
              )}

              <div className="offer-details-box">
                <h3>Minimum Booking Days</h3>
                <p>{offer.minBookingDays}</p>
              </div>

              {offer.maxBookingDays && (
                <div className="offer-details-box">
                  <h3>Maximum Booking Days</h3>
                  <p>{offer.maxBookingDays}</p>
                </div>
              )}
            </div>

            {offer.applicableRooms?.length > 0 && (
              <div className="offer-details-section">
                <h3>Applicable Rooms</h3>
                <div className="offer-details-room-list">
                  {offer.applicableRooms.map((room) => (
                    <div key={room._id} className="offer-details-room-item">
                      <span>{room.roomType}</span>
                      {room.pricePerNight && (
                        <small>LKR {room.pricePerNight}</small>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="offer-details-section">
              <h3>Terms & Conditions</h3>
              <p>{offer.termsAndConditions}</p>
            </div>

            <div className="offer-details-actions">
              <button type="button" onClick={() => navigate("/offers")}>
                Back to Offers
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default OfferDetails;
