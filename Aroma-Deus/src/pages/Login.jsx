import { phase2api } from "../helpers/http-client";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import NavbarCMS from "../components/NavbarCMS";
import SubmitButton from "../components/Button";

function Login() {
  const [email, setEmail] = useState("admin@perfumery.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please enter your email",
        });
        return;
      }
      if (!password) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please enter your password",
        });
        return;
      }
      const response = await phase2api.post(`/login`, { email, password });
      // console.log(response.data.access_token);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
      });
    }
  };

  return (
    <>
      <NavbarCMS />
      <main className="bg-[#0B192C] min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="px-4 py-12">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-[#370A40]">
                Sign in to Perfumery CMS
              </h2>
              <p className="mt-2 text-center text-sm text-[#758694]">
                Admin and Staff Access Only
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm space-y-6">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="appearance-none rounded-md relative block w-full px-4 py-4 border border-[#758694] placeholder-[#758694] text-[#405D72]"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="appearance-none rounded-md relative block w-full px-4 py-4 border border-[#758694] placeholder-[#758694] text-[#405D72]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <SubmitButton
                  text="Sign in"
                  className="w-full flex justify-center py-4 px-6 border border-transparent text-base font-medium rounded-md text-white bg-[#370A40] hover:bg-[#758694]"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
