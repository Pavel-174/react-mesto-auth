import { useState } from "react";

function Login(props) {

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input className="login__input"></input>
        <input className="login__input"></input>
        <button className="login__button">Войти</button>
      </form>
    </section>
  );
}

export default Login;