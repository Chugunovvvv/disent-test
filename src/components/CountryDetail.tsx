import React, { useState, useEffect } from "react";
import axios from "axios";

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  flags: {
    png: string;
  };
  population: number;
}

interface CountryDetailProps {
  countryName: string;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ countryName }) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (countryName) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          setCountry(response.data[0]);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [countryName]);
  console.log("country", country);
  console.log(country);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{country.name.common}</h1>
      <h2>Capital: {country.capital ? country.capital[0] : "N/A"}</h2>
      <h3>Population: {country.population}</h3>
      <img
        src={country?.flags?.png}
        alt={`Flag of ${country.name.common}`}
        width="100"
      />
    </div>
  );
};

export default CountryDetail;
