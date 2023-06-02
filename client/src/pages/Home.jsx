import { useUserStore } from "../store";
import { PendingAccountsPage } from "./admin";

const HomePage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType == "admin") return <PendingAccountsPage />;
};

export default HomePage;
