import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ placeholder, data, Change }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.SKU.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={(e)=>{handleFilter(e); Change(e);}}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <i class="fa-solid fa-magnifying-glass"></i>
          ) : (
            <span id="clearBtn" onClick={clearInput}>X</span>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div className="dataItem" onClick={()=>{Change(value.SKU);setWordEntered(value.SKU);}}>
                <p>{value.SKU} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
