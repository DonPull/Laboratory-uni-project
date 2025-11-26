import downArr from '../../public/down.png';
import '/src/styles/Dropdown.css';
import { useState } from "react";

function Dropdown({onOptionSelect, dropDownName, options}) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(dropDownName);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);

        if (onOptionSelect) {
            onOptionSelect(option);
        }
    }

    return (
        <div class="dropdown-container">
            <button class="dropdown-button" onClick={handleToggle}>
                
                <div class="dropdown-selected">
                    {selectedOption}
                </div>

                <div class="img-container">
                    <img src={downArr} alt="" />
                </div>

            </button>

            {isOpen && (
                <div className="dropdown-menu-container">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                   
                </div>
            )}
        </div>
    );
}


export default Dropdown;