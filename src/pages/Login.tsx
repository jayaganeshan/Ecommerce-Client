import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginInputs } from "../types/types";
import { ToastContainer } from "react-toastify";
import message from "../utils/tostify";
import axios from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { signIn } from "../redux/slice/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const passwordPattern = new RegExp(
    "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
  );
  const emailPattern = new RegExp(
    "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setLoading(true);
      dispatch(signIn(data));
      setLoading(false);
      navigate("/", { replace: true });
    } catch (er) {
      if (axios.isAxiosError(er)) {
        console.log(er.response?.data.error);
        message(er.response?.data.error, "error");
      }
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <h1 className="title">Ecommerce </h1>
      <div className="form_wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            placeholder="email"
            {...register("email", { required: true, pattern: emailPattern })}
            className="input_field"
          />
          {
            <span className={errors.email ? "error" : "hidden_error"}>
              {errors.email?.type === "required"
                ? "Email is required"
                : "Email don't match the pattern"}
            </span>
          }
          <input
            placeholder="password"
            type="password"
            {...register("password", {
              required: true,
              pattern: passwordPattern,
            })}
            className="input_field"
          />
          {
            <span className={errors.password ? "error" : "hidden_error"}>
              {errors.password?.type === "required"
                ? "Password is required"
                : "Password should have uppercase,lowercase,number and special character"}
            </span>
          }
          <button className="input_field form_button">
            {loading ? <CircularProgress size={14} /> : "Login"}
          </button>
        </form>
        <p className="link">
          Don't have accoutn,<a href="/signup">SignUp here</a>
        </p>
        <p className="link">
          Forgot your login password,<a href="/forgot-password">Click here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
