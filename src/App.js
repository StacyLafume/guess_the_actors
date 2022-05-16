import Container from "./components/Container";
import React from "react";

const App = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/vectors/film-strip-vector-illustration-vector-id905970306?k=20&m=905970306&s=612x612&w=0&h=7TUNRPMdS6GMRs1tigxs5YZGshcw46YtBou4siIIQwk=)",
        backgroundSize: "contain",
      }}
    >
      <Container />
    </div>
  );
};

export default App;
