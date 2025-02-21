import styled from "styled-components";

const Wrapper = styled.section`
  background: #1c1c1c;
  min-height: 100vh;
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;

    h1 {
      text-transform: none;
    }
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    color: lightgrey;

    span {
      color: var(--primary-40);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    color: lightgrey;
    max-width: 35em;
    margin-bottom: 1.5rem;
  }

  .register-link {
    margin-right: 1rem;
  }

  .main-img {
    display: none;
  }

  .btn {
    padding: 0.75rem 1rem;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-ga: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
