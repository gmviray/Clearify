import { useUserStore } from "../../store";
import { apiAxios } from "../../utils";

import { FaSortAlphaUp } from 'react-icons/fa';

const ApproverAccountsPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "admin")
        throw new Response("Not Found", { status: 404 });

    return (
        <div>
            <h1 className="text-4xl font-bold text-black mb-6 py-0">Approver Accounts</h1>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search an approver"
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
                <button key='0' className="px-2 py-1 bg-transparent text-primary rounded">Approver Name <FaSortAlphaUp /> </button>
            </div>
            <button className="btn btn-primary">
                    CREATE ACCOUNT
            </button>
        </div>
    );
};

export default ApproverAccountsPage;
