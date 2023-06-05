import notFound from "../assets/img/notfound.svg";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    };
    return (
        <div className="container h-screen w-screen flex flex-col space-y-100 justify-center items-center mx-auto">
            <div className="m-100 p-5">
                <img className="flex justify-center p-3" src={notFound} />
                <h1 className="font-bold text-3xl lg:text-5xl text-center w-full text-primary mt-100">
                    Page Not Found
                </h1>
                <h3 className="flex justify-center text-center pt-5 pb-1">
                    It seems like we are in a place far away from the universe.
                </h3>
                <h3 className="flex justify-center text-center">
                    Do you want to go back?
                </h3>
            </div>
            <div className="w-screen flex justify-center p-4">
                <button
                    className="btn block btn-primary font-bold text-base"
                    onClick={goHome}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};
//TODO
//add some space between the divs
export default NotFoundPage;
