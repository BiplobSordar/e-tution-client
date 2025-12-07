import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser, setLoading, } from "../features/auth/authSlice";
import { useLoginUserMutation, useFirebaseLoginMutation } from "../features/auth/authApi";
import toast from "react-hot-toast";
import { handleError } from "../utils/errorHandler";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { email: "", password: "" }
  });

  const [loginUser] = useLoginUserMutation();
  const [firebaseLogin] = useFirebaseLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async ({ email, password }) => {
    dispatch(setLoading(true));
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCred.user.getIdToken();

      const data = await loginUser({ idToken }).unwrap();
      toast.success('User Logged In SuccessFully')
      dispatch(setUser({ user: data.user, accessToken: data?.accessToken }));
      
      switch (data?.user?.role) {
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
      toast.error(message || 'Login Failed')
      console.log(err)

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
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Welcome back</h2>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 mb-4 py-2 rounded border hover:bg-[var(--hover-bg)]"
        >
          <img src="/google.webp" alt="Google" className="h-8 w-8" />
          Continue with Google
        </button>

        <div className="text-center text-sm text-[var(--text-secondary)] mb-3">or sign in with email</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
     
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              className="w-full border border-[var(--border)] rounded px-3 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

        
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password required" })}
              className="w-full border border-[var(--border)] rounded px-3 py-2"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center text-sm">
            <Link to="/forgot-password" className="text-[var(--primary)]">Forgot password?</Link>
          </div>

          <button disabled={isSubmitting} className="w-full btn-primary mt-2">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-sm text-[var(--text-secondary)] text-center">
            Don't have an account? <Link to="/register" className="text-[var(--primary)]">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
