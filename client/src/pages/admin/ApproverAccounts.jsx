import { useState, useEffect } from 'react';
import { useUserStore } from "../../store";
import useSWR from "swr";
import { apiAxios } from "../../utils";
import { FaSortAlphaUp, FaSortAlphaDown } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const fetcher = url => apiAxios.get(url).then(res => res.data);

const ApproverAccountsPage = () => {
  const user = useUserStore((state) => state.user);

  if (user.userType !== "admin") {
    throw new Response("Not Found", { status: 404 });
  }

  const { data, error, isLoading, mutate } = useSWR('/approvers', fetcher);
  const approvers = data?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editApprover, setEditApprover] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleEdit = (approver) => {
    setEditApprover(approver);
    setEditModalIsOpen(true);
  };

  const handleDelete = async (username) => {
    console.log(`Delete approver: ${username}`);
    await apiAxios.delete(`/approver/${username}`);
    mutate('/approvers');
  };

  const onSubmit = async (formData) => {
    try {
      const { username } = editApprover;
      await apiAxios.patch(`/approver/${username}`, formData);
      setEditModalIsOpen(false);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Reset the form values when the editApprover state changes
    reset(editApprover);
  }, [editApprover, reset]);

  const handleCreateModalOpen = () => {
    setCreateModalIsOpen(true);
  };
  
  const onCreateSubmit = async (formData) => {
    try {
      await apiAxios.post("/sign-up/approver", formData);
      setCreateModalIsOpen(false);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <div>idk why this failed</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredApprovers = approvers.filter((approver) =>
    approver.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedApprovers = filteredApprovers.sort((a, b) => {
    let comparison = 0;
    if (sortBy === "name") {
      comparison = a.lastName.localeCompare(b.lastName);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-black mb-6 py-0">Approver Accounts</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search an approver"
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
      <div className="flex space-x-2 text-sm text-red-500 mb-6">
        <button
          key="0"
          className="px-2 py-1 bg-transparent text-primary rounded"
          onClick={() => handleSort("name")}
        >
          Approver Name
          {sortBy === "name" && sortDirection === "asc" ? (
            <FaSortAlphaUp />
          ) : sortBy === "name" && sortDirection === "desc" ? (
            <FaSortAlphaDown />
          ) : null}
        </button>
      </div>
      <button className="btn btn-primary" onClick={handleCreateModalOpen}>
        CREATE ACCOUNT
      </button>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="text-primary bg-transparent pr-20">Username</th>
              <th className="text-primary bg-transparent">Name</th>
              <th className="text-primary bg-transparent">Email</th>
              <th className="text-primary bg-transparent">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedApprovers.map((approver) => (
              <tr key={approver._id}>
                <td>{approver.username}</td>
                <td>
                  {approver.clearanceOfficer && (
                    <div className="h-3 w-21 text-center text-xs/[11px] rounded-lg bg-primary text-white px-0 py-0 mb-0">
                      Clearance Officer
                    </div>
                  )}
                  {`${approver.firstName} ${approver.lastName}`}
                </td>
                <td>{approver.email}</td>
                <td>
                  <button
                    className="text-primary btn-sm mr-2"
                    onClick={() => handleEdit(approver)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-primary btn-sm mr-2"
                    onClick={() => handleDelete(approver.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-4/12">
            <div className="flex justify-end">
              <button
                className="btn-primary text-white p-1 rounded-full absolute top-0 right-0 relative"
                onClick={() => setEditModalIsOpen(false)}
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
            <h2 className="text-primary text-xl font-bold mb-4">Edit Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mb-4">
                <div className="mr-4">
                  <label htmlFor="firstName" className="py-2 block mb-1 text-primary font-bold">First Name</label>
                  <input type="text" className="border-2 rounded-md py-2" id="firstName" {...register("firstName", {required: true,})} defaultValue={editApprover?.firstName} />
                </div>
                <div className="px-8">
                  <label htmlFor="middleName" className="py-2 block mb-1 text-primary font-bold">Middle Name</label>
                  <input type="text" className="border-2 rounded-md py-2" id="middleName" {...register("middleName", {required: false,})} defaultValue={editApprover?.middleName} />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <label htmlFor="lastName" className="py-2 block mb-1 text-primary font-bold">Last Name</label>
                  <input type="text" className="border-2 rounded-md py-2" id="lastName" {...register("lastName", {required: true,})} defaultValue={editApprover?.lastName} />
                </div>
                <div className="px-8">
                  <label htmlFor="password" className="py-2 block mb-1 text-primary font-bold">Password</label>
                  <input type="password" className="border-2 rounded-md py-2" placeholder="Enter password" id="password" {...register("password", {required: true,})} defaultValue={editApprover?.password} />
                </div>
              </div>
              <div className="flex items-center mb-4 py-2">
                <input type="checkbox" className="h-5 w-5" id="clearanceOfficer" {...register("clearanceOfficer")} defaultChecked={editApprover?.clearanceOfficer} />
                <label htmlFor="clearanceOfficer" className="ml-2">Mark/Remove as Clearance Officer</label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-full h-3">EDIT</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {createModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-4/12">
            <div className="flex justify-end">
                <button
                className="btn-primary text-white p-1 rounded-full absolute top-0 right-0 relative"
                onClick={() => setCreateModalIsOpen(false)}
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
            <h2 className="text-primary text-xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleSubmit(onCreateSubmit)}>
               <div className="flex mb-4">
                <div className="mr-4">
                    <label htmlFor="username" className="py-2 block mb-1 text-primary font-bold">Username</label>
                    <input type="text" className="border-2 rounded-md py-2" placeholder="Enter a username" id="username2" {...register("username", {required: true})} />
                </div>
                <div className="px-8">
                    <label htmlFor="email" className="py-2 block mb-1 text-primary font-bold">UP Mail</label>
                    <input type="email" className="border-2 rounded-md py-2" placeholder="Enter a UP mail" id="email2" {...register("email", {required: true})} />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <label htmlFor="firstName" className="py-2 block mb-1 text-primary font-bold">First Name</label>
                  <input type="text" className="border-2 rounded-md py-2" placeholder="Enter a first name" id="firstName2" {...register("firstName", {required: true,})} />
                </div>
                <div className="px-8">
                  <label htmlFor="middleName" className="py-2 block mb-1 text-primary font-bold">Middle Name</label>
                  <input type="text" className="border-2 rounded-md py-2" placeholder="Enter a middle name" id="middleName2" {...register("middleName", {required: false,})} />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <label htmlFor="lastName" className="py-2 block mb-1 text-primary font-bold">Last Name</label>
                  <input type="text" className="border-2 rounded-md py-2" placeholder="Enter a last name" id="lastName2" {...register("lastName", {required: true,})} />
                </div>
                <div className="px-8">
                  <label htmlFor="password" className="py-2 block mb-1 text-primary font-bold">Password</label>
                  <input type="password" className="border-2 rounded-md py-2" placeholder="Enter a password" id="password2" {...register("password", {required: true,})} />
                </div>
              </div>
              <div className="flex items-center mb-4 py-2">
                <input type="checkbox" className="h-5 w-5" id="clearanceOfficer2" {...register("clearanceOfficer")} defaultChecked={editApprover?.clearanceOfficer} />
                <label htmlFor="clearanceOfficer" className="ml-2">Mark/Remove as Clearance Officer</label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-full h-3">CREATE</button>
              </div>
            </form>
            </div>
        </div>
       )}
    </div>
  );
};

export default ApproverAccountsPage;
