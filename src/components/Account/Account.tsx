import { useState } from "react";
import { useHistory } from "react-router-dom";
import serverRequest from "../../helpers/serverRequest";

function Account() {
  const history = useHistory();
  const [updatedPassword, setUpdatedPassword] = useState({
    pass1: "",
    pass2: "",
  });
  const handleUpdatePassword = async () => {
    const { pass1, pass2 } = updatedPassword;
    if (pass1 === pass2) {
      try {
        await serverRequest(
          "post",
          `/user/updatePassword`,
          { newPassword: pass1 },
          history
        );
        setUpdatedPassword({ pass1: "", pass2: "" });
      } catch (err) {
        console.error("password could not be saved", err);
      }
    } else {
      window.alert("Passwords do not match");
    }
  };
  const handleNewPasswordOnChange = (e) => {
    setUpdatedPassword((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <p>Update your password</p>
      <label htmlFor="pass-1">Enter new password</label>
      <input
        id="pass-1"
        name="pass1"
        onChange={handleNewPasswordOnChange}
        value={updatedPassword.pass1}
        type="password"
      ></input>
      <label htmlFor="pass-2">Re-enter password</label>
      <input
        id="pass-2"
        name="pass2"
        onChange={handleNewPasswordOnChange}
        value={updatedPassword.pass2}
        type="password"
      ></input>
      <button id="pass-update" onClick={handleUpdatePassword}>
        Update Password
      </button>
    </div>
  );
}

export default Account;
