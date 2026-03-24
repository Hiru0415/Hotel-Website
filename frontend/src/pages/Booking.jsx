import "./Booking.css";
import logo from "../assets/logo.png";

function Booking({ onBackToMenu }) {
  return (
    <div className="booking-page">
      <header className="booking-topbar">
        <img src={logo} alt="Logo" className="booking-logo" />
        <button className="booking-menu-btn" onClick={onBackToMenu} type="button">
          &#9776;
        </button>
      </header>

      <main className="booking-main">
        <div className="booking-panel">
          <h2>Contact Details</h2>

          <div className="booking-form-grid">
            <label>Name</label>
            <div className="row two">
              <input placeholder="First Name" />
              <input placeholder="Last Name" />
            </div>

            <label>Mobile Phone</label>
            <div className="row three">
              <input placeholder="Country Code" />
              <input placeholder="Area Code" />
              <input placeholder="Phone Number" />
            </div>

            <label>Email</label>
            <div className="row one">
              <input placeholder="example@example.com" />
            </div>

            <label>Country</label>
            <div className="row one">
              <select>
                <option>Choose country</option>
              </select>
            </div>

            <label>Arrival Time</label>
            <div className="row three arrival-row">
              <span className="inline-text">Hour Minutes</span>
              <input placeholder="HH:MM" />
              <select>
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

            <label>Special Remarks</label>
            <div className="row one">
              <textarea rows="4" />
            </div>
          </div>

          <h2>Booking Details</h2>

          <div className="booking-box">
            <div className="booking-box-row">
              <label>Check-in</label>
              <input type="date" />
            </div>

            <div className="booking-box-row">
              <label>Check-out</label>
              <input type="date" />
            </div>
          </div>

          <div className="booking-box">
            <p className="box-title">Select Preferred Room</p>

            <div className="booking-box-row two-cols">
              <div>
                <label>Rooms</label>
                <select>
                  <option>Select room</option>
                  <option>Super Deluxe Room</option>
                  <option>Deluxe Room</option>
                  <option>Standard Room</option>
                </select>
              </div>

              <div>
                <label>Quantity</label>
                <input type="number" min="1" placeholder="1" />
              </div>
            </div>

            <button className="small-add-btn" type="button">Add Row</button>

            <p className="box-title second">Select Meal Plan</p>

            <div className="booking-box-row two-cols">
              <div>
                <label>Meal Plan</label>
                <select>
                  <option>Select meal plan</option>
                  <option>Breakfast</option>
                  <option>Half Board</option>
                  <option>Full Board</option>
                </select>
              </div>

              <div>
                <label>Guests</label>
                <input type="number" min="1" placeholder="1" />
              </div>
            </div>

            <button className="small-add-btn" type="button">Add Row</button>
          </div>

          <div className="booking-box">
            <div className="booking-box-row">
              <label>Airport Pickup</label>
              <select>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="booking-box-row">
              <label>Airport Drop</label>
              <select>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>

          <div className="submit-wrap">
            <button className="submit-booking-btn" type="button">
              SUBMIT YOUR RESERVATION
            </button>
          </div>
        </div>
      </main>

      <footer className="booking-footer">
        <div className="booking-footer-col booking-footer-brand">
          <img src={logo} alt="Logo" className="booking-footer-logo" />
          <ul>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
            <li>Powered by SLK</li>
            <li>Copyright © 2023 Renuka City Hotel</li>
          </ul>
        </div>

        <div className="booking-footer-col">
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

        <div className="booking-footer-col">
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

        <div className="booking-footer-col">
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

export default Booking;