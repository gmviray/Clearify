import { useEffect, useState } from "react";
import { useUserStore } from "../store";
import { LoadingComponent } from "../components";

const MainPage = () => {
    const user = useUserStore((state) => state.user);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => setLoaded(true), [user]);

    return loaded ? (
        <div className="container h-screen w-screen flex items-center mx-auto">
            {console.log(user.userType)}
            <h1 className="font-bold text-9xl text-center w-full">
                Hello World!
            </h1>
        </div>
    ) : (
        <LoadingComponent />
    );
};

export default MainPage;
