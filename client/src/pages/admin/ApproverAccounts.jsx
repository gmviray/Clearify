import { useState } from "react";
import { useUserStore } from "../../store";
import useSWR from "swr";
import { apiAxios } from "../../utils";
import { FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";
import useEditStore from "./editStore";

const fetcher = (url) => apiAxios.get(url).then((res) => res.data);

const ApproverAccountsPage = () => {
    const user = useUserStore((state) => state.user);
    const setEdit = useEditStore((state) => state.setUser);

    if (user.userType !== "admin") {
        throw new Response("Not Found", { status: 404 });
    }

    const { data, error, isLoading, mutate } = useSWR("/approvers", fetcher);
    const approvers = data?.data || [];

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");

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

    const handleDelete = async (username) => {
        await apiAxios.delete(`/approver/${username}`);
        mutate("/approvers");
    };

    if (error) return <div>idk why this failed</div>;
    if (isLoading) return <div>Loading...</div>;

    const filteredApprovers = approvers.filter((approver) =>
        approver.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedApprovers = filteredApprovers.sort((a, b) => {
        let comparison = 0;
        if (sortBy === "name") {
            comparison = a.firstName.localeCompare(b.firstName);
        }
        return sortDirection === "asc" ? comparison : -comparison;
    });

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 py-0">
                Pending Accounts
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
            <label className="btn btn-primary" htmlFor="create-account-modal">
                CREATE ACCOUNT
            </label>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-primary bg-transparent">
                                Username
                            </th>
                            <th className="text-primary bg-transparent">
                                Name
                            </th>
                            <th className="text-primary bg-transparent">
                                Email
                            </th>
                            <th className="text-primary bg-transparent">
                                Actions
                            </th>
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
                                    <label
                                        className="btn btn-sm btn-ghost mr-2 text-primary"
                                        htmlFor="edit-account-modal"
                                        onClick={() => {
                                            setEdit(approver);
                                        }}
                                    >
                                        Edit
                                    </label>
                                    <button
                                        className="btn btn-sm btn-ghost mr-2 text-primary"
                                        onClick={() =>
                                            handleDelete(approver.username)
                                        }
                                    >
                                        Delete
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

export default ApproverAccountsPage;
