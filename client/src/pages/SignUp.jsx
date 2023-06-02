import signUpSvg from '../assets/img/sign-up.svg';
import { useForm } from "react-hook-form";

const SignUpPage = () => {
    return (
        <div className="container mx-auto px-5"> <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center">
                    <img class='h-fit max-w-lg rounded-lg' src={signUpSvg} />
                    <h1 className="text-5xl font-bold mt-6 text-primary">
                        Create Account
                    </h1>

                    <h3 className="text-min font-bold mt-6">
                        Let's set you an account!
                    </h3>
                </div>
                <div className="card flex-shrink-0 w-full shadow-md bg-base-100">
                    <div className="card-body">
                        <div className="flex flex-row gap-5">
                            <div class="basis-1/2">
                                <div className="form-control">
                                    <label className="label" htmlFor="firstname">
                                        <span className="label-text font-bold text-primary"> First Name </span>
                                    </label>
                                    <input type="text" placeholder="First Name" className="input input-bordered" id="firstname" />
                                </div>
                            </div>
                            <div className="basis-1/2">
                                <div className="form-control">
                                    <label className="label" htmlFor="middlename">
                                        <span className="label-text font-bold text-primary"> Middle Name </span>
                                    </label>
                                    <input type="text" placeholder="Middle Name" className="input input-bordered" id="middlename" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5">
                            <div class="basis-1/2">
                                <div className="form-control">
                                    <label className="label" htmlFor="lastname">
                                        <span className="label-text font-bold text-primary" htmlFor="lastname"> Last Name </span>
                                    </label>
                                    <input type="text" placeholder="Last Name" className="input input-bordered" id="lastname" />
                                </div>
                            </div>
                            <div class="basis-1/2">
                                <div className="form-control">
                                    <label className="label" htmlFor="studentnum">
                                        <span className="label-text font-bold text-primary"> Student Number </span>
                                    </label>
                                    <input type="text" placeholder="Student Number" className="input input-bordered" id="studentnum" />
                                </div>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text font-bold text-primary"> Email </span>
                            </label>
                            <input type="text" placeholder="UP Mail" className="input input-bordered" id="email" />
                            <label className="label">
                                <span className="label-text-alt text-error">Invalid email address</span>
                            </label>
                        </div>
                        <div className="flex flex-row gap-5">
                            <div class="basis-1/2">
                                <div className="form-control">
                                    <label className="label" htmlFor="password">
                                        <span className="label-text font-bold text-primary"> Password </span>
                                    </label>
                                    <input type="password" placeholder="Enter your password" className="input input-bordered" id="password" />
                                </div>
                            </div>
                            <div class="basis-1/2">
                                <div className="form-control">
                                    <label className="label" htmlFor="confirm">
                                        <span className="label-text font-bold text-primary"> Confirm Password </span>
                                    </label>
                                    <input type="password" placeholder="Enter your password" className="input input-bordered" id="confirm" />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary w-full font-bold text-gray-200 mt-8">
                            SUBMIT APPLICATION
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
};

export default SignUpPage;
