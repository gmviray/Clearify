const LoadingComponent = () => {
    return (
        <>
            <section className="h-full fixed flex flex-col items-center justify-center gap-2 z-10 bg-white w-full top-0 left-0 opacity-70">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                    <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-primary opacity-75"></div>
                </div>
            </section>
        </>
    );
};

export default LoadingComponent;
