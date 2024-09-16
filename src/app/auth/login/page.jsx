"use client"
import { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
    const [logindata, setLogindata] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const result = await signIn("credentials", {
            redirect: false,
            email: logindata.email,
            password: logindata.password,
        });

        if (result.error) {
            alert(error)
        } else {
            router.push('/');
        }
    };

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
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={logindata.email}
                        placeholder="your email address"
                        onChange={(e) => setLogindata({ ...logindata, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name="password"
                        value={logindata.password}
                        placeholder="your password"
                        onChange={(e) => setLogindata({ ...logindata, password: e.target.value })}
                    />
                    <button className={styles.loginBtn} type="submit">LOGIN</button>
                    <h3 className={styles.formTxt}>or</h3>
                    <div className={styles.socialBtnsContainer}>
                        <div className={styles.GoogleBtn}>
                            <Image src="/images/iconGoogle.png" width='20' height='20' alt="Google"></Image>
                            <button className={styles.GoogleloginBtn} onClick={() => signIn("google")}>with Google login</button>
                        </div>
                        <div className={styles.GithubBtn}>
                            <Image src="/images/iconGithub.png" width='20' height='20' alt="Github"></Image>
                            <button className={styles.GithabloginBtn} onClick={() => signIn("github")}>with Github login</button>
                        </div>
                    </div>
                </form>
                <p>Forgot Password? <span><Link href='/auth/login/password/reset'>Reset Password</Link></span></p>
            </div>
        </div>
    );
}

export default LoginPage;
