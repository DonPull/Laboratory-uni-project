import { useEffect } from 'react';
import '../styles/Table.css';

const roles = ["Client", "Employee", "Moderator"];

function handleDelete(item) {
    console.log("Delete item:", item);
}
function handleSave(item) {
    console.log("Save item:", item);
}

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
                {data.length > 0 ? data.map((item, index) => {
                    const keys = Object.keys(item);
                    return (
                        <div className="table-row gap-20" key={index}>
                            {keys.map((key, cellIndex) => (
                                <div
                                    className={cellIndex === keys.length - 1 ? "table-cell last-cell" : "table-cell"}
                                    key={cellIndex}
                                >
                                    {(cellIndex === keys.length - 1 && String(key).toLowerCase() === 'role') ? (
                                        <>
                                            <select
                                                className="role-select"
                                                defaultValue={item[key]}
                                            >
                                                {roles.map((role) => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>

                                            <div className="cell-actions">
                                                <button
                                                    className="save-btn"
                                                    onClick={() => handleSave(item)}
                                                    aria-label="Save row"
                                                    type="button"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                                    </svg>
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(item)}
                                                    aria-label="Delete row"
                                                    type="button"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        item[key]
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                }) : <div>No data available</div>}
            </div>
        </div>
    );
}

export default Table;