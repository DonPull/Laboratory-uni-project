import Table from "../components/Table";
import Search from "../components/Search";
import "../styles/EmployeeList.css";
import { useEffect, useState } from "react";

function EmployeeList() {
    const [wholeData, setWholeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchWholeData();
    }, []);

    const fetchWholeData = async () => {
        const data = [
            {
                doctorName: 'Dr. Emily Carter',
                specialization: 'Cardiologist',
                age: 45,
                yearsOfExperience: 18,
                contactEmail: 'emily.carter@gvmc.com',
                availabilityStatus: 'Available'
            },
            {
                doctorName: 'Dr. Daniel Mitchell',
                specialization: 'Radiologist',
                age: 39,
                yearsOfExperience: 12,
                contactEmail: 'daniel.mitchell@cdc.com',
                availabilityStatus: 'On Leave'
            },
            {
                doctorName: 'Dr. Olivia Johnson',
                specialization: 'Endocrinologist',
                age: 52,
                yearsOfExperience: 25,
                contactEmail: 'olivia.johnson@centralhosp.com',
                availabilityStatus: 'Available'
            },
            {
                doctorName: 'Dr. James Harris',
                specialization: 'Orthopedic Surgeon',
                age: 47,
                yearsOfExperience: 20,
                contactEmail: 'james.harris@metroortho.com',
                availabilityStatus: 'In Surgery'
            },
            {
                doctorName: 'Dr. Ava Thompson',
                specialization: 'Pediatrician',
                age: 38,
                yearsOfExperience: 13,
                contactEmail: 'ava.thompson@happykids.com',
                availabilityStatus: 'Available'
            }
        ];

        setWholeData(data);
        setFilteredData(data);
    }

    return (
        <div className="column width-fill-available align-center gap-30" style={{ paddingTop: "250px" }}>
            <div id="lab-results-header" className="gap-30">
                <Search
                    data={wholeData}
                    onResults={setFilteredData}
                />
            </div>
            <Table data={filteredData} />
        </div>
    );
}

export default EmployeeList;