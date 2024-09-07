"use client"
import styles from "@/components/Header/Header.module.css"
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from "react";

const authenticated = false

const Header = () => {
    const session = useSession();
    console.log(session)
    const handleLogout = async () => {
        try {
            console.log("logout....")
            const res = await fetch("/api/auth/logout", {
                method: 'GET',
                headers: {
                    "Content-type":"application/json"
                }
            })
            if (res.ok) {
                console.log("logout successfully!")
            }
        } catch (error) {
            console.log("Error with logout: " + error)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.navContainer}>
                <Link className={styles.logo} href="/">
                   <div className={styles.logoImage}>
                        <Image src="/images/logo4.png" width={69} height={69} alt='Logo' priority={true} quality={100}></Image>
                    </div>
                    <div className={styles.logoText}>
                        <p>
                            <span>ME</span>  
                        </p>
                    </div>
                </Link>
                <nav className={styles.linkContainer}>
                    <ul>
                        <li><Link className={styles.link} href='/'>Solutions</Link></li>
                        <li><Link className={styles.link} href='/'>Pricing</Link></li>
                        <li><Link className={styles.link} href='/'>About</Link></li>
                    </ul>
                </nav>
            </div>
            {authenticated ?
                <div className={styles.profileContainer}>
                    <Link href='/profile' className={styles.registerBtn}>Hallo User</Link>
                    <button className={styles.lBtn} onClick={handleLogout}>logout</button>
                </div>  
                :
                <div className={styles.loginContainer}> 
                    <Link href='/auth/register' className={styles.registerBtn}>Try it now!</Link>
                    <Link href='/auth/login' className={styles.lBtn}>login</Link>
                </div>   
            }
        </div>
    )
}

export default Header;