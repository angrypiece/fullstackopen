import { useEffect, useState } from "react";
import { baseUrl } from "./constants";

type Languages = Record<string, string>;
type Flags = {
  png?: string;
  svg?: string;
  alt?: string;
};

type Country = {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  area: number;
  languages: Languages;
  flags: Flags;
};

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const startFetch = async () => {
      try {
        const response = await fetch(baseUrl);
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    };

    startFetch();
  }, []);

  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .trim()
      .includes(searchName.toLowerCase().trim());
  });

  const oneCountry = (country: Country) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        {country.capital.map((cap) => (
          <p>{cap}</p>
        ))}
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([code, lang]) => (
            <li key={code}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.svg} />
      </>
    );
  };

  return (
    <div>
      <p>
        find countries{" "}
        <input
          type="text"
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
        />
      </p>
      {filteredCountries.length === 1 && oneCountry(filteredCountries[0])}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map((country) => {
            return <li key={country.name.common}>{country.name.common}</li>;
          })}
        </ul>
      )}
      {filteredCountries.length > 10 && searchName && (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
