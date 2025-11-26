import '/src/styles/Reports.css';
import downloadIcon from "../../public/download.png";
import Dropdown from '../components/Dropdown';
import Table from '../components/Table';
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
    const options = ["Option A", "Option B"];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        console.log("Option received from child:", option);
    };
    return (
        <div className="column width-fill-available align-center gap-30" style={{ paddingTop: "250px", position: "relative" }}>
            <div className="options-container">
                <Dropdown onOptionSelect={handleOptionSelect} dropDownName="Select report" options={options} />
                <div className="download-container">
                    <button className="download-button label" onClick={() => downloadReport(selectedOption, "csv")}>
                        <span>Download csv</span>
                        <img src={downloadIcon} alt="download" />
                    </button>
                    <button className="download-button label" onClick={() => downloadReport(selectedOption, "pdf")}>
                        <span>Download pdf</span>
                        <img src={downloadIcon} alt="download" />
                    </button>
                </div>
            </div>

            <CustomTable option={selectedOption} />

        </div>
    );
}
function CustomTable({ option }) {
    const [wholeData, setWholeData] = useState([]);

    useEffect(() => {
        fetchWholeData();
    }, [option]);


    const fetchWholeData = async () => {
        // const data = await getLabResultsFromDB();
        let data = getData(option);

        setWholeData(data);
    }
    return (
        <>
            <Table data={wholeData} />
        </>
    );
}
function downloadReport(option, type) {
    const rawData = getData(option);

    if (!rawData || rawData.length === 0) {
        console.log("No data to download");
        return;
    }
    type == "csv" ? dataToCSV(rawData, `report-${option}.csv`) : dataToPDF(rawData, `report-${option}.pdf`);
}
function getData(option) {
    let data = []
    switch (option) {
        case "Option A":
            data = [
                {
                    testType: 'Blood Count',
                    date: '12.11.2025',
                    patientName: 'John Doe',
                    doctorName: 'Dr. Smith'
                },
                {
                    testType: 'Urine Test',
                    date: '15.11.2025',
                    patientName: 'Jane Doe',
                    doctorName: 'Dr. Brown'
                },
                {
                    testType: 'X-Ray',
                    date: '01.10.2023',
                    patientName: 'Alice Johnson',
                    doctorName: 'Dr. White'
                }
            ];
            break;

        case "Option B":
            data = [
                {
                    testType: 'Type1',
                    doctorNameShort: 'testField1',
                    specialization: 'testField2',
                    yearsOfExperience: 'testField3',
                    date: '12.11.2025',
                    patientName: 'John Doe',
                    doctorName: 'Dr. Smith'
                },
                {
                    testType: 'Type2',
                    doctorNameShort: 'testField1',
                    specialization: 'testField2',
                    yearsOfExperience: 'testField3',
                    date: '12.11.2025',
                    patientName: 'John Doe',
                    doctorName: 'Dr. Smith'
                },
                {
                    testType: 'Type3',
                    doctorNameShort: 'testField1',
                    specialization: 'testField2',
                    yearsOfExperience: 'testField3',
                    date: '12.11.2025',
                    patientName: 'John Doe',
                    doctorName: 'Dr. Smith'
                }
            ];
            break;
    }
    return data;
}

function dataToCSV(data, filename) {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const headerLine = headers.join(",");

    const rows = data.map(row =>
        headers
            .map(key => {
                const value = row[key] ?? "";
                const escaped = String(value).replace(/"/g, '""');
                return `"${escaped}"`;
            })
            .join(",")
    );

    let resultData = [headerLine, ...rows].join("\n");
    downloadString(resultData, filename)
}

function analyzeColumns(data) {
    if (!data || data.length === 0) return [];

    //gets all the keys from the data and creates a dict with each header {key, maxLength(finds the entry with largest length), isNumeric(if entry is number or something else) }
    const keys = Object.keys(data[0]);

    return keys.map((key) => {
        let maxLen = 0;
        let isNumeric = true;

        data.forEach(row => {
            const val = row[key];
            if (val === null || val === undefined) return;

            const s = String(val);
            maxLen = Math.max(maxLen, s.length);

            if (isNumeric && isNaN(Number(s))) {
                isNumeric = false;
            }
        });

        return { key, maxLen, isNumeric };
    });
}
//gets single entry with the parameters below and categorizes each one 
function categorizeColumn(stat) {
    const { key, maxLen, isNumeric } = stat;
    const keyLower = key.toLowerCase();

    if (keyLower.includes("date")) {
        return "date";
    }

    if (isNumeric) {
        if (maxLen <= 32) return "number";
        if (maxLen <= 64) return "longNumber"; // if longer than 64, treat like longNumber
        return "longNumber";
    }

    if (maxLen <= 32) return "text";
    if (maxLen <= 64) return "longText";// if longer than 64, treat like longText
    return "longText";
}

function computeColumnRatios(data) {
    const CATEGORY_WEIGHTS = {
        text: 1.0,
        longText: 1.6,
        number: 0.8,
        longNumber: 1.2,
        date: 0.7,
    };
    const stats = analyzeColumns(data);

    const cols = stats.map((stat) => {
        const category = categorizeColumn(stat);
        const baseWeight = CATEGORY_WEIGHTS[category] ?? 1.0;

        //fine-tuning based on how close maxLen is to 64
        const lengthFactor = Math.min(stat.maxLen, 64) / 64;
        const weight = baseWeight * (0.5 + 0.5 * lengthFactor);


        // makes short fields slightly lighter than long ones
        return {
            key: stat.key,
            category,
            maxLen: stat.maxLen,
            weight,
        };
    });

    const totalWeight = cols.reduce((sum, c) => sum + c.weight, 0) || 1;

    // Normalize so sum(ratio) === 1
    cols.forEach(c => {
        c.ratio = c.weight / totalWeight;
    });

    return cols; // [{key, category, maxLen, weight, ratio}, ...]
}
function dataToPDF(data, filename) {
    if (!data || data.length === 0) return;

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const usableWidth = pageWidth - margin * 2;

    const colsInfo = computeColumnRatios(data);

    // builds the table
    const head = [colsInfo.map(col => col.key)];
    const body = data.map(row => colsInfo.map(col => row[col.key]));

    // maps the ratios and applies the style
    const columnStyles = {};
    colsInfo.forEach((col, index) => {
        columnStyles[index] = {
            cellWidth: col.ratio * usableWidth,
            overflow: "linebreak",
        };
    });

    doc.setFontSize(16);
    doc.text("Report", margin, 15);

    autoTable(doc, {
        startY: 25,
        margin: { left: margin, right: margin },
        tableWidth: usableWidth,
        head,
        body,
        styles: {
            fontSize: 9,
            cellPadding: 2,
        },
        columnStyles,
        headStyles: {
            fontStyle: "bold",
        },
    });

    doc.save(filename);
}

function downloadString(content, filename) {
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

export default Reports;