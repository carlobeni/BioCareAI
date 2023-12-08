import { useState } from "react"
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {
  const [user,setUser] = useState({
    email:"",
    password:"",
  }); //to login form
  const [firebaseError,setFirebaseError]=useState("") //To catch Firebase error messages
  const {login,loginWithGoogle} = useAuth() //To use context 
  const navigate = useNavigate() // Change page

  const handleChange = ({target: {name,value}}) => {
    setUser({...user,[name]:value})
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirebaseError("");
    try{
      await login(user.email,user.password)
      navigate("/")
    }catch(error){
      setFirebaseError(error.message);
    }
  };

  const handleGoogleSignIn = async () =>{
    try {
      //throw new Error("test google error")
      await loginWithGoogle()
      navigate("/")
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <>
      {firebaseError && <Alert message={firebaseError}/>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <div>
          <label>
            <Link to="/register">
              Crear una cuenta
            </Link>
          </label> 
        </div>
      <div>
          <label>
            <Link to="/resetpassword">
              Olvidaste tu Contraseña?
            </Link>
          </label> 
        </div>
    </>
  )
}
