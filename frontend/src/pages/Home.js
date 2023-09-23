import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../AuthProvider";
import HomeBlog from "../component/HomeBlog";

function Home() {
  const { user } = useContext(Auth);
  const navigate = useNavigate();
  useEffect(() => {
    //check if user not login
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <div>{user && <HomeBlog />}</div>;
}

export default Home;
