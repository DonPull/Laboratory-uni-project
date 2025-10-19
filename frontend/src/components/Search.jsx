import searchIcon from '../../public/search.png';
import '../styles/Search.css';

function Search({ data }) {

    const onSearch = (query) => {
        // const filteredData = data.filter(item =>
        //     item.patientName.toLowerCase().includes(query.toLowerCase())
        // );
        console.log("Searching for:", query);
    }

    return (
        <div className="search-container">
            <img src={searchIcon} alt="Search" />
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}

export default Search;