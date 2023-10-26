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
        <div className={s.navbarContainer}>
            <div className={s.menuSearchBarContainer}>
                <div className={s.menuContainer} onClick={openMenu}>
                    <Image src={menu} className={s.menuIcon} alt="" />
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
                                <div onClick={() => routeToSearchResults(searchInput)}>
                                    <Image src={magnifyingGlass} className={s.magnifyingGlassIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showMenu &&
                    <div className={s.menuOptionsContainer}>
                        <div>
                            <Link href="/">
                                Home
                            </Link>
                        </div>
                        <div>
                            <Link href='/profile'>
                                My profile
                            </Link>
                        </div>
                        <div>
                            <Link href='/list'>
                                List a tool
                            </Link>
                        </div>
                        <div>
                            <Link href='/about'>
                                About
                            </Link>
                        </div>
                        <div>
                            <Link href='/contact'>
                                Contact
                            </Link>
                        </div>
                    </div>
                }
            </div>
            <div className={s.logoContainer}>
                <Image src={logo} className={s.logo} onClick={() => routeToLandingPage()} alt="" />
            </div>
            <div className={s.toolBoxContainer}>
                <div onClick={openToolBox}>
                    <Image src={toolBox} className={s.toolBoxIcon} alt="" />
                </div>
                {showToolBox &&
                    <div className={s.toolBoxDropDownContainer}>
                        <div>
                            <div>Item1 - price</div>
                            <div>Item2 - price</div>
                            <div>Item3 - price</div>
                        </div>
                    </div>
                }
            </div>
        </div>



    )
};

{/* <div className={s.homeAboutContact}>
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
            </div> */}


export default NavBar;