"use client"
import { useState } from "react";
import bcryptjs from 'bcryptjs'
import { useRouter } from "next/navigation"; 

const newPasswordPage = ({ params }) => {
    const { token } = params;
    const [newpassword, setNewpassword] = useState("");
    const [repeatpassword, setRepeatpassword] = useState("");
    const router = new useRouter();
    const changePassword = async (e) => {
        e.preventDefault();
        const hashedpassword = await bcryptjs.hash(newpassword, 10);
        const decodedToken = decodeURIComponent(token)
        const passdata = { hashedpassword, decodedToken };
        const res = await fetch(`/api/auth/password/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passdata)
        });
        if (res.ok) {
            console.log('password updated successfully!');
            router.push('/auth/login')
        } else {
            console.log('error updating password!');
        }
    }

    return (
        <div>
            <h1>Please give your new Password</h1>
            <form>
                <label htmlFor="">Password</label>
                <input type="password" name="newpassword" placeholder="new password" value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}/>

                <label htmlFor="">Repeat Password</label>
                <input type="password" name="repeatpassword" placeholder="repeat password" value={repeatpassword}
                onChange={(e) => setRepeatpassword(e.target.value)}/>
                
                <button onClick={changePassword}>update password</button>
            </form>
        </div>
    )
}

export default newPasswordPage;