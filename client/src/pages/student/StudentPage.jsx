// Global Store
import { useUserStore } from "../../store";

// Fetcher
import useSWR, { useSWRConfig } from "swr";
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

import { useState } from "react";

import moment from "moment";

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
            {data.adviser && !data.application && <ClearanceApplicationPage />}
            {data.application && (
                <ApplicationRoutes application={data.application} />
            )}
            {data.application && (
                <RemarksModal remarks={data.application.submission.remarks} />
            )}
            <ResubmitLinkModal studentNumber={user.studentNumber} />
            <ResubmitLinkModal resubmit />

            <RemarksSubmission />
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

const ResubmitLinkModal = ({ resubmit, studentNumber }) => {
    const [link, setLink] = useState("");
    const { mutate } = useSWRConfig();

    const applyApplication = async () => {
        try {
            if (!resubmit)
                await apiAxios.post("/application", {
                    studentNumber,
                    link,
                });
            else
                await apiAxios.patch("/application", {
                    link,
                });

            mutate("/student");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <input
                type="checkbox"
                id={resubmit ? "resubmit-link-submission" : "link-submission"}
                className="modal-toggle"
                onClick={() => {
                    if (link.length) setLink("");
                }}
            />
            <label
                className="modal cursor-pointer"
                htmlFor={
                    resubmit ? "resubmit-link-submission" : "link-submission"
                }
            >
                <label className="modal-box md:px-10 md:py-8">
                    <label
                        htmlFor={
                            resubmit
                                ? "resubmit-link-submission"
                                : "link-submission"
                        }
                        className="btn btn-sm btn-circle btn-primary absolute right-5 top-5 text-xl"
                        onClick={() => {
                            if (link.length) setLink("");
                        }}
                    >
                        ✕
                    </label>
                    <h3 className="font-bold md:text-xl text-primary mb-3">
                        Upload Github Repository
                    </h3>
                    <input
                        type="text"
                        placeholder="Paste link here"
                        className="input input-bordered w-full"
                        value={link}
                        onChange={(e) => setLink(e.currentTarget.value)}
                    />
                    {link.length ? (
                        <div className="modal-action justify-start">
                            <label
                                htmlFor={
                                    resubmit
                                        ? "resubmit-link-submission"
                                        : "link-submission"
                                }
                                className="btn btn-primary"
                                onClick={applyApplication}
                            >
                                {resubmit ? "Resubmit" : "Submit"}
                            </label>
                        </div>
                    ) : undefined}
                </label>
            </label>
        </>
    );
};

const RemarksSubmission = () => {
    const { mutate } = useSWRConfig();
    const [remark, setRemarks] = useState("");

    const resubmitApplication = async () => {
        try {
            await apiAxios.patch("/application", {
                remark,
            });

            mutate("/student");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <input
                type="checkbox"
                id="remarks-submission"
                className="modal-toggle"
                onClick={() => {
                    if (remark.length) setRemarks("");
                }}
            />
            <label
                className="modal cursor-pointer"
                htmlFor="remarks-submission"
            >
                <label className="modal-box md:px-10 md:py-8 w-11/12 max-w-5xl h-1/2">
                    <label
                        htmlFor="remarks-submission"
                        className="btn btn-sm btn-circle btn-primary absolute right-5 top-5 text-xl"
                        onClick={() => {
                            if (remark.length) setRemarks("");
                        }}
                    >
                        ✕
                    </label>
                    <h3 className="font-bold md:text-xl text-primary mb-3">
                        Leave Remarks
                    </h3>
                    <textarea
                        type="text"
                        placeholder="Add your remarks here"
                        className="textarea textarea-bordered w-full h-2/3"
                        value={remark}
                        onChange={(e) => setRemarks(e.currentTarget.value)}
                    ></textarea>
                    <div className="modal-action justify-start">
                        {remark.length ? (
                            <label
                                htmlFor="remarks-submission"
                                className="btn btn-primary"
                                onClick={resubmitApplication}
                            >
                                Submit
                            </label>
                        ) : undefined}
                    </div>
                </label>
            </label>
        </>
    );
};

const RemarksModal = ({ remarks }) => {
    return (
        <>
            <input
                type="checkbox"
                id="remarks-modal"
                className="modal-toggle"
            />
            <label className="modal cursor-pointer" htmlFor="remarks-modal">
                <label className="modal-box md:px-10 md:py-8">
                    <label
                        htmlFor="remarks-modal"
                        className="btn btn-sm btn-circle btn-primary absolute right-5 top-5 text-xl"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold md:text-xl text-primary mb-3">
                        Remarks
                    </h3>
                    {remarks.map((item, index) =>
                        item.remarkBy ? (
                            <div key={index} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold">
                                        {item.remarkBy.firstName}{" "}
                                        {item.remarkBy.lastName}
                                    </h3>
                                    <p className="text-sm">
                                        {moment(item.date).format(
                                            "MMMM D, YYYY"
                                        )}
                                    </p>
                                </div>
                                <p>{item.remark}</p>
                            </div>
                        ) : undefined
                    )}
                </label>
            </label>
        </>
    );
};

export default StudentPage;
