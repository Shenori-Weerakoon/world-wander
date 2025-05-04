import { Link } from "react-router-dom";
import "../styles/countryCard.css"; // Import custom CSS

const CountryCard = ({ country }) => {
  return (
    <div className="card bg-light border-0 custom-card">
      <img src={country.flags?.svg || "https://via.placeholder.com/150"} alt={`${country.name?.common} flag`} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
      <div className="card-body">
        <h5 className="card-title text-dark font-weight-bold">{country.name?.common || "Unknown"}</h5>
        <p className="card-text text-muted">Population: {country.population?.toLocaleString() || "N/A"}</p>
        <Link to={`/country/${country.cca3}`} className="btn btn-primary custom-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;