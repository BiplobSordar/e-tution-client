
export const passwordRules = {
  required: "Password is required",
  minLength: { value: 8, message: "Minimum 8 characters" },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    message: "At least one letter and one number",
  },
};
