import Button from "../shared/button/Button";
import Input from "../shared/input/Input";
import "./AdminLogin.scss";
import { useState } from "react";

export default function AdminLogin() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <section className={"login-form"}>
        <div className={"login-form__card"}>
          <h1>Unesite svoje korisničko ime i lozinku:</h1>
          <div className={"login-form__input"}>
            <span>Korisničko ime:</span>
            <Input placeholder={`asdasdasdasd`} value={nickname} />
          </div>
          <div className={"login-form__input"}>
            <span>Lozinka:</span>
            <Input
              placeholder={`sdfsdfsdfsdf.`}
              type={"password"}
              value={password}
            />
          </div>
          <div className={"login-form__action"}>
            <Button text={"Prijava"} />
          </div>
        </div>
      </section>
    </>
  );
}
