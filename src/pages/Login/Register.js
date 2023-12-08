import { useState } from "react"
import { useAuth } from "../../context/authContext";
import { Link,useNavigate } from "react-router-dom";
import { Alert } from "./Alert";


export function Register() {
  const [user,setUser] = useState({
    email:"",
    password:"",
  });
  const [firebaseError,setFirebaseError]=useState("")

  const {signUp} = useAuth()

  const navigate = useNavigate()

  const handleChange = ({target: {name,value}}) => {
    setUser({...user,[name]:value})
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirebaseError("");
    try{
      await signUp(user.email,user.password)
      navigate("/")
      console.log("asafa")
    }catch(error){
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
        <button type="submit">Registrar</button>
      </form>
      <div>
          <label>Ya tienes una cuenta?</label>
          <label>
            <Link to="/login">
              Login
            </Link>
          </label> 
        </div>
    </>
  )
}
