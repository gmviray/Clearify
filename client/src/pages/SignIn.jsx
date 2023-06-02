import signUpSvg from '../assets/img/signin.svg';
import { Link } from 'react-router-dom';

const SignInPage = () => {
    return (
        <div className="container mx-auto px-5"> <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center">
                    <img class='h-fit max-w-lg rounded-lg' src={signUpSvg} />
                    <h1 className="text-5xl font-bold mt-6 text-primary">
                        Welcome Back
                    </h1>
                    <h3 className="text-min font-bold mt-6">
                        Sign in to your account to view your application.
                    </h3>
                </div>
                <div className="card flex-shrink-0 w-full shadow-md bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text font-bold text-primary"> Email </span>
                            </label>
                            <input type="text" placeholder="UP Mail" className="input input-bordered" id="email" />
                            <label className="label">
                                <span className="label-text-alt text-error">Invalid email address</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text font-bold text-primary"> Password </span>
                            </label>
                            <input type="password" placeholder="Enter your password" className="input input-bordered" id="password" />
                        </div>

                        <button className="btn btn-primary w-full font-bold text-gray-200 mt-8">
                            LOGIN
                        </button>

                        <Link to="/sign-up" className="link link-primary text-center mt-4">
                            Sign up for an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignInPage;
