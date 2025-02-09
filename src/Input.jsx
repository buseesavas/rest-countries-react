import { useContext } from "react";
import { DataContext } from "./App";

export default function Input({ setCountry, setRegion }) {
    const { data } = useContext(DataContext);

    const regions = Array.from(new Set(data.map((x) => x.region)));

    function handleChange(e) {
        setCountry(e.target.value.toLowerCase());
    }

    function handleSelectChange(e) {
        setRegion(e.target.value);
    }

    return (
        <>
            <div className="input-area">
                <div className="input">
                    <img src="/img/search-icon.svg" alt="Search Icon" />
                    <input type="text" onChange={handleChange} placeholder="Search for a country..." />
                </div>

                <div className="select-area">
                    <select onChange={handleSelectChange} className="regions">
                        <option value="">Filter by Region</option>
                        {regions.map((x) => <option key={x}>{x}</option>)}
                    </select>
                </div>
            </div>
        </>
    );
}
