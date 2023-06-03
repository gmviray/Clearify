import { useUserStore } from "../store";
import { PendingAccountsPage } from "./admin";
import { PendingApplicationsPage } from "./approver";

const HomePage = () => {
    const user = useUserStore((state) => state.user);

    switch (user.userType) {
        case "admin":
            return <PendingAccountsPage />;
        case "approver":
            return <PendingApplicationsPage />;
        default:
            return <div></div>;
    }
};

export default HomePage;
