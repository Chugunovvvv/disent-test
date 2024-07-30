import React, { useState } from "react";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <CountryList onSelectCountry={setSelectedCountry} />
          </div>
          <div className="col-md-6">
            {selectedCountry && <CountryDetail countryName={selectedCountry} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
