import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, MainPage, SignInPage, SignUpPage } from "./pages";
import { ErrorBoundary } from "./components";
import React from "react";

// Admin Pages
import { ApproverAccountsPage, StudentAccountsPage } from "./pages/admin";

// Approver Pages
import { ApplicationPage } from "./pages/approver";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "students", element: <StudentAccountsPage /> },
            { path: "approvers", element: <ApproverAccountsPage /> },
            { path: "application/:id", element: <ApplicationPage /> },
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
