import { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required/>
        <input className="login__input" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required/>
        <button className="login__button">Зарегистрироваться</button>
      </form>
      <p className="login__text">Уже зарегистрированы? <a className="login__link">Войти</a> </p>
    </section>
  );
}

export default Register;