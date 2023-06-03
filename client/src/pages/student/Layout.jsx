import { Outlet } from "react-router-dom";

import { useUserStore } from "../../store";
import { FaUserGraduate } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const StudentLayout = () => {
    const signOut = useUserStore((state) => state.signOut);
    const user = useUserStore((state) => state.user);

    return (
        <main className="container mx-auto min-h-screen relative">
            <Outlet />
            <header className="absolute bottom-10 right-10">
                <nav>
                    <ul className="flex flex-col gap-5">
                        <li>
                            <label
                                htmlFor="user-profile-modal"
                                className="btn btn-circle btn-primary shadow-lg lg:btn-lg"
                            >
                                <FaUserGraduate className="lg:text-2xl" />
                            </label>
                        </li>
                        <li>
                            <button
                                className="btn btn-circle btn-primary shadow-lg lg:btn-lg"
                                onClick={signOut}
                            >
                                <IoMdExit className="lg:text-3xl" />
                            </button>
                        </li>
                    </ul>
                </nav>

                <input
                    type="checkbox"
                    id="user-profile-modal"
                    className="modal-toggle"
                />
                <label
                    htmlFor="user-profile-modal"
                    className="modal cursor-pointer w-full"
                >
                    <label className="modal-box relative p-8">
                        <label
                            htmlFor="user-profile-modal"
                            className="btn btn-sm btn-circle btn-primary absolute right-5 top-5 text-xl"
                        >
                            ✕
                        </label>
                        <h3 className="text-2xl font-bold text-primary">
                            Profile Details
                        </h3>
                        <div className="divider my-2"></div>
                        <div>
                            <ul className="flex flex-col gap-3">
                                <li className="flex flex-col gap-1">
                                    <p className="text-base-300">Name</p>
                                    <p>
                                        {user.lastName}, {user.firstName}{" "}
                                        {user.middleName || ""}
                                    </p>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <p className="text-base-300">
                                        Student Number
                                    </p>
                                    <p>{user.studentNumber}</p>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <p className="text-base-300">Email</p>
                                    <p>{user.email}</p>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <p className="text-base-300">Adviser</p>
                                    <p>
                                        {user.adviser ? (
                                            user.adviser.name
                                        ) : (
                                            <span className="text-error">
                                                Pending
                                            </span>
                                        )}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </label>
                </label>
            </header>
        </main>
    );
};

export default StudentLayout;
