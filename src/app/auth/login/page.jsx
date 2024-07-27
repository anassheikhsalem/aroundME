"use client"
import { useState } from "react"
import styles from "./login.module.css"
import Link from "next/link"
import Image from "next/image"
import bcryptjs from "bcryptjs"
import { NextResponse, userAgent } from "next/server"
import { useRouter } from "next/navigation"
import signIn from "next-auth"


const loginPage = () => {

    const [logindata, setLogindata] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            await signIn("credentials", logindata.email, logindata.password)
            router.push('/');
            return NextResponse.json({ message: "login successfully" }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "something went wrong: " + error }, { status: 401 });
        }
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.colorContainer}></div>
            <div className={styles.formContainer}>
                    <Link className={styles.logo} href="/">
                        <div className={styles.logoImage}>
                            <Image src="/images/logo4.png" width={80} height={80} alt='Logo'></Image>
                        </div>
                        <div className={styles.logoText}>
                            ME
                        </div>
                    </Link>
                    <form action="">
                    <input type="email" name="email" id="email" value={logindata.email} placeholder="your email address"
                    onChange={(e)=>setLogindata({...logindata, email : e.target.value})}/>
                    <input type="password" name="password" value={logindata.password} placeholder="your password"
                    onChange={(e)=>setLogindata({...logindata, password : e.target.value})}/> 
                    <button className={styles.loginBtn} onClick={handleLogin}>LOGIN</button>
                    </form>
                    <p>Fogot Password? <span><Link href='/auth/login/password/reset'>Reset Password</Link></span> </p>
            </div>
        </div>
    )
}

export default loginPage