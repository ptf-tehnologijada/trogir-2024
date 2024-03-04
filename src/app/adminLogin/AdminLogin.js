import Button from "../shared/components/button/Button";
import Input from "../shared/components/input/Input";
import "./AdminLogin.scss";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const signIn = () => {
    signInWithEmailAndPassword(auth, nickname, password)
      .then((userCredential) => {
        // Signed in
        // ...
        localStorage.setItem("tehnologijada_logged_in", true);
        navigate("/admin/odbojka");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className={"login-form"}>
        <div className={"login-form__card"}>
          <h1>Unesi svoj email i lozinku:</h1>
          <div className={"login-form__input"}>
            <Input
              label={`Email`}
              id={`email-input`}
              placeholder={`Unesite svoj email`}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className={"login-form__input"}>
            <Input
              label={`Lozinka`}
              id={`password-input`}
              placeholder={`Unesite svoju lozinku`}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={"login-form__action"}>
            <Button text={"Prijava"} onClick={signIn} />
          </div>
        </div>
      </section>
    </>
  );
}
