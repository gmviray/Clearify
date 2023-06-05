import img from "../../assets/img/clearanceApplication.svg";

const ClearanceApplicationPage = () => {
    return (
        <>
            <img
                src={img}
                alt="Women waiting on the bench"
                className="w-full lg:w-auto"
            />
            <h2 className="text-xl text-center md:text-3xl font-bold text-primary">
                Clearance Application
            </h2>
            <p className="lg:w-2/5 text-center">
                Are you ready to start your next journey after college? Apply
                for a clearance approval by clicking the button below.
            </p>
            <label className="btn btn-primary" htmlFor="link-submission">
                Apply
            </label>
        </>
    );
};

export default ClearanceApplicationPage;
