import { createContext, useContext, useState, useRef, useEffect } from "react";
import { data } from "./data.js";
import "./app.css";
import "./reset.css";

const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("light");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const className = "container-" + theme;

  function changePage(id) {
    setSelectedCountry(id);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={className}>
        <div className="header">
          <h3>Where in the world?</h3>
          <div
            className="themeSelection"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              className="darkModeIcon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>
            <span>Dark Mode</span>
          </div>
        </div>

        {selectedCountry ? (
          <Detail id={selectedCountry} changePage={changePage} />
        ) : (
          <>
            <Input setCountry={setCountry} setRegion={setRegion} />
            <div className="countriesBox">
              {data
                .filter(
                  (x) =>
                    x.name.common.toLowerCase().includes(country) &&
                    x.region.includes(region)
                )
                .map((x) => (
                  <Card
                    key={x.name.common}
                    name={x.name.common}
                    population={x.population}
                    region={x.region}
                    capital={x.capital}
                    flagUrl={x.flags.svg}
                    nativeName={x.name.nativeName?.nld?.common || "N/A"}
                    tld={x.tld?.join(", ") || "N/A"}
                    languages={
                      x.languages
                        ? Object.values(x.languages).join(", ")
                        : "N/A"
                    }
                    onClick={() => changePage(x.name.common)}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </ThemeContext.Provider>
  );
}

function Card({
  name,
  population,
  region,
  capital,
  flagUrl,
  onClick,
  nativeName,
}) {
  capital = Array.isArray(capital) ? capital.join(", ") : capital;
  return (
    <div className="countryCard" onClick={onClick}>
      <img src={flagUrl} alt={name} />
      <div className="cardText">
        <h5 className="countryName">{name}</h5>

        <p>
          Population: <span>{population}</span>
        </p>
        <p>
          Region: <span>{region}</span>
        </p>
        <p>
          Capital: <span>{capital}</span>
        </p>
      </div>
    </div>
  );
}

// function CountriesBox() {
//   return (
//     <div className="countriesBox">
//       {
//         data.map((x) => (
//           <div key={x.name.common}>
//             <CountryCardItem name={x.name.common} imageUrl={x.flags.svg} population={x.population} region={x.region} capital={x.capital} />
//           </div>
//         ))
//       }
//     </div>
//   )
// }

// function CountryCardItem( {name, imageUrl, population, region, capital}) {
//   return (
//     <div className="countryCard">
//       <img src={imageUrl} alt=""/>
//       <div className="cardText">
//         <h5 className="countryName">{name}</h5>
//         <p>Population: <span>{population}</span></p>
//         <p>Region: <span>{region}</span></p>
//         <p>Capital: <span>{capital}</span></p>
//       </div>
//     </div>
//   )
// }

function Input({ setCountry, setRegion }) {
  function handleChange(e) {
    setCountry(e.target.value.toLowerCase());
  }

  return (
    <div className="inputBoxes">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for a country…"
          className="custom-input"
          onChange={handleChange} // Filtreleme için gerekli
        />
      </div>
      <Dropdown
        options={[
          "Antarctic",
          "Americas",
          "Europe",
          "Africa",
          "Asia",
          "Oceania",
        ]}
        setRegion={setRegion} // Bölgeyi üst bileşene ilet
      />
    </div>
  );
}

function Detail({ id, changePage }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const countryDetail = data.find((country) => country.name.common === id);
    setContent(countryDetail);
  }, [id]);

  if (!content) return <p>Loading...</p>;

  return (
    <div className="container">
      <button className="backBtn" onClick={() => changePage(null)}>
        <svg
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.81802 0.696699L6.87868 1.75736L3.3785 5.25754H16.7428L16.7428 6.74246H3.3785L6.87868 10.2426L5.81802 11.3033L0.514719 6L5.81802 0.696699Z"
            fill="currentColor"
          />
        </svg>
        Back
      </button>
      <img
        className="flagImg"
        src={content.flags.svg}
        alt={content.name.common}
      />
      <h2>{content.name.common}</h2>
      <p>
        Native Name: <span>{content.nativeName}</span>
      </p>
      <p>
        Population: <span>{content.population}</span>
      </p>
      <p>
        Region: <span>{content.region}</span>
      </p>
      <p>
        Sub Region: <span>{content.subregion}</span>
      </p>
      <p>
        Capital: <span>{content.capital}</span>
      </p>
      <p>
        Top Level Domain: <span>{content.tld}</span>
      </p>
      <p>
        Currencies:{" "}
        <span>
          {content.currencies
            ? Object.values(content.currencies)
                .map((c) => `${c.name}`)
                .join(", ")
            : "N/A"}
        </span>
      </p>
      <p>
        Languages:{" "}
        <span>
          {content.languages
            ? Object.values(content.languages).join(", ")
            : "N/A"}
        </span>
      </p>
    </div>
  );
}

const Dropdown = ({ options, setRegion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter by Region");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setRegion(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption}{" "}
        <span className="arrow">
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.875 0.875L4 3.75L1.125 0.875L0.25 1.75L4 5.5L7.75 1.75L6.875 0.875Z"
              fill="black"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
