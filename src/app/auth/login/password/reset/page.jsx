"use client"
import styles from './reset.module.css'
import { useState } from "react";

const resetPasswordPage = () => {

    const [email, useEmail] = useState("");
    
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            
            if (email) {
                const res = await fetch('/api/auth/password/sendemail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(email)
                });
            } else {
                console.log('please enter first your email')
            }

            if (res.ok) {
                console.log('email sent!');
            } else {
                console.log('Error by sending email!')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Reset Password</h1>
                <form>
                    <input type="text" placeholder="Your Email Address!" required name="email" value={email}
                        onChange={(e) => useEmail(e.target.value)} />
                    <button className={styles.resetBtn} onClick={handleSubmit}>Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default resetPasswordPage;