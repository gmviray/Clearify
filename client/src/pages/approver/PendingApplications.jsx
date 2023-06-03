import { useUserStore } from "../../store";
import { apiAxios } from "../../utils";

const PendingApplicationsPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "approver")
        throw new Response("Not Found", { status: 404 });

    return <section>Pending Applications</section>;
};

export default PendingApplicationsPage;
