import { apiAxios } from "../../utils";
import pendingAdviserSVG from "../../assets/img/pendingAdviserApprov.svg";
import adviserRemarksSVG from "../../assets/img/remarks.svg";
import pendingClearanceSVG from "../../assets/img/pendingClearance.svg";
import clearanceApproved from "../../assets/img/approved.svg";
import { useSWRConfig } from "swr";
import { usePDF, Document, Page, PDFDownloadLink, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const ApplicationRoutes = ({ application }) => {
    switch (application.step) {
        case 1:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto"
                        src={pendingAdviserSVG}
                        alt="Pending Adviser Approval"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Pending Adviser Approval
                    </h1>
                    <h3 className="mt-6 text-center">
                        At the moment, we are still waiting for your adviser to
                        review your application. For now, sit tight and relax.
                    </h3>

                    <label
                        className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3"
                        htmlFor="resubmit-link-submission"
                    >
                        RESUBMIT
                    </label>
                    <DeleteButton />
                </div>
            );
        //etc
        case 2:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto"
                        src={adviserRemarksSVG}
                        alt="Pending Adviser Approval"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Adviser Remarks
                    </h1>
                    <h3 className="mt-6 text-center">
                        Your adviser left some remarks for your application.
                        Check them to proceed to the next step.
                    </h3>
                    <div className="flex mt-8 sm:mt-10 gap-5">
                        <label
                            className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3"
                            htmlFor="resubmit-link-submission"
                        >
                            RESUBMIT
                        </label>
                        <label
                            className="btn btn-outline btn-primary mt-8 sm:mt-10 mr-4 px-4 py-2 sm:px-6 sm:py-3"
                            htmlFor="remarks-modal"
                        >
                            VIEW REMARKS
                        </label>
                    </div>
                    <DeleteButton />
                </div>
            );
        case 3:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto"
                        src={pendingClearanceSVG}
                        alt="Pending Adviser Approval"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Pending Clearance Officer Approval
                    </h1>
                    <h3 className="mt-6 text-center">
                        At the moment, we are still waiting for the clearance
                        officer to review your application. For now, sit tight
                        and relax.
                    </h3>

                    <label
                        className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3"
                        htmlFor="remarks-submission"
                    >
                        RESUBMIT
                    </label>
                    <DeleteButton />
                </div>
            );
        case 4:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto"
                        src={adviserRemarksSVG}
                        alt="Pending Adviser Approval"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Clearance Officer Remarks
                    </h1>
                    <h3 className="mt-6 text-center">
                        Your clearance officer left some remarks for your
                        application. Check them to proceed to the next step.
                    </h3>
                    <div className="flex mt-8 sm:mt-10">
                        <label
                            className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3"
                            htmlFor="remarks-submission"
                        >
                            RESUBMIT
                        </label>
                        <label
                            className="btn btn-outline btn-primary mt-8 sm:mt-10 mr-4 px-4 py-2 sm:px-6 sm:py-3"
                            htmlFor="remarks-modal"
                        >
                            VIEW REMARKS
                        </label>
                    </div>
                    <DeleteButton />
                </div>
            );
        case 5:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto"
                        src={clearanceApproved}
                        alt="Pending Adviser Approval"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Clearance Approved
                    </h1>
                    <h3 className="mt-6 text-center">
                        Congratulations, your clearance has been approved.
                        Goodluck on your next journey in life.
                    </h3>

                    <PDFDownloadLink className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3" document={<MyDoc application={application}/>} fileName="clearance.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'PRINT CLEARANCE'
                    }
                    </PDFDownloadLink>
                </div>
            );
    }
};

export default ApplicationRoutes;

const DeleteButton = () => {
    const { mutate } = useSWRConfig();
    const handleDelete = async () => {
        try {
            const resp = await apiAxios.delete("/application");
            mutate("/student");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <button
            className="btn btn-link btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3"
            onClick={handleDelete}
        >
            Delete Application
        </button>
    );
};
const MyDoc = () => (
    <Document>
  </Document>
  );