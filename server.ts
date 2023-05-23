import app from "./app";
import connectDB from "./db/connect";
import config from "./config";

const start = async () => {
    try {
        console.log("============================");
        // use this to check if mongodb exists in config
        if (config.mongodb) await connectDB(config.mongodb);

        // start port
        app.listen(config.port, () =>
            console.log(
                `Server started on port http://localhost:${config.port}`
            )
        );
    } catch (err) {
        console.log("FAILED TO START THE API");
    }
};

start();
