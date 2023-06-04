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
        <div className="container mx-auto px-5 sm:px-6 lg:px-8"> <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
            <div class="text-center">
        <img class="max-w-full h-auto mx-auto"
            src={signUpSvg}
            alt="Sign Up" />
        <h1 class="text-5xl font-bold mt-6 text-primary">
            Create Account
        </h1>
        <h3 class="text-min font-bold mt-6">
            Let's set you an account so that you can proceed to your next journey in life, getting a job.
        </h3>
    </div>
                <div className="card flex-shrink-0 w-full lg:w-1/2 shadow-md bg-base-100">
                <div class="card-body">
              <form
                  onSubmit={handleSubmit(onSubmit)}
                  class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <div class="form-control">
                              <label
                                  for="firstname"
                                  class="label">
                                  <span class="label-text font-bold text-primary">First Name</span>
                              </label>
                              <input
                                  type="text"
                                  placeholder="First Name"
                                  class="input input-bordered"
                                  id="firstname" {...register("firstname", { required: true })} />

                              {errors.firstname && (
                                  <span class="label-text-alt text-error">This is a required field.</span>
                              )}
                          </div>
                      </div>
                      <div>
                          <div class="form-control">
                              <label
                                  for="middlename"
                                  class="label">
                                  <span class="label-text font-bold text-primary">Middle Name</span>
                              </label>
                              <input
                                  type="text"
                                  placeholder="Middle Name"
                                  class="input input-bordered"
                                  id="middlename" {...register("midname")} />
                          </div>
                      </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <div class="form-control">
                              <label
                                  for="lastname"
                                  class="label">
                                  <span class="label-text font-bold text-primary">Last Name</span>
                              </label>
                              <input
                                  type="text"
                                  placeholder="Last Name"
                                  class="input input-bordered"
                                  id="lastname" {...register("lastname", { required: true })} />

                              {errors.lastname && (
                                  <span class="label-text-alt text-error">This is a required field.</span>
                              )}
                          </div>
                      </div>
                      <div>
                          <div class="form-control">
                              <label
                                  for="studentnum"
                                  class="label">
                                  <span class="label-text font-bold text-primary">Student Number</span>
                              </label>
                              <input
                                  type="text"
                                  placeholder="Student Number"
                                  class="input input-bordered"
                                  id="studentnum" {...register("studentnum", { required: true })} />

                              {errors.studentnum && (
                                  <span class="label-text-alt text-error">This is a required field.</span>
                              )}

                          </div>
                      </div>
                  </div>
                  <div class="form-control">
                      <label
                          for="email"
                          class="label">
                          <span class="label-text font-bold text-primary">Email</span>
                      </label>
                      <input
                          type="text"
                          placeholder="UP Mail"
                          class="input input-bordered"
                          id="email" {...register("emailInput", { required: true })} />

                      {errors.emailInput && (
                          <span class="label-text-alt text-error">Invalid email address</span>
                      )}
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <div class="form-control">
                              <label
                                  for="password"
                                  class="label">
                                  <span class="label-text font-bold text-primary">Password</span>
                              </label>
                              <input
                                  type="password"
                                  placeholder="Enter your password"
                                  class="input input-bordered"
                                  id="password"
                                  {...register("passwordInput", { required: true })}
                              />
                              {errors.passwordInput && (
                                  <span class="label-text-alt text-error">This is a required field.</span>
                              )}
                          </div>
                      </div>
                      <div>
                          <div class="form-control">
                              <label for="confirm" class="label">
                                  <span class="label-text font-bold text-primary">Confirm Password</span>
                              </label>
                              <input
                                  type="password"
                                  placeholder="Enter your password"
                                  class="input input-bordered"
                                  id="confirm"
                                  {...register("confirmPW", { required: true })}
                              />
                              {errors.confirmPW && (
                                  <span class="label-text-alt text-error">This is a required field.</span>
                              )}
                          </div>
                      </div>
                  </div>

                  <button type="submit" class="btn btn-primary w-full font-bold text-gray-200 mt-8">
                      SUBMIT APPLICATION
                  </button>
                  <div class="flex justify-center">
                      <Link to="/sign-in" class="link link-primary mt-4">
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
