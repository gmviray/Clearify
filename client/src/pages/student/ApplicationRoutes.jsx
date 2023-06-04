import { apiAxios } from "../../utils";
import pendingAdviserSVG from "../../assets/img/pendingAdviserApprov.svg";
import adviserRemarksSVG from "../../assets/img/remarks.svg";
import pendingClearanceSVG from "../../assets/img/pendingClearance.svg";
import clearanceApproved from "../../assets/img/approved.svg";


const ApplicationRoutes = ({ application }) => {
    // view the contents of an application
    console.log(application);




    switch (application.step) {
        case 1:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto" src={pendingAdviserSVG} alt="Pending Adviser Approval" />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Pending Adviser Approval
                    </h1>
                    <h3 className="mt-6 text-center">
                        At the moment, we are still waiting for your adviser to
                        review your application. For now, sit tight and relax.
                    </h3>

                    <button className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3">RESUBMIT</button>
                    <button className="btn btn-link btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3">Delete Application</button>
                </div>
            );
        //etc
        case 2:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto" src={adviserRemarksSVG} alt="Pending Adviser Approval" />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Adviser Remarks
                    </h1>
                    <h3 className="mt-6 text-center">
                        Your adviser left some remarks for your application.
                        Check them to proceed to the next step.
                    </h3>
                    <div className="flex mt-8 sm:mt-10">
                        <button className="btn btn-primary mt-8 sm:mt-10 mr-4 px-4 py-2 sm:px-6 sm:py-3">RESUBMIT</button>
                        <button className="btn btn-outline btn-primary mt-8 sm:mt-10 mr-4 px-4 py-2 sm:px-6 sm:py-3">VIEW REMARKS</button>
                    </div>
                    <button className="btn btn-link btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3">Delete Application</button>
                </div>
            );
        case 3:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto" src={pendingClearanceSVG} alt="Pending Adviser Approval" />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Pending Adviser Approval
                    </h1>
                    <h3 className="mt-6 text-center">
                        At the moment, we are still waiting for the clearance officer to review your application. For now, sit tight and relax.
                    </h3>

                    <button className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3">RESUBMIT</button>
                    <button className="btn btn-link btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3">Delete Application</button>
                </div>
            );
        case 4:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto" src={adviserRemarksSVG} alt="Pending Adviser Approval" />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Adviser Remarks
                    </h1>
                    <h3 className="mt-6 text-center">
                        Your clearance officer left some remarks for your application.
                        Check them to proceed to the next step.
                    </h3>
                    <div className="flex mt-8 sm:mt-10">
                        <button className="btn btn-primary mt-8 sm:mt-10 mr-4 px-4 py-2 sm:px-6 sm:py-3">RESUBMIT</button>
                        <button className="btn btn-outline btn-primary mt-8 sm:mt-10 mr-4 px-4 py-2 sm:px-6 sm:py-3">VIEW REMARKS</button>
                    </div>
                    <button className="btn btn-link btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3">Delete Application</button>
                </div>
            );
        case 5:
            return (
                <div className="flex flex-col items-center justify-center">
                    <img className="w-full sm:w-lg max-w-xs mt-8 sm:mt-20 mx-auto" src={clearanceApproved} alt="Pending Adviser Approval" />
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-primary text-center">
                        Clearance Approved
                    </h1>
                    <h3 className="mt-6 text-center">
                        Congratulations, your clearance has been approved. Goodluck on your next journey in life.
                    </h3>

                    <button className="btn btn-primary mt-8 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3">PRINT CLEARANCE</button>
                </div>
            );
    }
};

export default ApplicationRoutes;
