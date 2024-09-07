<<<<<<< HEAD
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
=======
"use client";
import styles from "@/components/Header/Header.module.css";
import Image from 'next/image';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();

    // If the status is loading, you can return a loading state
    if (status === "loading") {
        return <p>Loading...</p>;
>>>>>>> e2b454520653e1cea4624894e26b71d586b9c928
    }

    return (
        <div className={styles.container}>
            <div className={styles.navContainer}>
                <Link className={styles.logo} href="/">
                    <div className={styles.logoImage}>
                        <Image 
                            src="/images/logo4.png" 
                            width={69} 
                            height={69} 
                            alt='Logo' 
                            priority={true} 
                            quality={100} 
                        />
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
<<<<<<< HEAD
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
=======
            <div className={styles.loginContainer}> 
                {session ? (
                    <button 
                        onClick={() => signOut({ callbackUrl: '/' })} 
                        className={styles.lBtn}
                    >
                        logout
                    </button>
                ) : (
                    <>
                        <Link href='/auth/register' className={styles.registerBtn}>Try it now!</Link>
                        <Link href='/auth/login' className={styles.lBtn}>Login</Link>
                    </>
                )}
            </div> 
>>>>>>> e2b454520653e1cea4624894e26b71d586b9c928
        </div>
    );
};

export default Header;
