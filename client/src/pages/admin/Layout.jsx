import { Outlet, NavLink } from "react-router-dom";
import { useUserStore } from "../../store";

// Icons
import { FaClock, FaUserGraduate, FaUserSecret } from "react-icons/fa";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";

const AdminLayout = () => {
    const signOut = useUserStore((state) => state.signOut);

    return (
        <main>
            <div className="drawer drawer-mobile">
                <input
                    id="admin-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content lg:py-20 lg:px-10">
                    <div className="navbar bg-base-100 lg:hidden shadow-md">
                        <div className="flex-none">
                            <label
                                className="btn btn-square btn-ghost"
                                htmlFor="admin-drawer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block w-5 h-5 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="flex-1">
                            <h1 className="font-bold text-xl">Clearify</h1>
                        </div>
                    </div>
                    <div className="p-5">
                        <Outlet />
                    </div>
                </div>
                <CreateModal />
                <EditModal />
                <div className="drawer-side">
                    <label
                        htmlFor="admin-drawer"
                        className="drawer-overlay"
                    ></label>

                    <ul className="menu p-4 w-80 bg-base-100 lg:bg-base-200">
                        <div className="px-4 py-8">
                            <h3 className="text-2xl font-bold text-primary flex items-center">
                                Dash
                                <span className="text-base-content">board</span>
                                <span className="badge badge-sm font-normal ml-3 bg-base-content text-white">
                                    Admin
                                </span>
                            </h3>
                        </div>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive ? "active" : ""
                                    } flex items-center`
                                }
                                to="/"
                            >
                                <FaClock /> Pending Accounts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive ? "active" : ""
                                    } flex items-center`
                                }
                                to="/students"
                            >
                                <FaUserGraduate /> Students
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive ? "active" : ""
                                    } flex items-center`
                                }
                                to="/approvers"
                            >
                                <FaUserSecret /> Approvers
                            </NavLink>
                        </li>
                        <li className="my-10"></li>

                        <button className="btn btn-primary" onClick={signOut}>
                            Sign Out
                        </button>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default AdminLayout;
