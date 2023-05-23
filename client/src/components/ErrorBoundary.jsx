import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { NotFoundPage } from "../pages";

const ErrorBoundary = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error) && error.status === 404)
        return <NotFoundPage />;
};

export default ErrorBoundary;
