import { Fragment } from "react";
import Home from "@/layouts/sections/home/Home";
import About from "@/layouts/sections/about/About";
import Services from "@/layouts/sections/services/Services";
import Navbar from "@/layouts/Navbar/Navbar";

const page = () => {
  return (
    <Fragment>
      <Home />
      <About />
      {/* <Services /> */}
      <Navbar />
    </Fragment>
  );
};

export default page;
