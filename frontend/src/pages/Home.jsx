import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SectionCard from "../components/SectionCard";
import Footer from "../components/Footer";

import hero from "../assets/home.png";
import logo from "../assets/logo.png";
import building from "../assets/Building.png";
import rooms from "../assets/rooms.png";
import pool from "../assets/pool.png";
import food from "../assets/food.png";
import flower from "../assets/flower.png";
import meeting from "../assets/meeting.png";

function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const getTomorrow = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    navigate("/rooms", { state: { checkIn, checkOut, guests } });
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <img src={hero} alt="Renuka City Hotel" className="hero-bg" />
        <div className="hero-overlay" />

        <header className="top-bar">
          <img src={logo} alt="Logo" className="logo" />
          <button
            className="menu-btn"
            aria-label="menu"
            onClick={() => navigate("/menu")}
          >
            &#9776;
          </button>
        </header>

        <div className="hero-content">
          <p className="hero-subtitle">In the heart of Colombo city</p>
          <h1>RENUKA CITY HOTEL</h1>
        </div>

        <div className="booking-bar">
          <div
            className="booking-item"
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0 20px",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#666",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              CHECK IN
            </span>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                const newCheckIn = e.target.value;
                setCheckIn(newCheckIn);

                if (checkOut && checkOut <= newCheckIn) {
                  setCheckOut("");
                }
              }}
              style={{
                padding: "0",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#111",
                fontSize: "1rem",
                width: "100%",
                cursor: "pointer",
                marginTop: "4px",
              }}
            />
          </div>

          <div
            className="booking-item"
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0 20px",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#666",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              CHECK OUT
            </span>
            <input
              type="date"
              min={checkIn ? getTomorrow(checkIn) : today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={{
                padding: "0",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#111",
                fontSize: "1rem",
                width: "100%",
                cursor: "pointer",
                marginTop: "4px",
              }}
            />
          </div>

          <div
            className="booking-item"
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0 20px",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#666",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              GUESTS
            </span>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              style={{
                padding: "0",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#111",
                fontSize: "1rem",
                width: "100%",
                cursor: "pointer",
                marginTop: "4px",
              }}
            />
          </div>

          <button className="book-now-btn" onClick={handleSearch}>
            BOOK NOW
          </button>
        </div>
      </section>

      <section className="intro-section">
        <div className="intro-card">
          <img src={building} alt="Hotel Building" className="intro-image" />
          <p>
            Centrally located, Renuka City Hotel is perfect for business
            travellers seeking world-class service and modern amenities.
            Experience the ultimate in hospitality with our stylish
            accommodation and authentic Sri Lankan cuisine at our fine dining
            restaurant.
          </p>
        </div>
      </section>

      <SectionCard
        image={rooms}
        title="Rooms with modern amenities & facilities"
        onButtonClick={() => navigate("/rooms")}
      />

      <SectionCard
        image={pool}
        title="Infinity pool (open till 10pm)"
        smallText
        showButton={false}
      />

      <SectionCard
        image={food}
        title="Authentic SriLankan cuisine"
        onButtonClick={() => navigate("/dine")}
      />

      <SectionCard
        image={flower}
        title="An ideal venue for any special occasions banquets, weddings oe cocktail party"
        light
        reverse
        onButtonClick={() => navigate("/special")}
      />

      <SectionCard
        image={meeting}
        title="Workshops seminars meetings & conferences"
        onButtonClick={() => navigate("/meetings")}
      />

      <section className="spacer-section" />

      <Footer />
    </div>
  );
}

export default Home;