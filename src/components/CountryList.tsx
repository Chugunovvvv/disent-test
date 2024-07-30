import React, { useState, useEffect } from "react";
import axios from "axios";

interface Country {
  name: {
    common: string;
  };
  cca3: string;
}

interface CountryListProps {
  onSelectCountry: (countryName: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  console.log("ALL", countries);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return <span>Loading...</span>;
  }
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Countries</h1>
      <div className="list-group">
        {countries.map((country) => (
          <button
            key={country.cca3}
            className="list-group-item list-group-item-action"
            onClick={() => onSelectCountry(country.name.common)}
          >
            {country.name.common}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
