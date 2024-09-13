import { Link } from 'react-router-dom';
import heroes from '../../assets/heroes.png';
import './header.css';

export default function Header() {
    return (
        <header className='containerHeader'>
            <div className='logo'>
                <img src={heroes} width={60} height={60} />
                <h1>HEROES</h1>
            </div>
            <nav>
                <Link className="navLink" to="/">Hero</Link>
                <Link className="navLink" to="/ability">Ability</Link>
            </nav>
        </header>
    )
}