import "./Menu.css";

import rooms from "../assets/rooms.png";
import meeting from "../assets/meeting.png";
import dine from "../assets/dine.png";
import special from "../assets/special.png";
import gallery from "../assets/gallery.png";
import facility from "../assets/facility.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function MenuCard({ image, title, lines = [], onView }) {
  return (
    <div className="menu-card">
      <img src={image} alt={title} className="menu-card-image" />
      <div className="menu-card-overlay"></div>

      <div className="menu-card-content">
        <h2>{title}</h2>

        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        <button type="button" onClick={onView}>
          View
        </button>
      </div>
    </div>
  );
}

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <nav className="menu-topbar">
        <div className="menu-links">
          <Link to="/colombo">Colombo</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/our-story">Our story</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <button
          className="menu-icon-btn"
          aria-label="Close menu"
          onClick={() => navigate("/")}
          type="button"
        >
          &#9776;
        </button>
      </nav>

      <section className="menu-grid-section">
        <div className="menu-grid">
          <MenuCard
            image={rooms}
            title="Rooms"
            lines={["super deluxe", "deluxe", "standard"]}
            onView={() => navigate("/rooms")}
          />
          <MenuCard
            image={meeting}
            title="Meetings"
            onView={() => navigate("/meetings")}
          />
          <MenuCard
            image={dine}
            title="Dine & Drink"
            lines={["Palmyrah", "restaurant", "& bar"]}
            onView={() => navigate("/dine")}
          />
          <MenuCard
            image={special}
            title="Special Occasion"
            onView={() => navigate("/special")}
          />
          <MenuCard
            image={gallery}
            title="Gallery"
            onView={() => navigate("/gallery")}
          />
          <MenuCard
            image={facility}
            title="Facilities"
            onView={() => navigate("/facilities")}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Menu;