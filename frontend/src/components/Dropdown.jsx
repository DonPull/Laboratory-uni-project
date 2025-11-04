import downArr from '../../public/down.png';
import { useState } from "react";

function Dropdown({onOptionSelect}) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select an option");

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
    //Can be externally added options
    const options = ["Option A", "Option B"];

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
                <div class="dropdown-menu-container">
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