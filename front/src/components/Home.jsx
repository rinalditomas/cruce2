import React from "react";
import Carousel from "./Carousel";
import NavBar from "../components/Navbar";

const Home = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  /* const user =  'ivan' */

  return (
    <div>
      {!user ? (
        <>
          <h1>NO estas logueado</h1>
        </>
      ) : (
        <>
          <h1>{`Bienvenido ${user.firstName} ${user.lastName}`}</h1>
          <Carousel />
        </>
      )}
    </div>
  );
};

export default Home;
