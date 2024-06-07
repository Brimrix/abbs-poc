import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "@/assets/styles/LoginStyle.css";
import {message} from 'antd';

const loginURL = import.meta.env.VITE_LOGIN_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setCookie("login", token, { path: "/" });

    if (success) {
      message.success("Successfully logged in");
      navigate("/")
    }

    console.log(token);


  }, [success]);

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if(!response.ok)
      message.error("Please check your email or password");

    const data = await response.json();
    if(response.ok){
      setToken(data.token);
      setSuccess(response.ok);
    }
  };
  return (
    <section className="vh-100 section-bg">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong card-background">
              <div className="card-body p-5 text-start">
                <h3 className="mb-5">Login ABBS</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="typeEmailX-2">
                    Email
                  </label>

                  <input
                    value={username}
                    onInput={(event) => setUsername(event.target.value)}
                    type="text"
                    name="username"
                    placeholder="Email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form-outline">
                  <label className="form-label" htmlFor="typeEmailX-2">
                    Password
                  </label>
                  <input
                    value={password}
                    onInput={(event) => setPassword(event.target.value)}
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-control form-control-lg"
                  />
                </div>
              </div>

                <button
                  onClick={handleFormSubmit}
                  className="btn button-primary login-btn"
                  type="submit"
                >
                  Login
                </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
