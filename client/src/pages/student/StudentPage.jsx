// Global Store
import { useUserStore } from "../../store";

// Fetcher
import useSWR from "swr";
import { apiAxios } from "../../utils";

// Loading Component
import { LoadingComponent } from "../../components";

// Icon
import { FaUserGraduate } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

// Pages
import {
    PendingAccountPage,
    PendingAdviserPage,
    ClearanceApplicationPage,
    ApplicationRoutes,
} from "./pages";

const fetcher = (url) => apiAxios.get(url).then((res) => res.data.data);

const StudentPage = () => {
    const user = useUserStore((state) => state.user);
    const signOut = useUserStore((state) => state.signOut);

    if (user.userType != "student")
        throw new Response("Not Found", { status: 404 });

    const { data, error, isLoading } = useSWR("/student", fetcher);

    if (isLoading) return <LoadingComponent />;

    if (!data.verified) return <PendingAccountPage onClick={signOut} />;

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center gap-4 px-5">
            {!data.adviser && <PendingAdviserPage onClick={signOut} />}
            {!data.application && (
                <ClearanceApplicationPage studentNumber={user.studentNumber} />
            )}
            {data.application && (
                <ApplicationRoutes application={data.application} />
            )}
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
                        <li className={data.adviser ? "block" : "hidden"}>
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
                                        {data.adviser ? (
                                            `${data.adviser.firstName}${
                                                data.adviser.middleName
                                                    ? " " +
                                                      data.adviser.middleName +
                                                      " "
                                                    : " "
                                            }${data.adviser.lastName}`
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
        </section>
    );
};

export default StudentPage;
