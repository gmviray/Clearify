import { useForm } from "react-hook-form";

import { apiAxios } from "../../utils";

import { useSWRConfig } from "swr";

import { useRef } from "react";

export default () => {
    const checkboxRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    const { mutate } = useSWRConfig();

    const submitForm = async (data) => {
        try {
            const resp = await apiAxios.post("/sign-up/approver", data);
            reset();
            checkboxRef.current.checked = false;
            mutate("/approvers");
        } catch (err) {
            for (const item of err.response.data.errors) {
                const [key, value] = Object.entries(item)[0];

                setError(key, { type: "custom", message: value });
            }
        }
    };

    return (
        <>
            <input
                type="checkbox"
                id="create-account-modal"
                className="modal-toggle"
                ref={checkboxRef}
            />
            <label
                className="modal cursor-pointer"
                htmlFor="create-account-modal"
            >
                <label className="modal-box md:px-10 md:py-8 w-11/12 max-w-5xl h-auto">
                    <label
                        htmlFor="create-account-modal"
                        className="btn btn-sm btn-circle btn-primary absolute right-5 top-5 text-xl"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold md:text-xl text-primary mb-3">
                        Create Account
                    </h3>
                    <form
                        onSubmit={handleSubmit(submitForm)}
                        className="w-full flex flex-col gap-5"
                    >
                        <div className="flex w-full gap-10">
                            <div className="flex-1">
                                <label
                                    htmlFor="username"
                                    className="py-2 block mb-1 text-primary font-bold"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Enter a username"
                                    id="username"
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: "Please put a username.",
                                        },
                                    })}
                                />
                                {errors.username && (
                                    <span className="label-text-alt text-error mt-2">
                                        {errors.username.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="email"
                                    className="py-2 block mb-1 text-primary font-bold"
                                >
                                    UP Mail
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    placeholder="Enter a UP mail"
                                    id="email"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Please put a UP mail.",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <span className="label-text-alt text-error mt-2">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full gap-10">
                            <div className="flex-1">
                                <label
                                    htmlFor="firstName"
                                    className="py-2 block mb-1 text-primary font-bold"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Enter a first name"
                                    id="firstName"
                                    {...register("firstName", {
                                        required: {
                                            value: true,
                                            message: "Please put a first name.",
                                        },
                                    })}
                                />
                                {errors.firstName && (
                                    <span className="label-text-alt text-error mt-2">
                                        {errors.firstName.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="middleName"
                                    className="py-2 block mb-1 text-primary font-bold"
                                >
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Enter a middle name"
                                    id="middleName"
                                    {...register("middleName", {
                                        required: false,
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-10">
                            <div className="flex-1">
                                <label
                                    htmlFor="lastName"
                                    className="py-2 block mb-1 text-primary font-bold"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Enter a last name"
                                    id="lastName"
                                    {...register("lastName", {
                                        required: {
                                            value: true,
                                            message: "Please put a last name.",
                                        },
                                    })}
                                />
                                {errors.lastName && (
                                    <span className="label-text-alt text-error mt-2">
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="password"
                                    className="py-2 block mb-1 text-primary font-bold"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    placeholder="Enter a password"
                                    id="password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Please put a password.",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <span className="label-text-alt text-error mt-2">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center py-2">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5"
                                    id="clearanceOfficer"
                                    {...register("clearanceOfficer")}
                                />
                                <label
                                    htmlFor="clearanceOfficer"
                                    className="ml-2"
                                >
                                    Mark as Clearance Officer
                                </label>
                            </div>
                            {errors.clearanceOfficer && (
                                <span className="label-text-alt text-error mt-2 block">
                                    {errors.clearanceOfficer.message}
                                </span>
                            )}
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary w-full h-3"
                            >
                                CREATE
                            </button>
                        </div>
                    </form>
                </label>
            </label>
        </>
    );
};
