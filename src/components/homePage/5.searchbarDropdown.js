import React, { useEffect, useRef, useState } from "react";
import { Get } from "../../scripts";
import "./style.css";

const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      ulRef.current.style.display = "flex";
    });
    document.addEventListener("click", (event) => {
      if (ulRef.current) {
        ulRef.current.style.display = "none";
      }
    });
  }, []);
  return (
    <div className="search-bar-dropdown">
      <input type="text" className="form-control" placeholder="      Search for name or category" ref={inputRef} onChange={onInputChange} />
      <ul className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/Campaign/${option._id}`;
              }}
              className="list-group-item list-group-item-action"
            >
              {option.title}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

const defaultOptions = [];
Get(`/publishedCampaigns/searchOptions`, {}).then((result) => {
  result.forEach((blah) => {
    defaultOptions.push(blah);
  });
});

const SearchbarDropdownMain = () => {
  const [options, setOptions] = useState([]);
  const onInputChange = (event) => {
    setOptions(
      defaultOptions.filter((option) => {
        return option.title.includes(event.target.value) || option.subtitle.includes(event.target.value) || option.description.includes(event.target.value);
      })
    );
  };

  return (
    <div className="search-container">
      <SearchbarDropdown options={options} onInputChange={onInputChange} />
    </div>
  );
};

export default SearchbarDropdownMain;
