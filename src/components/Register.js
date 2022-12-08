import { useState } from "react";

function Register(props) {

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form">
        <input className="login__input"></input>
        <input className="login__input"></input>
        <button className="login__button">Войти</button>
      </form>
      <p className="login__text">Уже зарегистрированы? <a className="login__link">Войти</a> </p>
    </section>
  );
}

export default Register;