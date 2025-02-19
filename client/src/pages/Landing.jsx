import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <h1>Birth of the cool</h1>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Oh, God. Not another <br />
            <span>Chat App</span> with &#8249;Socket.io&#8250;
          </h1>
          <p>
            I'm baby ennui ascot wolf fixie tousled street art godard scenester
            green juice gochujang biodiesel trust fund meh. 8-bit squid iPhone
            fit banh mi before they sold out irony tacos listicle chartreuse DIY
            artisan hoodie. Tbh everyday carry listicle hot chicken, kogi
            aesthetic prism raclette snackwave ethical iPhone.
          </p>
          <Link to="/register" className="btn register-link">
            register
          </Link>
          <Link to="/login" className="btn login-link">
            login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
