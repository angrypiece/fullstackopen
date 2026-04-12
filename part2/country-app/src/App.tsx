import { useEffect, useState } from "react";
import { countryAPIBaseURL, weatherAPIBaseURL } from "./constants";
import { getCondition } from "./weatherConditions";

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

type Weather = {
  current: {
    cloud: number;
    condition: { text: string; icon: string; code: number };
    wind_kph: number;
    temp_c: number;
  };
};

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchName, setSearchName] = useState("");
  const [weatherData, setWeatherData] = useState<Weather | null>(null);

  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .trim()
      .includes(searchName.toLowerCase().trim());
  });

  const selectedCountry =
    filteredCountries.length === 1 ? filteredCountries[0] : null;

  useEffect(() => {
    const startFetch = async () => {
      try {
        const response = await fetch(countryAPIBaseURL);
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

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchWeatherData = async () => {
      try {
        const apikey = import.meta.env.VITE_WEATHER_API_KEY;

        const response = await fetch(
          `${weatherAPIBaseURL}/current.json?key=${apikey}&q=${selectedCountry.capital}`,
        );

        if (!response.ok) throw new Error("Failed fetching weather");

        const resData = (await response.json()) as Weather;
        setWeatherData(resData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchWeatherData();
  }, [selectedCountry]);

  const oneCountry = (country: Country) => {
    const condition = weatherData
      ? getCondition(weatherData.current.condition.code)
      : undefined;

    return (
      <>
        <h1>{country.name.common}</h1>
        {country.capital.map((cap) => (
          <p key={cap}>{cap}</p>
        ))}
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([code, lang]) => (
            <li key={code}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h1>Weahter in {country.capital}</h1>
        {weatherData ? (
          <>
            <p>Temperature {weatherData?.current.temp_c} °C</p>
            <img
              src={`https:${weatherData?.current.condition.icon}`}
              alt={condition?.day}
            />
            <p>Wind {weatherData?.current.wind_kph} km/h</p>
          </>
        ) : (
          <p>Loading weather...</p>
        )}
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
            return (
              <li key={country.name.common}>
                {country.name.common}{" "}
                <button onClick={() => setSearchName(country.name.common)}>
                  show
                </button>
              </li>
            );
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
