import { Navbar } from "components";

const withNavbar = (WrappedComponent) => {
  const WrappedWithNavbar = (props) => (
    <>
      <Navbar />
      <WrappedComponent {...props} />
    </>
  );

  return WrappedWithNavbar;
};

export default withNavbar;
