import { useUserStore } from "../../store";

const PendingAccountsPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "admin")
        throw new Response("Not Found", { status: 404 });

    return <section>Pending Accounts</section>;
};

export default PendingAccountsPage;
