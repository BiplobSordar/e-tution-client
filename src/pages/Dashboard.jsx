import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Auth State:", auth);
  }, [auth]);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
