import signUpSvg from "../assets/img/signin.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../store";
import { useEffect } from "react";

const SignInPage = () => {
    const user = useUserStore((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const validateEmail = (value) => {
        const emailPattern = new RegExp("^[a-z0-9]+@up.edu.ph$");

        if (!emailPattern.test(value)) return "Please put a valid UP email.";
    };

    const signIn = useUserStore((state) => state.signIn);

    const onSubmit = async (data) => {
        const response = await signIn(data.emailInput, data.passwordInput);

        if (!response.success) {
            if (response.errors.email)
                setError("emailInput", {
                    type: "custom",
                    message: response.errors.email,
                });
            if (response.errors.password)
                setError("passwordInput", {
                    type: "custom",
                    message: response.errors.password,
                });
            return;
        }

        console.log(response);
    };

    return (
        <div className="container mx-auto px-5">
            <div className="hero min-h-screen">
                <div className="hero-content w-full flex-col lg:flex-row">
                    <div className="text-center">
                        <img
                            className="w-full object-contain sm:w-auto"
                            src={signUpSvg}
                        />
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 md:mt-6 lg:mt-8 text-primary">
                            Welcome Back
                        </h1>
                        <p className="text-base mt-2">
                            Sign in to your account to view your application.
                        </p>
                    </div>
                    <div className="card flex-shrink-0 shadow-md bg-base-100 flex flex-col">
                        <div className="card-body">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-5"
                            >
                                <div className="form-control">
                                    <label className="label" htmlFor="email">
                                        <span className="label-text font-bold text-primary text-lg">
                                            Email{" "}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="UP Mail"
                                        className="input input-bordered w-full sm:w-auto"
                                        id="email"
                                        {...register("emailInput", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please indicate an email.",
                                            },
                                            validate: validateEmail,
                                        })}
                                    />
                                    {errors.emailInput && (
                                        <span className="label-text-alt text-error mt-2">
                                            {errors.emailInput.message}
                                        </span>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label" htmlFor="password">
                                        <span className="label-text font-bold text-primary text-lg">
                                            {" "}
                                            Password{" "}
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full sm:w-auto"
                                        id="password"
                                        {...register("passwordInput", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please indicate a password.",
                                            },
                                        })}
                                    />
                                    {errors.passwordInput && (
                                        <span className="label-text-alt text-error mt-2">
                                            {errors.passwordInput.message}
                                        </span>
                                    )}
                                </div>

                                <button
                                    className="btn btn-primary w-full font-bold text-gray-200 mt-8"
                                    type="submit"
                                >
                                    LOGIN
                                </button>
                                <div className="flex justify-center">
                                    <Link
                                        className="link link-primary mt-4"
                                        to="/sign-up"
                                    >
                                        Sign up for an account
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

export default SignInPage;
