import { useState } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import DineDrink from "./pages/DineDrink";
import Gallery from "./pages/Gallery";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  if (currentPage === "menu") {
    return (
      <Menu
        onClose={() => setCurrentPage("home")}
        onRoomsClick={() => setCurrentPage("rooms")}
        onBookingClick={() => setCurrentPage("booking")}
        onDineClick={() => setCurrentPage("dine")}
        onGalleryClick={() => setCurrentPage("gallery")}
      />
    );
  }

  if (currentPage === "rooms") {
    return (
      <Rooms
        onBackToMenu={() => setCurrentPage("menu")}
        onBookingClick={() => setCurrentPage("booking")}
      />
    );
  }
  if (currentPage === "dine") {
    return (
      <DineDrink
        onBackToMenu={() => setCurrentPage("menu")}
        onBookingClick={() => setCurrentPage("booking")}
      />
    );
  }

  if (currentPage === "gallery") {
  return (
    <Gallery
      onBackToMenu={() => setCurrentPage("menu")}
      onBookingClick={() => setCurrentPage("booking")}
    />
  );
}

  if (currentPage === "booking") {
    return <Booking onBackToMenu={() => setCurrentPage("menu")} />;
  }

  return (
    <Home
      onOpenMenu={() => setCurrentPage("menu")}
      onBookingClick={() => setCurrentPage("booking")}
    />
  );
}

export default App;