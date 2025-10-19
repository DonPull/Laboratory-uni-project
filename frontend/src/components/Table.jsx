import { useEffect } from 'react';
import '../styles/Table.css';

function Table({ data }) {
    useEffect(() => {
        console.log("Table data:", data);
    }, [data]);

    return (
        <div className="table-container column gap-30">
            <div className="table-header gap-20">
                {data.length > 0 ? Object.keys(data[0]).map((key, index) => (
                    <label key={index}>{key}</label>
                )) : <div>No data available</div>}
            </div>
            <div className="table-body column gap-10">
                {data.length > 0 ? data.map((item, index) => (
                    <div className="table-row gap-20" key={index}>
                        {Object.values(item).map((cell, cellIndex) => (
                            <div className="table-cell" key={cellIndex}>{cell}</div>
                        ))}
                    </div>
                )) : <div>No data available</div>}
            </div>
        </div>
    );
}

export default Table;