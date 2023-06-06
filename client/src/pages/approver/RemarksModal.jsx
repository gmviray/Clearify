import { useState } from "react";
import { apiAxios } from "../../utils";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../store";
import { useSWRConfig } from "swr";

export default () => {
    const { id } = useParams();
    const user = useUserStore((state) => state.user);
    const [remark, setRemarks] = useState("");
    const { mutate } = useSWRConfig();
    const rejectApplication = async () => {
        if (!remark.length) return;

        try {
            const resp = await apiAxios.post(`/application/reject`, {
                id: id,
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
                                onClick={rejectApplication}
                            >
                                Submit
                            </label>
                        ) : undefined}
                    </div>
                </label>
            </label>
            <input
                type="checkbox"
                id="remarks-submission"
                className="modal-toggle"
                onClick={() => {
                    if (remark.length) setRemarks("");
                }}
            />
            <label
                className="modal cursor-pointer fixed"
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
        </>
    );
};
