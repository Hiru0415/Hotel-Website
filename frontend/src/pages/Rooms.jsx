import "./Rooms.css";

import logo from "../assets/logo.png";
import heroRoom from "../assets/rooms.png";
import superDeluxe from "../assets/SuperDeluxeroom.png";
import deluxeRoom from "../assets/deluxeroom.png";
import standardRoom from "../assets/StandardRoom.png";

function RoomInfoCard({ image, title, description, onBookingClick }) {
  return (
    <section className="room-info-card">
      <div className="room-info-image-wrap">
        <img src={image} alt={title} className="room-info-image" />
      </div>

      <div className="room-info-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <button type="button" onClick={onBookingClick}>
          BOOK NOW
        </button>
      </div>
    </section>
  );
}

function AmenityItem({ text }) {
  return (
    <div className="amenity-item">
      <div className="amenity-icon">•</div>
      <span>{text}</span>
    </div>
  );
}

function Rooms({ onBackToMenu, onBookingClick }) {
  const roomDescription =
    "Combining elegant decor with modern amenities, all our rooms feature free Wi-Fi, satellite TV and 24-hour room service. Relax in our contemporary ambience and enjoy spectacular Indian Ocean sunsets from our ocean view rooms. Interconnecting family rooms and disabled accessible rooms are available. Choose from our Super Deluxe, Deluxe and Standard room selections for your stay. A ground floor smoking lounge is available for your convenience.";

  return (
    <div className="rooms-page">
      <section className="rooms-hero">
        <img src={heroRoom} alt="Our Rooms" className="rooms-hero-bg" />
        <div className="rooms-hero-overlay"></div>

        <header className="rooms-top-bar">
          <img src={logo} alt="Logo" className="rooms-logo" />

          <button
            className="rooms-menu-btn"
            aria-label="Back to menu"
            onClick={onBackToMenu}
            type="button"
          >
            &#9776;
          </button>
        </header>

        <div className="rooms-hero-content">
          <h1>Our Rooms</h1>
        </div>

        <div className="rooms-booking-bar">
          <div className="rooms-booking-item">📅 CHECK IN</div>
          <div className="rooms-booking-item">📅 CHECK OUT</div>
          <div className="rooms-booking-item">👥 GUESTS</div>
          <button className="rooms-book-now-btn" type="button">
            BOOK NOW
          </button>
        </div>
      </section>

      <section className="rooms-content">
        <RoomInfoCard
          image={superDeluxe}
          title="Super Deluxe Room"
          description={roomDescription}
          onBookingClick={onBookingClick}
        />

        <RoomInfoCard
          image={deluxeRoom}
          title="Deluxe Room"
          description={roomDescription}
          onBookingClick={onBookingClick}
        />

        <RoomInfoCard
          image={standardRoom}
          title="Standard Room"
          description={roomDescription}
          onBookingClick={onBookingClick}
        />

        <section className="amenities-section">
          <h2>Amenities</h2>

          <div className="amenities-grid">
            <AmenityItem text="Satellite Television" />
            <AmenityItem text="In-room tea / coffee" />
            <AmenityItem text="In-room safe" />
            <AmenityItem text="IDD telephone" />
            <AmenityItem text="Mini fridge" />
            <AmenityItem text="Free Wi-Fi" />
            <AmenityItem text="Bath amenities" />
            <AmenityItem text="Hot & cold shower" />
            <AmenityItem text="Air conditioned" />
            <AmenityItem text="24-hour room service" />
            <AmenityItem text="In-room hair dryer" />
            <AmenityItem text="Free mineral water" />
            <AmenityItem text="Free newspaper" />
            <AmenityItem text="Iron & ironing board" />
            <AmenityItem text="Media hubs" />
          </div>
        </section>
      </section>

      <footer className="rooms-footer">
        <div className="rooms-footer-col rooms-footer-brand">
          <img src={logo} alt="Logo" className="rooms-footer-logo" />
          <ul>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
            <li>Powered by SLK</li>
            <li>Copyright © 2023 Renuka City Hotel</li>
          </ul>
        </div>

        <div className="rooms-footer-col">
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

        <div className="rooms-footer-col">
          <ul>
            <li>meetings</li>
            <li>special occasions</li>
            <li>facilities</li>
            <li>Colombo</li>
            <li>offers</li>
            <li>our story</li>
            <li>careers</li>
            <li>blogs</li>
            <li>privacy policy</li>
            <li>contact us</li>
          </ul>
        </div>

        <div className="rooms-footer-col">
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

export default Rooms;