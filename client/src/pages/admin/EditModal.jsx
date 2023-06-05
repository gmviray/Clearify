import { useForm } from "react-hook-form";

import { apiAxios } from "../../utils";

import { useSWRConfig } from "swr";

import { useRef, useState } from "react";

import useEditStore from "./editStore";

export default () => {
    const checkboxRef = useRef(null);

    const user = useEditStore((state) => state.user);
    const setUser = useEditStore((state) => state.setUser);

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
            const resp = await apiAxios.patch(`/approver/${user.username}`, {
                ...data,
                clearanceOfficer: user?.clearanceOfficer
                    ? !data.clearanceOfficer
                    : data.clearanceOfficer,
            });
            console.log(resp);
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
                id="edit-account-modal"
                className="modal-toggle"
                ref={checkboxRef}
            />
            <label
                className="modal cursor-pointer"
                htmlFor="edit-account-modal"
            >
                <label className="modal-box md:px-10 md:py-8 w-11/12 max-w-5xl h-auto">
                    <label
                        htmlFor="edit-account-modal"
                        className="btn btn-sm btn-circle btn-primary absolute right-5 top-5 text-xl"
                        onClick={() => setUser(undefined)}
                    >
                        ✕
                    </label>
                    <h3 className="font-bold md:text-xl text-primary mb-3">
                        Edit Account
                    </h3>
                    <form
                        onSubmit={handleSubmit(submitForm)}
                        className="w-full flex flex-col gap-5"
                    >
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
                                    id="firstName"
                                    {...register("firstName")}
                                    placeholder={
                                        user?.firstName || "Enter a first name"
                                    }
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
                                    id="middleName"
                                    {...register("middleName")}
                                    placeholder={
                                        user?.middleName ||
                                        "Enter a middle name"
                                    }
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
                                    id="lastName"
                                    {...register("lastName")}
                                    placeholder={
                                        user?.lastName || "Enter a last name"
                                    }
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
                                    {...register("password")}
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
                                    {user?.clearanceOfficer ? "Remove" : "Mark"}{" "}
                                    as Clearance Officer
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
                                EDIT
                            </button>
                        </div>
                    </form>
                </label>
            </label>
        </>
    );
};
