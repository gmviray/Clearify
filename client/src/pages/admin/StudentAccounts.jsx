import { useUserStore } from "../../store";
import { useState } from "react";
import { apiAxios } from "../../utils";
import useSWR, { mutate } from "swr";

import { FaSortAlphaUp, FaSortAlphaDown, FaSortNumericUp, FaSortNumericDown } from 'react-icons/fa';

const fetcher = (url) => apiAxios.get(url).then((res) => res.data);

const StudentAccountsPage = () => {
  const user = useUserStore((state) => state.user);

  if (user.userType !== "admin") {
    throw new Error("Not Found");
  }

  const { data, error } = useSWR("/students", fetcher);
  const students = data?.data || [];

  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [sortBy, setSortBy] = useState(""); // State to store the sort field
  const [sortDirection, setSortDirection] = useState("asc"); // State to store the sort direction

  const handleAssignAdviser = (student) => {
    setSelectedStudent(student); // Set the selected student
  };

  const handleCloseModal = () => {
    setSelectedStudent(null); // Clear the selected student
  };

  const handleAssign = () => {
    // Implement the logic to assign an adviser to the selected student using the selectedStudent object
    // ...
    setSelectedStudent(null); // Clear the selected student after assigning the adviser
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

  if (error) {
    console.log(error);
    return <div>idk why this failed.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-black mb-6 py-0">
        Student Accounts
      </h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search a student"
          className="px-4 py-3 border border-gray-300 rounded-l focus:outline-none"
          value={searchQuery}
          onChange={handleSearch}
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
      </div>
      <div className="flex space-x-5 text-sm text-red-500 mb-6">
        <button
          key="0"
          className="px-2 py-1 bg-transparent text-primary rounded"
          onClick={() => handleSort("studentNumber")}
        >
          Student Number
          {sortBy === "studentNumber" && sortDirection === "asc" ? (
            <FaSortNumericUp />
          ) : (
            <FaSortNumericDown />
          )}
        </button>
        <button
          key="1"
          className="px-2 py-1 bg-transparent text-primary rounded"
          onClick={() => handleSort("name")}
        >
          Name
          {sortBy === "name" && sortDirection === "asc" ? (
            <FaSortAlphaUp />
          ) : (
            <FaSortAlphaDown />
          )}
        </button>
      </div>
      <button className="btn btn-primary mb-4">UPLOAD A CSV</button>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="text-primary bg-transparent pr-20">
                Student Number
              </th>
              <th className="text-primary bg-transparent pr-20">Name</th>
              <th className="text-primary bg-transparent pr-20">Email</th>
              <th className="text-primary bg-transparent pr-20">Adviser</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.studentNumber}</td>
                <td>{`${student.firstName} ${student.lastName}`}</td>
                <td>{student.email}</td>
                <td>
                  {student.adviser ? (
                    student.adviser
                  ) : (
                    <button
                      className="px-2 py-1 bg-transparent text-primary rounded"
                      onClick={() => handleAssignAdviser(student)}
                    >
                      Assign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedStudent && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="text-primary">Assign Adviser</h2>
              <div>
                <select className="dropdown" placeholder="Search an adviser">
                  {/* Render the list of advisers here */}
                </select>
              </div>
              <div>
                <button className="btn btn-primary" onClick={handleAssign}>
                  Assign
                </button>
              </div>
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAccountsPage;
