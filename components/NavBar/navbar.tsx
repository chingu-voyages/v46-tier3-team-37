"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../icons/logo.png';
import menu from '../icons/menu.png';
import shoppingCart from '../icons/shopping-cart.png';
import magnifyingGlass from '../icons/magnifying-glass.png';
import s from "./navbar.module.css";
import Link from 'next/link';


const NavBar: React.FC = () => {
    const router = useRouter();

    const [searchInput, setSearchInput] = React.useState<string>("");
    let [showCart, setShowCart] = useState<boolean>(false);



    const routeToSearchResults = () => {
        router.push(`/searchResults/${searchInput}`)
    }

    const openCart = () => {
        setShowCart(true);
    }

    const closeCart = () => {
        setShowCart(false);
    }

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
                        <input className={s.searchInput}
                            type="search"
                            placeholder="Search for tools"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <div>
                            <button onClick={() => routeToSearchResults(searchInput)}>
                                <Image src={magnifyingGlass} className={s.magnifyingGlassIcon} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.shoppingCartContainer}>
                <div onClick={openCart}>
                    <Image src={shoppingCart} className={s.shoppingCartIcon} alt="" />
                </div>
            </div>
            {showCart &&
                <div>
                    <div onClick={closeCart}>
                        X
                    </div>
                    HELLO
                </div>}
        </div>
    )
};


export default NavBar;