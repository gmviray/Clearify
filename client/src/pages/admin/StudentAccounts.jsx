import { useUserStore } from "../../store";
import { useState, useEffect } from "react";
import { apiAxios } from "../../utils";
import useSWR from 'swr';

const fetcher = url => apiAxios.get(url).then(res => res.data)

const StudentAccountsPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "admin")
        throw new Response("Not Found", { status: 404 });

    const { data, error, isLoading } = useSWR('/students', fetcher);

    if (error) {
        console.log(error);
        return <div>idk why this failed.</div>;
    }
    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-4xl font-bold text-black mb-6 py-0">Student Accounts</h1>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search a student"
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
                <button key='0' className="px-2 py-1 bg-transparent text-primary rounded">Student Number</button>
                <button key='1' className="px-2 py-1 bg-transparent text-primary rounded">Name</button>
            </div>
            <button className="bg-primary text-gray-200 rounded uppercase text-sm font-medium px-4 py-2 mb-4">
                    UPLOAD A CSV
            </button>
        </div>
    );
};

export default StudentAccountsPage;
