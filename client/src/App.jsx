import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, MainPage, SignInPage, SignUpPage } from "./pages";
import { ErrorBoundary } from "./components";
import React from "react";

// Admin Pages
import { ApproverAccountsPage, StudentAccountsPage } from "./pages/admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorBoundary />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/students", element: <StudentAccountsPage /> },
            { path: "/approvers", element: <ApproverAccountsPage /> },
        ],
    },
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
]);

const App = () => (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

export default App;
