import signUpSvg from "../assets/img/sign-up.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store";
import { useEffect } from "react";
import { apiAxios } from "../utils";

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const user = useUserStore((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    const onSubmit = async (data) => {
        try {
            const resp = await apiAxios.post("/sign-up", data);
            navigate("/");
        } catch (err) {
            console.log(err.response.data);
            // err.response.data.errors.forEach((item) => {
            //     const [key, value] = Object.entries(item)[0];

            //     setError(key, { type: "custom", message: value });
            // });
        }
    };

    return (
        <div className="container mx-auto px-5">
            {" "}
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center">
                        <img
                            className="w-full object-contain sm:w-auto"
                            src={signUpSvg}
                        />
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 md:mt-6 lg:mt-8 text-primary">
                            Create Account
                        </h1>

                        <p className="text-base mt-2">
                            Let's set you an account so that you can proceed to
                            your next journey in life, getting a job.
                        </p>
                    </div>
                    <div className="card flex-shrink-0 shadow-md bg-base-100 flex flex-col w-full max-w-3xl">
                        <div className="card-body">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-5"
                            >
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="form-control">
                                        <label
                                            className="label"
                                            htmlFor="firstname"
                                        >
                                            <span className="label-text font-bold text-primary">
                                                {" "}
                                                First Name{" "}
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="input input-bordered w-full sm:w-auto"
                                            id="firstname"
                                            {...register("firstName", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please indicate a first name.",
                                                },
                                            })}
                                        />
                                        {errors.firstName && (
                                            <span className="label-text-alt text-error">
                                                {errors.firstName.message}
                                            </span>
                                        )}
                                        {/* </div> */}
                                    </div>
                                    {/* <div className="basis-1/2"> */}
                                    <div className="form-control">
                                        <label
                                            className="label"
                                            htmlFor="middlename"
                                        >
                                            <span className="label-text font-bold text-primary">
                                                {" "}
                                                Middle Name{" "}
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Middle Name"
                                            className="input input-bordered  w-full sm:w-auto"
                                            id="middlename"
                                            {...register("middleName")}
                                        />
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    {/* <div className="basis-1/2"> */}
                                    <div className="form-control">
                                        <label
                                            className="label"
                                            htmlFor="lastname"
                                        >
                                            <span className="label-text font-bold text-primary">
                                                {" "}
                                                Last Name{" "}
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="input input-bordered  w-full sm:w-auto"
                                            id="lastname"
                                            {...register("lastName", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please indicate a last name.",
                                                },
                                            })}
                                        />
                                        {errors.lastName && (
                                            <span className="label-text-alt text-error">
                                                {errors.lastName.message}
                                            </span>
                                        )}
                                        {/* </div> */}
                                    </div>
                                    {/* <div className="basis-1/2"> */}
                                    <div className="form-control">
                                        <label
                                            className="label"
                                            htmlFor="email"
                                        >
                                            <span className="label-text font-bold text-primary">
                                                {" "}
                                                Email{" "}
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="UP Mail"
                                            className="input input-bordered w-full sm:w-auto"
                                            id="email"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please indicate an email.",
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <span className="label-text-alt text-error">
                                                {errors.email.message}
                                            </span>
                                        )}

                                        {/* </div> */}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="form-control">
                                        <label
                                            className="label"
                                            htmlFor="studentnum"
                                        >
                                            <span className="label-text font-bold text-primary">
                                                {" "}
                                                Student Number{" "}
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Student Number"
                                            className="input input-bordered  w-full sm:w-auto"
                                            id="studentnum"
                                            {...register("studentNumber", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please indicate a student number.",
                                                },
                                            })}
                                        />
                                        {errors.studentNumber && (
                                            <span className="label-text-alt text-error">
                                                {errors.studentNumber.message}
                                            </span>
                                        )}
                                    </div>
                                    {/* <div className="basis-1/2"> */}
                                    <div className="form-control">
                                        <label
                                            className="label"
                                            htmlFor="password"
                                        >
                                            <span className="label-text font-bold text-primary">
                                                {" "}
                                                Password{" "}
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            className="input input-bordered  w-full sm:w-auto"
                                            id="password"
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please indicate a password.",
                                                },
                                            })}
                                        />
                                        {errors.password && (
                                            <span className="label-text-alt text-error">
                                                {errors.password.message}
                                            </span>
                                        )}
                                        {/* </div> */}
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary w-full font-bold text-gray-200 mt-8"
                                    type="submit"
                                >
                                    SUBMIT APPLICATION
                                </button>
                                <div className="flex justify-center">
                                    <Link
                                        className="link link-primary mt-4"
                                        to="/sign-in"
                                    >
                                        Sign in to your account
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
