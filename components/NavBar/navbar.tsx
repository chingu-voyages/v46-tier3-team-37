"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../icons/logo.png';
import menu from '../icons/menu.png';
import toolBox from '../icons/tools.png';
import magnifyingGlass from '../icons/magnifying-glass.png';
import s from "./navbar.module.css";
import Link from 'next/link';


const NavBar: React.FC = () => {
    const router = useRouter();

    const [searchInput, setSearchInput] = React.useState<string>("");
    const [showToolBox, setShowToolBox] = React.useState<boolean>(false);
    const [showMenu, setShowMenu] = React.useState<boolean>(false);


    const routeToSearchResults = (toolName: string) => {
        router.push(`/searchResults?toolName=${toolName}`);
        setSearchInput("");
    }

    const openToolBox = () => {
        setShowToolBox(true);
    }

    const closeToolBox = () => {
        setShowToolBox(false);
    }

    const openMenu = () => {
        setShowMenu(true);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    const routeToLandingPage = () => {
        router.push('/');
    }

    useEffect(() => {
        if (!showToolBox) return;
        document.addEventListener('click', closeToolBox);
        return () => document.removeEventListener("click", closeToolBox);
    }, [showToolBox]);

    useEffect(() => {
        if (!showMenu) return;
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
        <section className={s.navbarContainer}>
            <ul className={s.menuSearchBarContainer}>
                <li className={s.menuContainer} onClick={openMenu}>
                    <Image src={menu} className={s.menuIcon} alt="" />
                </li>
                <li className={s.searchBarContainer}>
                    <div className={s.searchBar}>
                        <div className={s.searchIcon}>
                            <input className={s.searchInput}
                                type="search"
                                placeholder="Search for tools"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <div>
                                <div onClick={() => routeToSearchResults(searchInput)}>
                                    <Image src={magnifyingGlass} className={s.magnifyingGlassIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                {showMenu &&
                    <ul className={s.menuOptionsContainer}>
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href='/profile'>
                                My profile
                            </Link>
                        </li>
                        <li>
                            <Link href='/list'>
                                List a tool
                            </Link>
                        </li>
                        <li>
                            <Link href='/about'>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href='/contact'>
                                Contact
                            </Link>
                        </li>
                    </ul>
                }
            </ul>
            <div className={s.logoContainer}>
                <Image src={logo} className={s.logo} onClick={() => routeToLandingPage()} alt="" />
            </div>
            <div className={s.toolBoxContainer}>
                <div onClick={openToolBox}>
                    <Image src={toolBox} className={s.toolBoxIcon} alt="" />
                </div>
                {showToolBox &&
                    <div className={s.toolBoxDropDownContainer}>
                        <ul>
                            <ul>Item1 - price</ul>
                            <ul>Item2 - price</ul>
                            <ul>Item3 - price</ul>
                        </ul>
                    </div>
                }
            </div>
        </section>
    )
};


export default NavBar;