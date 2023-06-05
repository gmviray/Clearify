import React, { useState } from "react";
import { apiAxios } from "../../utils";
import useSWR, { useSWRConfig } from "swr";
import {
    FaSortAlphaUp,
    FaSortAlphaDown,
    FaSortNumericUp,
    FaSortNumericDown,
} from "react-icons/fa";
import CSVReader from "react-csv-reader";

const fetcher = (url) => apiAxios.get(url).then((res) => res.data);

const StudentAccountsPage = () => {
    const { data: adviserData, error: adviserError } = useSWR(
        "/adviser-names",
        fetcher
    );
    const adviser = adviserData?.data || [];

    const { data, error, mutate } = useSWR("/students", fetcher);
    const students = data?.data || [];

    const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
    const [sortBy, setSortBy] = useState(""); // State to store the sort field
    const [sortField, setSortField] = useState(""); // State to store the active sort field
    const [sortDirection, setSortDirection] = useState("asc"); // State to store the sort direction

    const handleAssignAdviser = (student) => {
        setSelectedStudent(student);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null); // Clear the selected student
    };

    const handleAssign = async () => {
        try {
            const adviserUsername =
                document.getElementById("adviser-dropdown").value;

            const selectedAdviser = adviser.find(
                (adviser) => adviser.username === adviserUsername
            );

            if (!selectedAdviser) {
                console.error("Selected adviser not found");
                return;
            }

            const updatedStudent = {
                ...selectedStudent,
                adviser: {
                    _id: selectedAdviser._id,
                    firstName: selectedAdviser.firstName,
                    lastName: selectedAdviser.lastName,
                },
            };

            await apiAxios.post("/student/assign-adviser", {
                studentNumber: selectedStudent.studentNumber,
                username: adviserUsername,
            });

            const updatedStudents = students.map((s) =>
                s._id === selectedStudent._id ? updatedStudent : s
            );

            mutate("/students", { data: { data: updatedStudents } }); // Update the students data

            setSelectedStudent(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };

    const handleSort = (field) => {
        if (field === sortBy) {
            // If the same field is clicked again, toggle the sort direction
            setSortDirection((prevDirection) =>
                prevDirection === "asc" ? "desc" : "asc"
            );
        } else {
            // If a different field is clicked, set the sort field and direction
            setSortBy(field);
            setSortField(field); // Update the active sort field
            setSortDirection("asc");
        }
    };

    // Filter the students based on the search query
    const filteredStudents = students.filter((student) =>
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the students based on the sort field and direction
    const sortedStudents = filteredStudents.sort((a, b) => {
        let comparison = 0;
        if (sortBy === "studentNumber") {
            comparison = a.studentNumber.localeCompare(b.studentNumber);
        } else if (sortBy === "name") {
            comparison = a.firstName.localeCompare(b.firstName);
        }
        return sortDirection === "asc" ? comparison : -comparison;
    });

    if (error || adviserError) {
        console.log(error || adviserError);
        return <div>idk why this failed.</div>;
    }

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 py-0">
                Student Accounts
            </h1>
            <div className="form-control mb-4">
                <div className="input-group input-group-sm lg:input-group-md">
                    <input
                        type="text"
                        placeholder="Search a student"
                        className="input input-bordered input-sm lg:input-md"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="btn btn-primary btn-sm lg:btn-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-5"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="8" cy="8" r="5" />
                            <path d="M15 15l-4.35-4.35" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex space-x-5 text-sm text-red-500 mb-6">
                <button
                    key="0"
                    className={`px-2 py-1 bg-transparent text-primary rounded ${
                        sortField === "studentNumber" ? "text-primary" : ""
                    }`}
                    onClick={() => handleSort("studentNumber")}
                >
                    Student Number
                    {sortField === "studentNumber" && (
                        <>
                            {sortDirection === "asc" ? (
                                <FaSortNumericUp />
                            ) : (
                                <FaSortNumericDown />
                            )}
                        </>
                    )}
                </button>
                <button
                    key="1"
                    className={`px-2 py-1 bg-transparent text-primary rounded ${
                        sortField === "name" ? "text-primary" : ""
                    }`}
                    onClick={() => handleSort("name")}
                >
                    Name
                    {sortField === "name" && (
                        <>
                            {sortDirection === "asc" ? (
                                <FaSortAlphaUp />
                            ) : (
                                <FaSortAlphaDown />
                            )}
                        </>
                    )}
                </button>
            </div>

            <UploadCSV />

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-primary bg-transparent pr-20">
                                Student Number
                            </th>
                            <th className="text-primary bg-transparent pr-20">
                                Name
                            </th>
                            <th className="text-primary bg-transparent pr-20">
                                Email
                            </th>
                            <th className="text-primary bg-transparent pr-20">
                                Adviser
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedStudents.map((student) => {
                            // searches for the adviser's username which has the same id that is assigned to the student
                            const assignedAdviser = adviser.find(
                                (adviser) => adviser._id === student.adviser
                            );
                            return (
                                <React.Fragment key={student._id}>
                                    <tr>
                                        <td>{student.studentNumber}</td>
                                        <td>{`${student.firstName} ${student.lastName}`}</td>
                                        <td>{student.email}</td>
                                        <td>
                                            {assignedAdviser ? (
                                                <span className="text-primary">
                                                    {assignedAdviser.username}
                                                </span>
                                            ) : (
                                                <button
                                                    className="px-2 py-1 bg-transparent text-primary rounded"
                                                    onClick={() =>
                                                        handleAssignAdviser(
                                                            student
                                                        )
                                                    }
                                                >
                                                    Assign
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {selectedStudent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg px-6 py-4 w-2/6">
                        <div className="flex justify-end">
                            <button
                                className="btn-primary text-white p-1 rounded-full absolute top-0 right-0 relative"
                                onClick={handleCloseModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-primary text-xl font-bold mb-4">
                            Assign Adviser
                        </h2>
                        <div className="flex items-center mb-4">
                            <label htmlFor="adviser-dropdown" className="mr-2">
                                Adviser:
                            </label>
                            <select
                                id="adviser-dropdown"
                                className="px-2 my-3 py-1 border border-gray-300 rounded w-full"
                            >
                                {adviser.map((adviser) => (
                                    <option
                                        key={adviser.username}
                                        value={adviser.username}
                                    >
                                        {`${adviser.firstName} ${adviser.lastName}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleAssign}
                        >
                            Assign
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const UploadCSV = () => {
    const [data, setData] = useState([]);
    const [failed, setFailed] = useState(false);

    const { mutate } = useSWRConfig();

    const handleUpload = async () => {
        try {
            const resp = await apiAxios.post("/students/assign-adviser", {
                data: data,
            });
            setData([]);
            setFailed(false);
            mutate("/students");
        } catch (err) {
            setFailed(true);
            setData([]);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2 my-5">
                <h3 className="text-lg font-bold">Upload CSV</h3>

                <CSVReader
                    onFileLoaded={async (data, fileInfo, originalFile) => {
                        setData(data);
                        setFailed(false);
                    }}
                    parserOptions={{ skipEmptyLines: true }}
                    cssInputClass="file-input file-input-ghost w-full max-w-xs"
                />
                <button
                    className="btn btn-primary max-w-xs"
                    onClick={handleUpload}
                    disabled={!data.length}
                >
                    Assign
                </button>
                {failed ? (
                    <p className="text-error">Failed to update some items.</p>
                ) : undefined}
            </div>
        </>
    );
};

export default StudentAccountsPage;
