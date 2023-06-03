import { useUserStore } from "../../store";
import { apiAxios } from "../../utils";

const StudentPage = () => {
    const user = useUserStore((state) => state.user);

    if (user.userType != "student")
        throw new Response("Not Found", { status: 404 });

    return <section>Student Page</section>;
};

export default StudentPage;
