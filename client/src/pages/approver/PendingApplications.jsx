import { apiAxios } from "../../utils";
// component
import { LoadingComponent } from "../../components";
import DataComponent from "./DataComponent";
import noApproval from "../../assets/img/noApproval.svg";

import useSWR from "swr";
import { useUserStore } from "../../store";

const PendingApplicationsPage = () => {
    const user = useUserStore((state) => state.user);

    const { data, error, isLoading } = useSWR(
        user.clearanceOfficer ? "/officer/pending" : "/adviser/pending",
        (url) => apiAxios.get(url).then((res) => res.data)
    );

    if (error) return <div>ERROR</div>;

    if (isLoading) return <LoadingComponent />;

    return (
        <section>
            <h1 className="text-4xl font-bold text-base-content mb-6">
                Pending Applications
            </h1>
            {data.data.length ? (
                <DataComponent
                    data={[...data.data]}
                    officer={user.clearanceOfficer}
                />
            ) : (
                <div className="flex flex-col w-full items-center my-10 gap-5">
                    <img
                        src={noApproval}
                        alt="No pending application."
                        className="max-w-xl"
                    />
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-3xl text-primary font-bold">
                            Empty Applications
                        </h3>
                        <p>You do not have any applications to review.</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PendingApplicationsPage;
