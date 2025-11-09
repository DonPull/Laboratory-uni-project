import Table from "../components/Table";
import SelectButton from "../components/SelectButton";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import { parseDate } from "../utils";

function LabResults() {
    const [wholeData, setWholeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [visitStatus, setVisitStatus] = useState(0); // 0 - Scheduled, 1 - Past

    useEffect(() => {
        fetchWholeData();
        filterData();
    }, []);

    useEffect(() => {
        filterData();
    }, [visitStatus, wholeData]);

    const fetchWholeData = async () => {
        // const data = await getLabResultsFromDB();
        const data = [
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

        setWholeData(data);
    }

    const filterData = () => {
        const now = new Date();

        if (visitStatus === 0) {
            // Filter for scheduled visits
            const scheduled = wholeData.filter(visit => {
                const visitDate = parseDate(visit.date);
                console.log("Filtering scheduled visit data. Visit date:", visitDate, "against", now);
                return visitDate >= now;
            });
            setFilteredData(scheduled);
        } else {
            // Filter for past visits
            const past = wholeData.filter(visit => {
                const visitDate = parseDate(visit.date);
                console.log("Filtering past visit data. Visit date:", visitDate, "against", now);
                return visitDate < now;
            });
            setFilteredData(past);
        }
    };

    return (
        <div className="column width-fill-available align-center gap-30" style={{ paddingTop: "250px" }}>
            <div id="lab-results-header" className="gap-30">
                <Search 
                data={
                    wholeData.filter(visit => {
                        const now = new Date();
                        const visitDate = parseDate(visit.date);
                        return visitStatus === 0 ? visitDate >= now : visitDate < now;
                    })
                }
                onResults={setFilteredData}/>
                <SelectButton selectedOptionIndex={visitStatus} callback={setVisitStatus}>
                    <label>Scheduled Visits</label>
                    <label>Past Visits</label>
                </SelectButton>
            </div>
            <Table data={filteredData} />
        </div>
    );
}
export default LabResults;