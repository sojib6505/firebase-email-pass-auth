import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { IoIosEye ,IoIosEyeOff} from "react-icons/io";

export default function Login() {
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const emailRef = useRef()
  const handleSignIn = e => {
      e.preventDefault()
      const email = e.target.email.value 
      const password = e.target.password.value
      console.log(email,password)
      setError('')
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        if(!userCredential.user.emailVerified){
          alert('please verified your email')
        }
        else{
          alert('Login Succesfull')
        }
         console.log(userCredential.user)
      })
      .catch((error)=>{
       setError('Something Wrong')
      })
  }
  const handleForgetPass = () => {
   const email = emailRef.current.value
   sendPasswordResetEmail(auth, email)
   .then(()=>{
      alert('Send Password Reset Email ! Cheack your email')
   }).catch((error) => {
    setError(error.message)
   })
   console.log(email)
  }
  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSignIn} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Email</label>
        <input type="email" name="email" ref={emailRef} className="input" placeholder="Email" />
        <label className="label">Password</label>
       <div className="relative">
         <input type={showPass?'text':'password'} name="password" className="input" placeholder="Password" />
         <div onClick={()=>setShowPass(!showPass)} className="btn  absolute -ml-14">
          {showPass ? <IoIosEye/> :<IoIosEyeOff />}
         </div>
       </div>
       <div >
         <p onClick={handleForgetPass} className="hover:underline cursor-pointer">Forget Password</p>
       </div>
        <button className="btn btn-neutral mt-4">Login</button>
        <p>
          New to this website? Please <Link className="text-blue-600 underline" to='/signUp'>SignUp</Link>
        </p>
        <p className="text-red-500">
          {error}
        </p>
      </form>
    </div>
  )
}
