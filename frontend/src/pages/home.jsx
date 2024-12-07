import React from "react";
import Hero from "../components/home/hero";
import ExpertSolutions from "../components/home/expertSolutions";
import PestSolutions from "../components/home/pestSolutions"

const Home = () => {
  return (
    <div>
      <section>
          <Hero />
      </section>
      <section>
        <ExpertSolutions />
      </section>
      <section>
        <PestSolutions />
      </section>
    </div>
  );
};

export default Home;
