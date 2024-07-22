"use client"
const verifyingPage = ({ params }) => {
    const { token } = params;
    const decodedToken = decodeURIComponent(token);
    const verifyingAccount = async () => {
        try {
            console.log('verifying client');
            const res = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: decodedToken })
            })

            if (res.ok) {
                console.log('user is verified!')
            } else {
                console.log('error with verifing this account!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Hallo from Verifying Account Page</h1>
            <button onClick={verifyingAccount}>Verifying</button>
        </div>
    )
} 

export default verifyingPage