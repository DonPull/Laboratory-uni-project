import React, { useState } from 'react';
import searchIcon from '../../public/search.png';
import '../styles/NavBarSearch.css';

function NavBarSearch({ data = [], onResults }) {
    const [searchQuery, setSearchQuery] = useState('');

    const onSearch = (query) => {
        setSearchQuery(query);

        if (!query) {
            if (typeof onResults === 'function') onResults(data);
            return;
        }

        const q = query.toLowerCase();

        const filtered = (data || []).filter(item =>
            (item.patientName && item.patientName.toLowerCase().includes(q)) ||
            (item.doctorName && item.doctorName.toLowerCase().includes(q))
        );

        if (typeof onResults === 'function') onResults(filtered);
    }

    return (
        <div className='outer-search-container'>
            <div className="search-popup" />
            <div className="search-container">
                <div className="search-icon-container">
                    <img src={searchIcon} className="search-icon" alt="Search" />
                </div>
                <input
                    type="text"
                    placeholder="Search for Lab Results & More..."
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default NavBarSearch;