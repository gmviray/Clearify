import { useEffect, useState } from "react";
import { useUserStore } from "../store";
import { LoadingComponent } from "../components";
import { useNavigate } from "react-router-dom";
import { StudentLayout } from "./student";
import { ApproverLayout } from "./approver";
import { AdminLayout } from "./admin";

const MainPage = () => {
    const user = useUserStore((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/sign-in");
    }, [user]);

    if (user) {
        if (user.userType == "student") return <StudentLayout />;
        else if (user.userType == "admin") return <AdminLayout />;
        else if (user.userType == "approver") return <ApproverLayout />;
    }
};

export default MainPage;
