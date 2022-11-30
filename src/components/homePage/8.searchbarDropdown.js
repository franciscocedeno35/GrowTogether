import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const SearchbarDropdown = (props) => {
	const { options, onInputChange } = props;
	const ulRef = useRef();
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.addEventListener('click', (event) => {
			event.stopPropagation();
			ulRef.current.style.display = 'flex';
		});
		document.addEventListener('click', (event) => {
			ulRef.current.style.display = 'none';
		});
	}, []);
	return (
		<div className="search-bar-dropdown">
			<input
				type="text"
				className="form-control"
				placeholder="      Search for name or category"
				ref={inputRef}
				onChange={onInputChange}
			/>
			<ul className="list-group" ref={ulRef}>
				{options.map((option, index) => {
					return (
						<button
							type="button"
							key={index}
							onClick={(e) => {
								e.preventDefault();
								window.location.href = '/Project';
							}}
							className="list-group-item list-group-item-action">
							{option}
						</button>
					);
				})}
			</ul>
		</div>
	);
};

const defauktOptions = [];
for (let i = 0; i < 10; i++) {
	defauktOptions.push(`technology ${i}`);
	defauktOptions.push(`art ${i}`);
	defauktOptions.push(`sport ${i}`);
}

const SearchbarDropdownMain = () => {
	const [options, setOptions] = useState([]);
	const onInputChange = (event) => {
		setOptions(
			defauktOptions.filter((option) => option.includes(event.target.value))
		);
	};

  return (
    <div className="search-container">
      <SearchbarDropdown options={options} onInputChange={onInputChange} />
    </div>
  );
};

export default SearchbarDropdownMain;
