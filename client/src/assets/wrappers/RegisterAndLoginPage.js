import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  color: var(--dark-10);

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    text-align: center;
    color: var(--primary-45);
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-50);
    background: var(--dark-55);

    input {
      color: inherit;
      border: 1px solid var(--dark-40);
    }
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
    font-weight: 500;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .btn {
    margin-top: 1rem;
  }

  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
