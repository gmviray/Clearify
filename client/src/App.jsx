import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage, SignInPage, SignUpPage } from "./pages";
import { ErrorBoundary } from "./components";

const router = createBrowserRouter([
    { path: "/", element: <MainPage />, errorElement: <ErrorBoundary /> },
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
