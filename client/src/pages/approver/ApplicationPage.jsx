import { useUserStore } from "../../store";
import { useParams } from "react-router-dom";
import { apiAxios } from "../../utils";

const ApplicationPage = () => {
    const user = useUserStore((state) => state.user);
    const { id } = useParams();

    if (user.userType != "approver")
        throw new Response("Not Found", { status: 404 });

    return <section>Clearance Application Page # {id}</section>;
};

export default ApplicationPage;
