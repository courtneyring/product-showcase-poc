import './Navbar.css'
import hamburgerIcon from '../../assets/icons/hamburger.svg';

const Navbar = () => {
    return (
        <nav className="navbar">
            <p>Case Study by Courtney Ring</p>
            <h1>Product Showcase POC</h1>
            <p>June 2024</p>
            {/* <img src={hamburgerIcon} className='menu'/> */}
        </nav>
    );
}

export default Navbar;