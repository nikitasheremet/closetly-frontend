import { useState } from "react";

interface DropdownPropTypes {
  value: string | number | boolean;
  placeholder?: string | number | boolean;
  dropdownData: Array<string | number | boolean>;
  onChange: Function;
}

const Dropdown = ({
  value,
  placeholder = "",
  dropdownData,
  onChange,
}: DropdownPropTypes) => {
  const [dropdownValueSelected, setDropdownValue] = useState(value);
  const [isDropdownOpen, toggleDropdownOpen] = useState(false);

  const handleDropdownValueSelect = (event) => {
    console.log(event);
    setDropdownValue(event.target.textContent);
    onChange(event);
  };
  return (
    <>
      <div
        style={{ border: "1px solid black", borderRadius: "20px" }}
        onClick={() => toggleDropdownOpen(!isDropdownOpen)}
      >
        {dropdownValueSelected || placeholder}
      </div>
      {isDropdownOpen && (
        <div>
          {dropdownData.map((dropdownValue) => {
            return (
              <span
                key={`${dropdownValue}`}
                onClick={handleDropdownValueSelect}
              >
                {dropdownValue}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Dropdown;
