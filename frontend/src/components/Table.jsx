import { useEffect } from 'react';
import '../styles/Table.css';
import { parseDate } from '../utils';

//const roles = ["Client", "Employee", "Moderator"];

const columnLabels = {
    testType: 'Test',
    date: 'Date',
    patientName: 'Patient',
    doctorName: 'Doctor',
    doctorNameShort: 'Doctor',
    specialization: 'Specialty',
    age: 'Age',
    yearsOfExperience: 'Experience (yrs)',
    contactEmail: 'Email',
    availabilityStatus: 'Status',
    role: 'Role'
};

function formatCellValue(key, value) {
    if (key === 'contactEmail') {
        return value?.toLowerCase?.() ?? value;
    }
    if (key === 'date') {
        try {
            const d = parseDate(value);
            return d instanceof Date && !isNaN(d) ? d.toLocaleDateString('en-GB') : value;
        } catch {
            return value;
        }
    }
    // keep "Dr." prefix as-is for doctorName
    return value;
}

/*function handleDelete(item) {
    console.log("Delete item:", item);
}
function handleSave(item) {
    console.log("Save item:", item);
}*/

function Table({ data }) {
    useEffect(() => {
        console.log("Table data:", data);
    }, [data]);

    return (
        <div className="table-container column gap-30">
            <div className="table-header gap-20">
                {data.length > 0 ? Object.keys(data[0]).map((key, index) => (
                    <label key={index}>{columnLabels[key] ?? key}</label>
                )) : <div>No data available</div>}
            </div>
            <div className="table-body column gap-10">
                {data.length > 0 ? data.map((item, rowIndex) => {
                    const keys = Object.keys(item);
                    return (
                        <div className="table-row gap-20" key={item.id ?? rowIndex}>
                            {keys.map((key, cellIndex) => (
                                <div className={cellIndex === keys.length - 1 ? "table-cell last-cell" : "table-cell"} key={cellIndex}>
                                    {formatCellValue(key, item[key])}
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