import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from "../../firebase.init"
import { useState } from "react"
import { Link } from "react-router"
import { IoIosEye, IoIosEyeOff } from "react-icons/io";


export default function SignUp() {
    const [error, setError] = useState('')
    const [succes, setSucces] = useState('')
    const [showPass, setShowPass] = useState(false)
    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter")
            return
        }

        if (!/[0-9]/.test(password)) {
            setError("Password must contain at least one number")
            return
        }
        setError('')
        setSucces('')
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then(
                (userCredential) => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setSucces("Account created! Please check your email for verification.")
                        })

                }
            ).catch(
                (error) => {
                    setError(error.message)
                }
            )
    }
    return (
        <div className="flex  justify-center mt-20">
            <form onSubmit={handleSignUp} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />

                <label className="label">Password</label>
                <div className="relative">
                    <input type={showPass ? 'text' : 'password'} name="password" className="input" placeholder="Password" />
                    <div onClick={() => setShowPass(!showPass)} className="btn  absolute -ml-14">
                        {showPass ? <IoIosEye /> : <IoIosEyeOff />}
                    </div>
                </div>
                <button className="btn btn-neutral mt-4">SignUp</button>
                <p>
                    Already have an account? <Link className="text-blue-600 underline" to='/login'>Login</Link>
                </p>

                <p className="text-red-500">
                    {error}
                </p>
                <p>
                    {succes}
                </p>
            </form>
        </div>
    )
}
