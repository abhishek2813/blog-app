import { useContext } from "react";
import { userLogout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { Auth } from "../AuthProvider";

function LogoutButton() {
  const {setUser} = useContext(Auth)
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await userLogout();
    if (result.status === 201) {
      if (result.status === 201) {
        window.localStorage.removeItem("user");
        setUser(null)
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
