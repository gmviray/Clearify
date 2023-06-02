import { Outlet, NavLink } from "react-router-dom";
import { useUserStore } from "../../store";

// Icons
import { FaClock, FaUserGraduate, FaUserSecret } from "react-icons/fa";

const AdminLayout = () => {
    const signOut = useUserStore((state) => state.signOut);

    return (
        <main>
            <div className="drawer drawer-mobile">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content lg:py-20 lg:px-10">
                    <Outlet />
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side bg-base-200 ">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>

                    <ul className="menu p-4 w-80">
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
