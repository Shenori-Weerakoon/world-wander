import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";
import { fetchAllCountries, fetchCountriesByRegion, fetchCountryByName } from "../services/api";
import "../styles/hero.css"; // Import hero styles

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        let data = [];
        if (searchTerm) data = await fetchCountryByName(searchTerm);
        else if (region) data = await fetchCountriesByRegion(region);
        else data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, [searchTerm, region]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover the World</h1>
          <p className="hero-subtitle">Explore countries, cultures, and more with detailed insights.</p>
          <a href="#explore" className="hero-cta">Start Exploring</a>
        </div>
      </section>

      {/* Existing Content */}
      <div className="container py-4 mt-5">
        <h2 className="text-center mb-4 custom-title">Explore Countries</h2>
        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-3">
            <select onChange={(e) => setRegion(e.target.value)} className="form-control">
              <option value="">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && countries.length === 0 && <p className="text-center">No countries found.</p>}
        <div className="row">
          {countries.map((country) => (
            <div key={country.cca3} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;