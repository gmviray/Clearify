import { useUserStore } from "../../store";
import { useState } from "react";
import { apiAxios } from "../../utils";
import useSWR from "swr";

import { FaSortAlphaUp } from 'react-icons/fa';
import { FaSortNumericUp } from 'react-icons/fa';

const fetcher = (url) => apiAxios.get(url).then((res) => res.data);

const printAllPendings = () => {
    const { data, error, isLoading } = useSWR('/students/pending', fetcher);

    if (error) {
        console.log(error);
        return <div>idk why this failed.</div>;
    }
    if (isLoading) return <div>Loading...</div>;
    const pendings = data.data;

    const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student

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

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-primary bg-transparent pr-20">Student Number</th>
                        <th className="text-primary bg-transparent pr-20">Name</th>
                        <th className="text-primary bg-transparent pr-20">Email</th>
                        <th className="text-primary bg-transparent pr-20">Actions   </th>
                    </tr>
                </thead>
                <tbody>
                    {pendings.map((pending) => (
                        <tr key={pending._id}>
                            <td>{pending.studentNumber}</td>
                            <td>{`${pending.firstName} ${pending.lastName}`}</td>
                            <td>{pending.email}</td>
                            < hr/>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const PendingAccountsPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "admin")
        throw new Response("Not Found", { status: 404 });

    return (
        <div>
            <h1 className="text-4xl font-bold text-black mb-6 py-0">Pending Accounts</h1>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search an account"
                className="px-4 py-3 border border-gray-300 rounded-l focus:outline-none"
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
            <div className="flex space-x-2 text-sm text-red-500 mb-6">
                <button key='0' className="px-5 py-1 bg-transparent text-primary rounded">Student Number <FaSortNumericUp /></button>
                <button key='1' className="px-5 py-1 bg-transparent text-primary rounded">Name <FaSortAlphaUp /></button>
            </div>
            {printAllPendings()}
        </div>
    );
};

export default PendingAccountsPage;
