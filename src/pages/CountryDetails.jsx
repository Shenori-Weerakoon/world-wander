import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCountryByCode } from "../services/api";
import "../styles/CountryDetails.css"; // Import custom CSS

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const loadCountry = async () => {
      const data = await fetchCountryByCode(code);
      setCountry(data[0]);
    };
    loadCountry();
  }, [code]);

  if (!country) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="card border-0 shadow custom-details-card mx-auto">
        <img
          src={country.flags?.svg || "https://via.placeholder.com/150"}
          alt={`${country.name?.common} flag`}
          className="card-img-top custom-details-img"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h2 className="card-title text-dark font-weight-bold mb-4">{country.name?.common || "Unknown"}</h2>
          <p className="card-text">
            <span className="font-weight-bold">Capital:</span> {country.capital || "N/A"}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">Region:</span> {country.region || "N/A"}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">Population:</span> {country.population?.toLocaleString() || "N/A"}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">Languages:</span>{" "}
            {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn custom-details-btn mt-4"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;