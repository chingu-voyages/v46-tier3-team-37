'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../icons/logo.png'
import menu from '../icons/menu.png'
import toolBox from '../icons/tools.png'
import magnifyingGlass from '../icons/magnifying-glass.png'
import s from './navbar.module.css'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import Button from '@/components/uiComponents/Button'
import { CartItem } from '@/types/cartItemType'


const NavBar: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [searchInput, setSearchInput] = React.useState<string>('')
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [showToolBox, setShowToolBox] = React.useState<boolean>(false)
  const [showMenu, setShowMenu] = React.useState<boolean>(false)

  const routeToSearchResults = (toolName: string) => {
    router.push(`/searchResults?toolName=${toolName}`)
    setSearchInput('')
  }

  const routeToCheckoutPage = () => {
    router.push(`/checkout`)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      routeToSearchResults(searchInput)
    }
  }

  const openToolBox = () => {
    setShowToolBox(true)
  }

  const closeToolBox = () => {
    setShowToolBox(false)
  }

  const openMenu = () => {
    setShowMenu(true)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const routeToLandingPage = () => {
    router.push('/')
  }

  useEffect(() => {
    if (session && session.user && session.user.id) {
      fetch(`/api/shopping-cart?userId=${session?.user.id}`)
        .then((res) => res.json())
        .then((data: CartItem[]) => {
          setCartItems(data)
        })
    }
  }, [session, cartItems])

  useEffect(() => {
    if (!showToolBox) return
    document.addEventListener('click', closeToolBox)
    return () => document.removeEventListener('click', closeToolBox)
  }, [showToolBox])

  useEffect(() => {
    if (!showMenu) return
    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  return (
    <section className={`dark:bg-backgroundPrimary bg-[white] ${s.navbarContainer}`}>
      <ul className={s.menuSearchBarContainer}>
        <li className={s.menuContainer} onClick={openMenu}>
          <Image src={menu} className={s.menuIcon} alt='' />
        </li>
        <li className={s.searchBarContainer}>
          <div className={s.searchBar}>
            <div className={s.searchInputContainer}>
              <input
                className={s.searchInput}
                type='search'
                placeholder='Search for tools'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              <div>
                <div onClick={() => routeToSearchResults(searchInput)}>
                  <Image
                    src={magnifyingGlass}
                    className={s.magnifyingGlassIcon}
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
        {showMenu && (
          <ul className={s.menuOptionsContainer}>
            <li>
              <Link href='/'>Home</Link>
            </li>
            {session && (
              <>
                <li>
                  <Link href='/profile'>My profile</Link>
                </li>
                <li>
                  <Link href='/' onClick={() => signOut()}>
                    Log out
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href='/profile/listings/newListing'>List a tool</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        )}
      </ul>
      <div className={s.logoContainer}>
        <Image
          src={logo}
          className={s.logo}
          onClick={() => routeToLandingPage()}
          alt=''
        />
      </div>
      <div className={s.loginButtonContainer}>
        {session ? (
          <div>
            <Button onClick={() => signOut()} className={s.loginButton}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Link href='/login'>
              <Button className={s.loginButton}>Log In</Button>
            </Link>
          </div>
        )}
        <div className={s.toolBoxContainer}>
          <div onClick={openToolBox}>
            <Image src={toolBox} className={s.toolBoxIcon} alt='' />
          </div>
          {showToolBox && (
            <div className={s.toolBoxDropDownContainer}>
              {cartItems && cartItems.length > 0
                ?
                <div className={s.cartItemsContainer}>
                  {cartItems.map(cartItem => (
                    <div onClick={() => routeToCheckoutPage()} key={cartItem.id} className={s.cartItem}>
                      <span>
                        <Image
                          src={cartItem.item.images.length ? cartItem.item.images[0].url : 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/7/67716_W3.jpg'}
                          width={40}
                          height={40}
                          className={s.cartItemImage}
                          alt=""
                        />
                        {/* Timer will display here */}
                      </span>
                    </div>
                  ))}
                </div>
                :
                <div>Your toolbox is empty</div>
              }
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default NavBar
