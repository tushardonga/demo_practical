import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setIsLogin } = useUser();
  const naviagte = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      const userDetials = user || JSON.parse(localStorage.getItem("user"));
      if (userDetials) {
        if (user.email === values.email && user.password === values.password) {
          localStorage.setItem("isLogin", JSON.stringify(true));
          setIsLogin(true);
          setTimeout(() => naviagte("/home"), 100);
        } else if (user.email !== values.email) {
          toast.error("Invalid Email");
        } else if (user.password !== values.password) {
          toast.error("Invalid Password");
        }
      } else {
        toast("No User Found");
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
  });

  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(false));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/4 bg-blue-600 flex items-center justify-center">
        <h1 className="text-white font-bold sm:text-5xl text-3xl">
          Welcome Back!
        </h1>
      </div>
      <div className="h-3/4 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-md sm:w-1/2 w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.email ? "border-red-500" : ""
                }`}
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
              <span
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                onClick={() => naviagte("/signup")}
              >
                Register
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
