import React from "react";

const WelcomePage = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(true), 5000));
  return <div>WelcomePage</div>;
};

export default WelcomePage;
