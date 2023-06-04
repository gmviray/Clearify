import img from "../../assets/img/clearanceApplication.svg";

import { useSWRConfig } from "swr";

import { useState } from "react";

import { apiAxios } from "../../utils";

const ClearanceApplicationPage = ({ studentNumber }) => {
    const [link, setLink] = useState("");
    const { mutate } = useSWRConfig();
    const applyApplication = async () => {
        try {
            await apiAxios.post("/application", {
                studentNumber,
                link,
            });

            mutate("/student");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <img
                src={img}
                alt="Women waiting on the bench"
                className="w-full lg:w-auto"
            />
            <h2 className="text-xl text-center md:text-3xl font-bold text-primary">
                Clearance Application
            </h2>
            <p className="lg:w-2/5 text-center">
                Are you ready to start your next journey after college? Apply
                for a clearance approval by clicking the button below.
            </p>
            <label className="btn btn-primary" htmlFor="link-submission">
                Apply
            </label>

            <input
                type="checkbox"
                id="link-submission"
                className="modal-toggle"
            />
            <label className="modal cursor-pointer" htmlFor="link-submission">
                <label className="modal-box md:px-10 md:py-8">
                    <label
                        htmlFor="user-profile-modal"
                        className="btn btn-sm btn-circle btn-primary absolute right-5 top-5 text-xl"
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
                    <div className="modal-action justify-start">
                        <label
                            htmlFor="link-submission"
                            className="btn btn-primary"
                            onClick={applyApplication}
                        >
                            Submit
                        </label>
                    </div>
                </label>
            </label>
        </>
    );
};

export default ClearanceApplicationPage;
