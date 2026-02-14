import './App.css';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="content">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}

export default App;
