import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeBlog from "../component/HomeBlog";
import Header from "./Header";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    //check if user not login
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <HomeBlog />
    </div>
  );
}

export default Home;
