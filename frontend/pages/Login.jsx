import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "@styles/LoginStyle.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    setCookie("login", success, { path: "/" });

    if(success)
    navigate('/');
  }, [success]);

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/login/", {
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
    setSuccess(response.ok);
  };
  return (
    <section class="vh-100 section-bg">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong card-background">
              <div class="card-body p-5 text-start">
                <h3 class="mb-5">Login ABBS</h3>

                <div class="form-outline mb-4">
                <label class="form-label" for="typeEmailX-2">
                    Email
                  </label>

                  <input
                    value={username}
                    onInput={(event) => setUsername(event.target.value)}
                    type="text"
                    name="username"
                    placeholder="Email"
                    id="typeEmailX-2"
                    class="form-control form-control-lg"
                  />

                </div>

                <div class="form-outline">
                <label class="form-label" for="typeEmailX-2">
                    Password
                  </label>
                  <input
                    value={password}
                    onInput={(event) => setPassword(event.target.value)}
                    name="password"
                    type="password"

                    id="password"
                    placeholder="Password"
                    class="form-control form-control-lg"
                  />

                </div>


              </div>

              <div className="container-fluid d-flex flex-column align-items-center">
              <button onClick={handleFormSubmit} class="btn button-primary" type="submit">
                  Login
                </button>
                {success && (
                  <div className="alert alert-success mt-4 error-message text-center">Logged in</div>
                )}
                {!success && (
                  <div className="alert alert-danger mt-4 error-message text-center">Failure</div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // <div className="m-5 p-2 card w-25">
  //     <h2>Header of login</h2>
  //     <form className="d-flex flex-column gap-4" onSubmit={handleFormSubmit}>
  //         <input
  //             value={username}
  //             onInput={(event) => setUsername(event.target.value)}
  //             type="text"
  //             name="username"
  //             placeholder="Email"
  //             className="form-control form-control-lg" />

  //         <input
  //             value={password}
  //             onInput={(event) => setPassword(event.target.value)}
  //             type="password"
  //             name="password"
  //             id="password"
  //             className="form-control form-control-lg"
  //             placeholder="Password" />
  //         <button type="submit" className="btn btn-primary p-2">Login</button>
  //     </form>
  //     {success && <div className="alert alert-success">Logged in</div>}
  //     {!success && <div className="alert alert-danger">Failure</div>}
  // </div>
};

export default Login;
