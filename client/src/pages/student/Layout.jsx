import { Outlet } from "react-router-dom";

const StudentLayout = () => {
    return (
        <main className="container mx-auto min-h-screen relative">
            <Outlet />
        </main>
    );
};

export default StudentLayout;
