import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return(
        <header className="header">
            <div className="header__box">
                <img className="header__logo" src={logo} alt="логотип"></img>
            </div>
            <div className="header__login">
              <p className="header__text">{props.mail}</p>
              <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
            </div>
        </header>
    );
}

export default Header;