import img from "../../assets/img/pendingAccount.svg";

const PendingAccountPage = ({ onClick }) => {
    return (
        <>
            <img
                src={img}
                alt="Women waiting on the bench"
                className="w-full lg:w-auto"
            />
            <h2 className="text-xl text-center md:text-3xl font-bold text-primary">
                Pending Account Approval
            </h2>
            <p className="lg:w-2/5 text-center">
                Kindly wait for the administrator to approve your account. Maybe
                they are still pondering about life.
            </p>
            <button onClick={onClick} className="btn btn-primary">
                Sign Out
            </button>
        </>
    );
};

export default PendingAccountPage;