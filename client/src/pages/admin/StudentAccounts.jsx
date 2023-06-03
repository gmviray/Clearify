import { useUserStore } from "../../store";
import { useEffect } from "react";
import { apiAxios } from "../../utils";

const StudentAccountsPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "admin")
        throw new Response("Not Found", { status: 404 });

    return <section>Student Account</section>;
};

export default StudentAccountsPage;
