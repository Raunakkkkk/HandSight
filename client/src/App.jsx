import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Translator from "./components/Translator";
import HowItWorks from "./components/HowItWorks";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translator" element={<Translator />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>© {new Date().getFullYear()} HandSight. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
