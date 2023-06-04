import img from "../../assets/img/pendingAdviser.svg";

const PendingAdviserPage = ({ onClick }) => {
    return (
        <>
            <img
                src={img}
                alt="Women waiting on the bench"
                className="w-full lg:w-auto"
            />
            <h2 className="text-xl text-center md:text-3xl font-bold text-primary">
                Pending Adviser
            </h2>
            <p className="lg:w-2/5 text-center">
                Administrator is still choosing an adviser for you. May the
                force bless you with a kind adviser.
            </p>
            <button onClick={onClick} className="btn btn-primary">
                Sign Out
            </button>
        </>
    );
};

export default PendingAdviserPage;
