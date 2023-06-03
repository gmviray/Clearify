import { useUserStore } from "../../store";
import { apiAxios } from "../../utils";

const ApproverAccountsPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "admin")
        throw new Response("Not Found", { status: 404 });

    return <section>Approvers</section>;
};

export default ApproverAccountsPage;
