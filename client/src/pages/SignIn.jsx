import signUpSvg from '../assets/img/signin.svg';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const SignInPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example"));
    return (
        <div className="container mx-auto px-5"> <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center">
                    <img className='h-fit max-w-lg rounded-lg' src={signUpSvg} />
                    <h1 className="text-5xl font-bold mt-6 text-primary">
                        Welcome Back
                    </h1>
                    <h3 className="text-min font-bold mt-6">
                        Sign in to your account to view your application.
                    </h3>
                </div>
                <div className="card flex-shrink-0 w-full shadow-md bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text font-bold text-primary"> Email </span>
                                </label>
                                <input type="text" placeholder="UP Mail" className="input input-bordered" id="email" {...register("emailInvalid", { required: true })} />
                                {errors.emailInvalid && <span className="label-text-alt text-error">Invalid email address</span>}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="password">
                                    <span className="label-text font-bold text-primary"> Password </span>
                                </label>
                                <input type="password" placeholder="Enter your password" className="input input-bordered" id="password" {...register("passwordInvalid", { required: true })} />
                                {errors.passwordInvalid && <span className="label-text-alt text-error">This is a required field.</span>}
                            </div>

                            <button className="btn btn-primary w-full font-bold text-gray-200 mt-8" type="submit">
                                LOGIN
                            </button>
                            <div className='flex justify-center'>
                                <Link className="link link-primary mt-4" to="/sign-up">
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
