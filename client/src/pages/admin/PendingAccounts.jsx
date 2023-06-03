import { useUserStore } from "../../store";
import { useState, useEffect } from "react";
import { apiAxios } from "../../utils";
import useSWR, { mutate } from "swr";

import { FaSortAlphaUp, FaSortAlphaDown, FaSortNumericUp, FaSortNumericDown } from 'react-icons/fa';
import { FaCheck, FaTimes } from 'react-icons/fa';

const fetcher = (url) => apiAxios.get(url).then((res) => res.data);

const PendingAccountsPage = () => {
  const user = useUserStore((state) => state.user);

  if (user.userType !== "admin") {
    throw new Response("Not Found", { status: 404 });
  }

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handleAccept = async (studentNumber) => {
    try {
      await apiAxios.post('/student/verify', { studentNumber });
      mutate('/students/pending'); // Refresh the list after accepting
    } catch (error) {
      // Handle error
    }
  };

  const handleReject = async (studentNumber) => {
    try {
      await apiAxios.post('/student/reject', { studentNumber });
      mutate('/students/pending'); // Refresh the list after rejecting
    } catch (error) {
      // Handle error
    }
  };

  const { data, error } = useSWR('/students/pending', fetcher);

  if (error) {
    console.log(error);
    return <div>idk why this failed.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  let pendings = data.data;

  const filteredPendings = pendings.filter((pending) => {
    const fullName = `${pending.firstName} ${pending.lastName}`;
    return fullName.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  const sortedPendings = sortBy
    ? filteredPendings.sort((a, b) => {
        if (sortBy === 'studentNumber') {
          return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        } else {
          return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
        }
      })
    : filteredPendings;

  return (
    <div>
      <h1 className="text-4xl font-bold text-black mb-6 py-0">Pending Accounts</h1>
      <div className="flex items-center mb-4">
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
      </div>
      <div className="flex space-x-2 text-sm text-red-500 mb-6">
        <button key='0' className="px-5 py-1 bg-transparent text-primary rounded">
          <button
            className="sorting-button"
            onClick={() => handleSort('studentNumber')}
          >
            Student Number {sortBy === 'studentNumber' && (
              sortOrder === 'asc' ? <FaSortNumericUp /> : <FaSortNumericDown />
            )}
          </button>
        </button>
        <button key='1' className="px-5 py-1 bg-transparent text-primary rounded">
          <button
            className="sorting-button"
            onClick={() => handleSort('firstName')}
          >
            Name {sortBy === 'firstName' && (
              sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />
            )}
          </button>
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="text-primary bg-transparent pr-20">Student Number</th>
              <th className="text-primary bg-transparent pr-20">Name</th>
              <th className="text-primary bg-transparent pr-20">Email</th>
              <th className="text-primary bg-transparent pr-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPendings.map((pending) => (
              <tr key={pending._id}>
                <td>{pending.studentNumber}</td>
                <td>{`${pending.firstName} ${pending.lastName}`}</td>
                <td>{pending.email}</td>
                <td>
                  <button className="p-1 btn-primary mr-4 rounded-full action-button accept-button" onClick={() => handleAccept(pending.studentNumber)}>
                    <FaCheck />
                  </button>
                  <button className="p-1 btn-primary rounded-full action-button reject-button" onClick={() => handleReject(pending.studentNumber)}>
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingAccountsPage;
