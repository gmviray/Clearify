import { string, object } from "yup";

export default object({
    firstName: string().required("Please indicate a first name."),
    middleName: string(),
    lastName: string().required("Please indicate a last name."),
    email: string()
        .email("Please indicate a valid UP email.")
        .required("Please indicate an email")
        .test("is-valid-email", (value, _) => {
            const pattern = new RegExp("^[a-z0-9]+@up.edu.ph$");

            return pattern.test(value);
        }),
    password: string()
        .required("Please indicate a password.")
        .min(8, "Your password should be at least 8 characters long."),
    studentNumber: string().required("Please indicate a student number."),
});
