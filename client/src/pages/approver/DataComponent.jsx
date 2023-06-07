import { useState, useEffect } from "react";

import {
    FaSortAlphaUp,
    FaSortAlphaDown,
    FaSortNumericUp,
    FaSortNumericDown,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import moment from "moment";

export default ({ data, officer }) => {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [increasingStudentNumber, setIncreasingStudentNumber] =
        useState(false);
    const [increasingDate, setIncreasingDate] = useState(false);
    const [increasingName, setIncreasingName] = useState(false);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => setFilteredData(data), [data]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchKeyword.length) return setFilteredData([...data]);

        setFilteredData((_) =>
            data.filter(({ createdBy }) => {
                const regex = new RegExp(`${searchKeyword}.+`, "i");

                return regex.test(
                    `${createdBy.lastName}, ${createdBy.firstName} ${
                        createdBy.middleName || ""
                    }`
                );
            })
        );
    };

    const handleStudentNumberSort = () => {
        setFilteredData((prevData) => {
            const sortedData = [...prevData]; // Create a copy of the previous filteredData array

            sortedData.sort((a, b) => {
                if (!increasingStudentNumber)
                    return (
                        a.createdBy.studentNumber - b.createdBy.studentNumber
                    );
                else
                    return (
                        b.createdBy.studentNumber - a.createdBy.studentNumber
                    );
            });

            return sortedData;
        });
        setIncreasingStudentNumber((prev) => !prev);
    };

    const handleDateSort = () => {
        setFilteredData((prevData) => {
            const sortedData = [...prevData]; // Create a copy of the previous filteredData array

            sortedData.sort((a, b) => {
                const dateA = new Date(a.submission.date).getTime();
                const dateB = new Date(b.submission.date).getTime();

                if (increasingDate) {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            });

            return sortedData;
        });
        setIncreasingDate((prev) => !prev);
    };

    const handleNameSort = () => {
        setFilteredData((prevData) => {
            const sortedData = [...prevData]; // Create a copy of the previous filteredData array

            sortedData.sort((a, b) => {
                if (!increasingName)
                    return a.createdBy.lastName.localeCompare(
                        b.createdBy.lastName
                    );
                else
                    return b.createdBy.lastName.localeCompare(
                        a.createdBy.lastName
                    );
            });

            return sortedData;
        });
        setIncreasingName((prev) => !prev);
    };

    return (
        <>
            <form onSubmit={handleSearch} className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search an account"
                    className="px-4 py-3 border border-gray-300 rounded-l focus:outline-none"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r">
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
            </form>
            <div className="flex flex-wrap gap-4 text-sm mb-6">
                <button onClick={handleStudentNumberSort}>
                    <span className="flex items-center gap-1 text-neutral">
                        Student Number{" "}
                        {increasingStudentNumber ? (
                            <FaSortNumericUp />
                        ) : (
                            <FaSortNumericDown />
                        )}
                    </span>
                </button>
                <button onClick={handleNameSort}>
                    <span className="flex items-center gap-1 text-neutral">
                        Name{" "}
                        {increasingName ? (
                            <FaSortAlphaUp />
                        ) : (
                            <FaSortAlphaDown />
                        )}
                    </span>
                </button>
                <button onClick={handleDateSort}>
                    <span className="flex items-center gap-1 text-neutral">
                        Date Submitted{" "}
                        {increasingDate ? (
                            <FaSortAlphaUp />
                        ) : (
                            <FaSortAlphaDown />
                        )}
                    </span>
                </button>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-primary bg-transparent">
                                Date Submitted
                            </th>
                            <th className="text-primary bg-transparent">
                                Student Number
                            </th>
                            <th className="text-primary bg-transparent">
                                Name
                            </th>
                            <th className="text-primary bg-transparent">
                                {officer ? "Adviser" : "Email"}
                            </th>
                            <th className="text-primary bg-transparent pr-20"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(
                            ({ createdBy, adviser, _id, submission }) => (
                                <tr key={_id}>
                                    <td>
                                        {moment(submission.date).format(
                                            "MMMM D, YYYY"
                                        )}
                                    </td>
                                    <td>{createdBy.studentNumber}</td>
                                    <td>{`${createdBy.lastName}, ${
                                        createdBy.firstName
                                    } ${createdBy.middleName || ""}`}</td>
                                    <td>
                                        {officer
                                            ? `${adviser.lastName}, ${
                                                  adviser.firstName
                                              } ${adviser.middleName || ""}`
                                            : createdBy.email}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                navigate(
                                                    `/application/${createdBy.studentNumber}`
                                                )
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
