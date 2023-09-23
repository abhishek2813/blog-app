import { useContext } from "react";
import { userLogout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { Auth } from "../AuthProvider";
import {toast} from 'react-toastify'
function LogoutButton() {
  const {setUser} = useContext(Auth)
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await userLogout();
    if (result.status === 201) {
        toast.success("Logout Succsessfully",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          })
        window.localStorage.removeItem("user");
        setUser(null)
        navigate("/login");
    }else{
      toast.error(result.response.data.message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        })
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
