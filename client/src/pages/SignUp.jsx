import signUpSvg from "../assets/img/sign-up.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store";
import { useEffect } from "react";

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const user = useUserStore((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    const onSubmit = (data) => console.log(data);
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

                        <h3 className="text-base md:text-lg lg:text-xl font-bold mt-6 md:mt-8 lg:mt-10">
  Let's set you an account so that you can proceed to your next journey in life, getting a job.
</h3>
                    </div>
                    <div className="card flex-shrink-0 shadow-md bg-base-100 flex flex-col">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                                                {...register("firstname", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.firstname && (
                                                <span className="label-text-alt text-error">
                                                    This is a required field.
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
                                                {...register("midname")}
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
                                                {...register("lastname", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.lastname && (
                                                <span className="label-text-alt text-error">
                                                    This is a required field.
                                                </span>
                                            )}
                                        {/* </div> */}
                                    </div>
                                    {/* <div className="basis-1/2"> */}
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
                                                {...register("studentnum", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.studentnum && (
                                                <span className="label-text-alt text-error">
                                                    This is a required field.
                                                </span>
                                            )}
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label" htmlFor="email">
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
                                        {...register("emailInput", {
                                            required: true,
                                        })}
                                    />
                                    {errors.emailInput && (
                                        <span className="label-text-alt text-error">
                                            Invalid email address
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                                                {...register("passwordInput", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.passwordInput && (
                                                <span className="label-text-alt text-error">
                                                    This is a required field.
                                                </span>
                                            )}
                                        {/* </div> */}
                                    </div>
                                    {/* <div className="basis-1/2"> */}
                                        <div className="form-control">
                                            <label
                                                className="label"
                                                htmlFor="confirm"
                                            >
                                                <span className="label-text font-bold text-primary">
                                                    {" "}
                                                    Confirm Password{" "}
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="input input-bordered  w-full sm:w-auto"
                                                id="confirm"
                                                {...register("confirmPW", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.confirmPW && (
                                                <span className="label-text-alt text-error">
                                                    This is a required field.
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
