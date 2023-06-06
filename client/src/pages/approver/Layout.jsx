import { Outlet, NavLink } from "react-router-dom";
import { useUserStore } from "../../store";

// Icons
import { FaClock } from "react-icons/fa";
import RemarksModal from "./RemarksModal";

const ApproverLayout = () => {
    const signOut = useUserStore((state) => state.signOut);
    const user = useUserStore((state) => state.user);

    return (
        <main>
            <div className="drawer drawer-mobile">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content lg:py-10 lg:px-10">
                    <div className="navbar bg-base-100 lg:hidden shadow-md">
                        <div className="flex-none">
                            <label
                                className="btn btn-square btn-ghost"
                                htmlFor="my-drawer-2"
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
                    {/* <label
                        htmlFor="my-drawer-2"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        Open drawer
                    </label> */}
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>

                    <ul className="menu p-4 w-80 bg-base-100 lg:bg-base-200">
                        <div className="px-4 py-8">
                            <h3 className="text-2xl font-bold text-primary flex items-center">
                                Dash
                                <span className="text-base-content">board</span>
                                <span className="badge badge-sm font-normal ml-3 bg-base-content text-white">
                                    {user.clearanceOfficer
                                        ? "Officer"
                                        : "Adviser"}
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
                                <FaClock /> Pending Applications
                            </NavLink>
                        </li>
                        <li className="my-10">
                            <div className="flex flex-col items-center mt-80 mb-5 w-full px-4">
                                <p className="">
                                    Welcome back{" "}
                                    <span className="text-primary">
                                        {user.firstName}!
                                    </span>
                                </p>
                                <p className="text-sm text-primary mb-10">
                                    {user.email}
                                </p>
                                <button
                                    className="btn btn-primary w-full"
                                    onClick={signOut}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <RemarksModal />
            </div>
        </main>
    );
};

export default ApproverLayout;
