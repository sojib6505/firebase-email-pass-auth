import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "../../firebase.init"
import { useState } from "react"
import { Link } from "react-router"
import { IoIosEye, IoIosEyeOff } from "react-icons/io";


export default function SignUp() {
    const [error, setError] = useState('')
    const [succes, setSucces] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [checked ,setChecked] = useState(false)
    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const username = e.target.username.value
        const photo = e.target.photo.value
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter")
            return
        }

        if (!/[0-9]/.test(password)) {
            setError("Password must contain at least one number")
            return
        }
          if(!checked){
                setError('Please Accept Term & Condition')
                return
            }
        setError('')
        setSucces('')
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then(
                (userCredential) => {
                    // user varification
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setSucces("Account created! Please check your email for verification.")
                        })
                   // update user
                   updateProfile(auth.currentUser,{
                    displayName: username,
                    photoURL: photo
                   }).then(()=>{
                    //
                   }).catch((error) => {
                    //
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
                 <label className="label">Full Name</label>
                <input type="text" name="username" className="input" placeholder="Full Name" />
                 <label className="label">Photo URL</label>
                <input type="text" name="photo" className="input" placeholder="Photo URL" />
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />

                <label className="label">Password</label>
                <div className="relative">
                    <input type={showPass ? 'text' : 'password'} name="password" className="input" placeholder="Password" />
                    <div onClick={() => setShowPass(!showPass)} className="btn  absolute -ml-14">
                        {showPass ? <IoIosEye /> : <IoIosEyeOff />}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                     <input onChange={()=>setChecked(!checked)} type="checkbox" checked={checked} class="checkbox checkbox-md" />
                     <p>Accept Term & Condition</p>
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
