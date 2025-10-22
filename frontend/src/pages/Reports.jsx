import Dropdown from '../components/Dropdown';
import Table from '../components/Table';
import '/src/styles/Dropdown.css';
import { useEffect, useState } from "react";
function Reports() {
    const [wholeData, setWholeData] = useState([]);

    const [selectedOption, setSelectedOption] = useState("");

     useEffect(() => {
            fetchWholeData();
        }, [selectedOption]);
        
     const fetchWholeData = async () => {
        // const data = await getLabResultsFromDB();
        let data = [];
        if (selectedOption === "Option A") {
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
           
        }
        else if (selectedOption === "Option B") {
            data = [
                {
                    testType: 'SEX',
                    date: '12.11.2025',
                    patientName: 'John Doe',
                    doctorName: 'Dr. Smith'
                },
                {
                    testType: 'MAZNA',
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
         
        }

        setWholeData(data);
    } 

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    console.log("Option received from child:", option);
  };
    return (
        <div >
            <h1>Reports Page</h1>
            <Dropdown onOptionSelect={handleOptionSelect}/>
            {selectedOption === "Option A" && <Table data={wholeData} />}
            {selectedOption === "Option B" && <Table data={wholeData} />}
            
        </div>
    );
}

export default Reports;