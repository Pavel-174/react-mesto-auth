import logo from '../images/logo.svg';

function Header() {
    return(
        <header className="header">
            <div className="header__box">
                <img className="header__logo" src={logo} alt="логотип"></img>
            </div>
            <div className="header__login">
                <p className='header__text'>Текст</p>
                <a className='header__link'>Ссылка</a>
            </div>
        </header>
    );
}

export default Header;