import React from "react";

const DashboardPage = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(true), 5000));
  return <div>DashboardPage</div>;
};

export default DashboardPage;
