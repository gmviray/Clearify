import { Outlet } from "react-router-dom";

import { useUserStore } from "../../store";

const StudentLayout = () => {
    const signOut = useUserStore((state) => state.signOut);
    return (
        <main>
            <button onClick={signOut} className="btn btn-primary">
                Logout
            </button>
            <Outlet />
        </main>
    );
};

export default StudentLayout;
