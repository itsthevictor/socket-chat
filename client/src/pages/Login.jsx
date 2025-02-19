import {
  Link,
  Form,
  redirect,
  useNavigate,
  useActionData,
} from "react-router-dom";
import { Logo, FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "password too short";
    return errors;
  }
  try {
    await customFetch.post("/auth/login", data);

    return redirect("/target-page");
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const errors = useActionData();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);

      navigate("/target-page");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}

        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Demo / Explore The App
        </button>
        <p>
          Don't have an account yet?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>{" "}
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
