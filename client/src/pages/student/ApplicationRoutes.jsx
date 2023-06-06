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
const styles = StyleSheet.create({
    page: { backgroundColor: 'white', padding: 40},
    section: { 
        color: 'black', 
        textAlign: 'center', 
        margin: 30, 
        fontFamily: 'Courier' },
    date: {
        fontSize: 16,
        textAlign: 'justified',
        color: 'black',
        fontFamily: 'Courier',
        margin: 15,
      },
    heading: {
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Courier',
        margin: 5, 
    },
    body: {
        fontSize: 14,
        textAlign: 'justified',
        color: 'black',
        fontFamily: 'Courier',
        margin: 5, 
    },
});
const MyDoc = ({application}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>UNIVERSITY OF THE PHILLIPINES LOS BAÑOS</Text>
            </View>
            <View>
                <Text style={styles.heading}>College of Arts and Sciences</Text>
                <Text style={styles.heading}>Institute of Computer Science</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>
            <View>
                <Text style={styles.date}></Text>
            </View>
            <View>
                <Text style={styles.body}> This document certifies that  satisfies the requirements of the institute.</Text>
            </View>
            <View>
                <Text style={styles.date}>Verified:</Text>
            </View>
            <View>
                <Text style={styles.body}>Academic Adviser:</Text>
                <Text style={styles.body}>Clearance Officer:</Text>
            </View>
        </Page>
  </Document>
  );