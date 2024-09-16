"use client";
import styles from "@/components/Header/Header.module.css";
import Image from 'next/image';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
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
        </div>
    );
};

export default Header;
