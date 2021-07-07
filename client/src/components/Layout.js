import "./Layout.css";
import React from "react";
import Header from "./ClassFormComponents/Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="page">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
