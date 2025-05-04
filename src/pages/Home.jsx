import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import { fetchAllCountries, fetchCountriesByRegion, fetchCountryByName } from "../services/api";
//import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import "../styles/hero.css";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [lastViewedCountry, setLastViewedCountry] = useState(null);
  const navigate = useNavigate();

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

    // Retrieve last viewed country from sessionStorage
    const storedCountry = sessionStorage.getItem("lastViewedCountry");
    if (storedCountry) {
      setLastViewedCountry(JSON.parse(storedCountry));
    }
  }, [searchTerm, region]);

  const getCountryData = (geoId) => {
    return countries.find((country) => country.cca3 === geoId);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover the World with GlobeTrekker</h1>
          <p className="hero-subtitle">Hover over a country to see its name, or click to explore details.</p>
        </div>
        {/*<div className="map-container">
          <ComposableMap>
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryData = getCountryData(geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          const name = countryData?.name?.common || geo.properties.name;
                          setTooltipContent(name);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        onClick={() => {
                          if (countryData) {
                            navigate(`/country/${countryData.cca3}`);
                          }
                        }}
                        style={{
                          default: { fill: "#D6D6DA", outline: "none" },
                          hover: { fill: "#facc15", outline: "none", cursor: "pointer" },
                          pressed: { fill: "#eab308", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          {tooltipContent && (
            <div className="tooltip">
              {tooltipContent}
            </div>
          )}
        </div>*/}
      </section>

      <div className="container py-4 mt-5" id="explore">
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
        {lastViewedCountry && (
          <div className="last-viewed">
            <p className="text-center">
              Last viewed country: <strong>{lastViewedCountry.name}</strong>{" "}
              <button
                onClick={() => navigate(`/country/${lastViewedCountry.code}`)}
                className="btn btn-link"
              >
                View Again
              </button>
            </p>
          </div>
        )}
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