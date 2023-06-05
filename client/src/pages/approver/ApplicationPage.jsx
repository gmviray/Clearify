// Hooks
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiAxios } from "../../utils";
import useSWR, { useSWRConfig } from "swr";

// Icons
import { FaArrowLeft, FaLink, FaUser, FaUserTie } from "react-icons/fa";
import { MdInsertComment, MdEmail } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";

// Global state
import { useUserStore } from "../../store";

// Component
import { LoadingComponent } from "../../components";
import Submission from "./Submission";

const ApplicationPage = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useSWR(`/application/${id}`, (url) =>
        apiAxios.get(url).then((res) => res.data)
    );
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();
    const user = useUserStore((state) => state.user);
    const [remark, setRemarks] = useState("");

    if (user.userType != "approver")
        throw new Response("Not Found", { status: 404 });

    if (isLoading) return <LoadingComponent />;

    if (error) return <div>error</div>;

    const { createdBy, adviser, submission, previousSubmissions, _id } =
        data.data;

    const studentRemarks = submission.remarks.filter(
        (item) => item.username === undefined
    );

    const rejectApplication = async () => {
        if (!remark.length) return;

        try {
            const resp = await apiAxios.post(`/application/reject`, {
                id: _id,
                remark,
                username: user.username,
            });

            if (user.clearanceOfficer) mutate("/officer/pending");
            else mutate("/adviser/pending");

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const approveApplication = async () => {
        try {
            const resp = await apiAxios.post(`/application/approve`, {
                id: _id,
            });

            if (user.clearanceOfficer) mutate("/officer/pending");
            else mutate("/adviser/pending");

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="flex flex-col gap-12">
            <div className="">
                <a
                    className="link link-primary flex inline-block items-center gap-2"
                    onClick={() => navigate("/")}
                >
                    <FaArrowLeft /> Go back
                </a>
                <h1 className="text-4xl font-bold text-base-content my-6">
                    Clearance Application{" "}
                    <span className="text-primary">#{id}</span>
                </h1>
                <div className="grid grid-rows-2 grid-flow-col gap-2">
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-accent flex items-center gap-2">
                            <FaUser className="text-sm" />
                            Student Name
                        </h3>
                        <p>{`${createdBy.lastName}, ${createdBy.firstName} ${
                            createdBy.middleName || ""
                        }`}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-accent flex items-center gap-2">
                            <MdEmail className="text-sm" />
                            UP Email
                        </h3>
                        <a
                            className="link link-primary"
                            href={`mailto:${createdBy.email}`}
                        >
                            {createdBy.email}
                        </a>
                    </div>
                    {user.clearanceOfficer && (
                        <>
                            <div className="flex items-center gap-4">
                                <h3 className="font-bold text-accent flex items-center gap-2">
                                    <FaUserTie className="text-sm" />
                                    Adviser Name
                                </h3>
                                <p>{`${adviser.lastName}, ${
                                    adviser.firstName
                                } ${adviser.middleName || ""}`}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="font-bold text-accent flex items-center gap-2">
                                    <MdEmail className="text-sm" />
                                    Adviser Email
                                </h3>
                                <a
                                    className="link link-primary"
                                    href={`mailto:${adviser.email}`}
                                >
                                    {adviser.email}
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-neutral text-3xl font-bold">Submission</h3>
                <Submission item={submission} user={user} />
                <div className="flex items-center gap-4">
                    <button
                        className="btn btn-primary"
                        onClick={approveApplication}
                    >
                        Approve
                    </button>
                    <label
                        className="btn btn-primary"
                        htmlFor="remarks-submission"
                    >
                        Reject
                    </label>
                </div>
            </div>
            {previousSubmissions.length ? (
                <div>
                    <h3 className="text-neutral text-3xl font-bold mb-5">
                        Previous Submissions
                    </h3>
                    <div className="flex flex-col gap-10">
                        {previousSubmissions
                            .sort((a, b) => (a.date > b.date ? -1 : 1))
                            .map((item) => (
                                <Submission
                                    key={item._id}
                                    item={item}
                                    user={user}
                                />
                            ))}
                    </div>
                </div>
            ) : undefined}

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
                                onClick={rejectApplication}
                            >
                                Submit
                            </label>
                        ) : undefined}
                    </div>
                </label>
            </label>
        </section>
    );
};

export default ApplicationPage;
