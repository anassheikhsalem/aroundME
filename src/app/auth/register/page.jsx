"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./register.module.css";
import { useState } from "react";
import { NextResponse } from "next/server";

export default function register() {
  const [isChecked, setIsChecked] = useState(false);
  const [userdata, useUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    phone: ""
  });

  const [repassword, useRepassword] = useState("");
  
  const createUser = async (e) => {
    try {
      e.preventDefault();

      if (userdata.password !== repassword) {
        console.log("Password doesn't match!");
        return null;
      }

      if (!isChecked) {
        console.log("You have to accept the terms of Service!");
        return null;
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      });

        if(res.ok){
          console.log("The registration is successful");
          return NextResponse.json({message:'The registration is successful'},{status:200})
        }else{
          console.log("error by the registration!")
        }
    } catch (error) {
      console.log("error while adding a user: " + error)
    }
  }

  return (
    <>
      <div className={styles.container}></div>
      <div className={styles.formContainer}>
            <h1>Registration</h1>
            <form>
                <input type="text" name="firstname" className={styles.input} value={userdata.firstname} placeholder="Firstname"
                onChange={(e) => useUserData({ ...userdata, firstname: e.target.value }) } />
                <input type="text" name="lastname" className={styles.input} value={userdata.lastname} placeholder="Lastname"
                onChange={(e) => useUserData({ ...userdata, lastname : e.target.value }) } />
                <input type="email" name="email" className={styles.input} value={userdata.email} placeholder="email address"
                onChange={(e) => useUserData({ ...userdata, email: e.target.value })} />
                <input type="password" name="password" className={styles.input} value={userdata.password} placeholder="password"
                onChange={(e) => useUserData({ ...userdata, password: e.target.value })} />
                <input type="password" name="repassword" className={styles.input} placeholder="confirm password"
                onChange={(e) => useRepassword(e.target.value)}/>
                <input type="text" name="address" className={styles.input} value={userdata.address} placeholder="address"
                onChange={(e) => useUserData({ ...userdata, address: e.target.value })} />
                <input type="text" name="phone" className={styles.input} value={userdata.phone} placeholder="phone"
                onChange={(e) => useUserData({ ...userdata, phone: e.target.value })} />
                {!isChecked ?
                  <button onClick={createUser} disabled className={styles.registerBtn}>Register</button>:
                  <button onClick={createUser} className={styles.registerBtn}>Register</button>
                }
                
              
                <div className={styles.termsContainer}>
                  <input type="checkbox" id="termsCb" name="termsCb" value={isChecked} onChange={(e) => setIsChecked(!isChecked)}/>
                  <p>I agree to the <Link href="/auth/register/terms-and-conditions">Terms of Service</Link> and Privacy Policy.</p>
                </div>  
            </form>
            <Link href="/auth/login" className={styles.loginLink}>Do you an account?</Link>
        </div>
    </>
  );
}
