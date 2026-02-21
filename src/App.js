import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";
import { News } from "./components/News";
import { Weather } from "./components/Weather";
import { useState } from "react";

function App() {
  const [modal, setModal] = useState(false);
  const [location, setLocation] = useState("Kyiv");
  const [isUserLocation, setIsUserLocation] = useState(false);

  return (
    <div className="app">
      <Header setModal={setModal} />

      <main className="content">
        <Hero setLocation={setLocation} setIsUserLocation={setIsUserLocation} />

        <Weather location={location} isUserLocation={isUserLocation} />

        <News />
        <Gallery />
      </main>

      <Footer />

      <Modal modal={modal} setModal={setModal} />
    </div>
  );
}

export default App;
