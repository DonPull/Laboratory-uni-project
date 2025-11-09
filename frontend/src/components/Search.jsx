import React, { useState } from 'react';
import searchIcon from '../../public/search.png';
import '../styles/Search.css';

function Search({ data = [], onResults }) {
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
        <div className="search-container">
            <img src={searchIcon} alt="Search" />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}

export default Search;