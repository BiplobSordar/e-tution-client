import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser, setLoading } from "../features/auth/authSlice";
import { passwordRules } from "../utils/validation";
import { useRegisterUserMutation, useFirebaseLoginMutation } from "../features/auth/authApi";
import { handleError } from "../utils/errorHandler";

const Register = () => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: "", email: "", password: "", role: "student" },
  });

  const [registerUser, { isLoading: registerLoading, isSuccess: registerSuccess, isError: registerError, error: registeErr }] = useRegisterUserMutation();
  const [firebaseLogin, { isLoading: googleLoading, isError: googleError, error: googleErr }] = useFirebaseLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    dispatch(setLoading(true));
    try {

      const userCreate = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = await userCreate.user.getIdToken();



      const data = await registerUser({
        idToken,
        body: { name: formData.name, role: formData.role, provider: "email" },
      }).unwrap();
      if (data?.status == 200) {
        signOut(auth)

      }

      toast.success('User Registation Successfull.')
    
          navigate("/login");
    
    } catch (err) {
      const { message } = handleError(err)
      console.log(err)
      toast.error(message || "Registration failed")


    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogle = async () => {
    dispatch(setLoading(true));
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const data = await firebaseLogin({ idToken }).unwrap();
      dispatch(setUser({ user: data.user, accessToken: data?.accessToken }));
      toast.success('User Registation Successfull.')
      switch (data.user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "student":
          navigate("/student");
          break;
        case "guardian":
          navigate("/guardian");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      const { message } = handleError(err)
      console.log(err)
      toast.error(message || "Google sign-in failed")

    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[var(--card-bg)] p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Create an account</h2>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 mb-4 py-2 rounded border hover:bg-[var(--hover-bg)]"
        >
          <img src="/google.webp" alt="Google" className="h-8 w-8" />
          Continue with Google
        </button>

        <div className="text-center text-sm text-[var(--text-secondary)] mb-3">or sign up with email</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input {...register("name", { required: "Name is required" })} className="w-full border rounded px-3 py-2" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input {...register("email", { required: "Email required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className="w-full border rounded px-3 py-2" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

       
          <div>
            <label className="block text-sm mb-1">Role</label>
            <div className="flex gap-3 items-center">
              {["student", "tutor", "guardian"].map((role) => (
                <label key={role} className="flex items-center gap-2">
                  <input type="radio" value={role} {...register("role")} defaultChecked={role === "student"} />
                  <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

        
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" {...register("password", passwordRules)} className="w-full border rounded px-3 py-2" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            <p className="text-xs text-[var(--text-secondary)] mt-1">Min 8 chars, at least one letter and one number.</p>
          </div>

          <button disabled={isSubmitting} className="w-full btn-primary mt-2">
            {isSubmitting || registerLoading ? "Creating..." : "Create account"}
          </button>

          <div className="text-sm text-[var(--text-secondary)] text-center">
            Already have an account? <Link to="/login" className="text-[var(--primary)]">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
