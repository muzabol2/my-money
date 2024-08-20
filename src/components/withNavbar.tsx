import React, { ComponentType, ReactElement } from "react";
import { Navbar } from "./navbar";

const withNavbar = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WrappedWithNavbar: React.FC<P> = (props): ReactElement => (
    <>
      <Navbar />
      <WrappedComponent {...props} />
    </>
  );

  return WrappedWithNavbar;
};

export { withNavbar };
