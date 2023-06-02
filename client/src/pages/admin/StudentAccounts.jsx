import { useEffect } from "react";
import { useUserStore } from "../../store";

const StudentAccountsPage = () => {
    const user = useUserStore((state) => state.user);

    useEffect(() => {}, [user]);

    if (user.userType != "admin")
        throw new Response("Not Found", { status: 404 });

    return <section>Student Account</section>;
};

export default StudentAccountsPage;
