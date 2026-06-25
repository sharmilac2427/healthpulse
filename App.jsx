import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const filteredCountries = countries.filter((item) =>
    item.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>HealthPulse Tracker</h1>

      <input
        type="text"
        placeholder="Search Country..."
        className="search-box"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card-container">
        {filteredCountries.map((country) => (
          <div className="card" key={country.country}>
            <img
              src={country.countryInfo.flag}
              alt={country.country}
              className="flag"
            />

            <h2>{country.country}</h2>

            <p>
              <strong>Cases:</strong> {country.cases}
            </p>

            <p>
              <strong>Recovered:</strong> {country.recovered}
            </p>

            <p>
              <strong>Deaths:</strong> {country.deaths}
            </p>

            <p>
              <strong>Active:</strong> {country.active}
            </p>

            {country.cases > 1000000 && (
              <p className="alert">⚠ High Risk Country</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;