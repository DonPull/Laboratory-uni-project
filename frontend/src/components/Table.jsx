import React, { useEffect, useState } from 'react';
import '../styles/Table.css';
import { parseDate } from '../utils';

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

function handleCopyEmail(email) {
    if (!email || !navigator.clipboard) return;
    navigator.clipboard.writeText(email)
        .then(() => {
            console.log('Email copied:', email);
            alert('Email copied to clipboard!');
        })
        .catch(() => {
            console.warn('Failed to copy email')
            alert('Failed to copy email to clipboard.');
        });
}

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
    return value;
}

function Table({ data = [] }) {
    const [hoveredEmail, setHoveredEmail] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        console.log("Table data:", data);
    }, [data]);

    const handleEmailMouseEnter = (e, email) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        });
        setHoveredEmail(email);
    };

    const handleEmailMouseLeave = () => {
        setHoveredEmail(null);
    };

    return (
        <div className="table-container column gap-30">
            <div className="table-header gap-20">
                {data.length > 0 ? (
                    Object.keys(data[0]).map((key, index) => (
                        <label key={index}>{columnLabels[key] ?? key}</label>
                    ))
                ) : (
                    <div className="no-data-wrapper">
                        <label className='no-data'>No data available</label>
                    </div>
                )}
            </div>
            <div className="table-body column gap-10">
                {data.length > 0 &&
                    data.map((item, rowIndex) => {
                        const keys = Object.keys(item);
                        return (
                            <div className="table-row gap-20" key={item.id ?? rowIndex}>
                                {keys.map((key, cellIndex) => (
                                    <div
                                        className={
                                            cellIndex === keys.length - 1
                                                ? "table-cell last-cell"
                                                : "table-cell"
                                        }
                                        data-key={key}
                                        key={cellIndex}
                                        onClick={
                                            String(key).toLowerCase() === 'contactemail'
                                                ? () => handleCopyEmail(item[key])
                                                : undefined
                                        }
                                        onMouseEnter={
                                            String(key).toLowerCase() === 'contactemail'
                                                ? (e) => handleEmailMouseEnter(e, item[key])
                                                : undefined
                                        }
                                        onMouseLeave={
                                            String(key).toLowerCase() === 'contactemail'
                                                ? handleEmailMouseLeave
                                                : undefined
                                        }
                                    >
                                        {formatCellValue(key, item[key])}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
            </div>
            
            {hoveredEmail && (
                <div 
                    className="email-tooltip"
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`
                    }}
                >
                    {hoveredEmail}
                    <div className="tooltip-arrow"></div>
                </div>
            )}
        </div>
    );
}

export default Table;