import Image from 'next/image';
import logo from '../icons/logo.png';
import menu from '../icons/menu.png';
import shoppingCart from '../icons/shopping-cart.png';
import magnifyingGlass from '../icons/magnifying-glass.png';
import s from "./navbar.module.css";
import Link from 'next/link';


const NavBar: React.FC = () => {

    return (
        <div className={s.navbarContainer}>
            <div className={s.menuContainer}>
                <Image src={menu} className={s.menuIcon} alt="" />
            </div>
            <div className={s.homeAboutContact}>
                <div className={s.home}>
                    <Link href="/">
                        Home
                    </Link>
                </div>
                <div className={s.about}>
                    <Link href="/about">
                        About
                    </Link>
                </div>
                <div className={s.contact}>
                    <Link href="/contact">
                        Contact
                    </Link>
                </div>
            </div>
            <div className={s.logoContainer}>
                <Image src={logo} className={s.logo} alt="" />
            </div>
            <div className={s.searchBarContainer}>
                <div className={s.searchBar}>
                    <div className={s.searchIcon}>
                        <div><Image src={magnifyingGlass} className={s.magnifyingGlassIcon} alt="" /></div>
                        <div>Search for tools</div>
                    </div>
                </div>
            </div>
            <div className={s.shoppingCartContainer}>
                <Image src={shoppingCart} className={s.shoppingCartIcon} alt="" />
            </div>
        </div>
    )
};


export default NavBar;