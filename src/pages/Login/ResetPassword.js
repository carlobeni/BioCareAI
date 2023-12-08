import { useState } from "react"
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function ResetPassword() {
    const [email,setEmail] = useState("")
    const [firebaseError,setFirebaseError]=useState("")
  
    const {resetPassword} = useAuth()
  
    const navigate = useNavigate()
  
    const handleChange = ({target: {value}}) => {
      setEmail(value)
    };
   
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(email)
      if(!email) return setFirebaseError("Please enter your email");
      try {
        await resetPassword(email)
        navigate("/login")
        setFirebaseError("Correo de recuperacion Enviado");
      } catch (error) {
        setFirebaseError(error.message)
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
          <button type="submit" onClick={handleSubmit}>Aceptar</button>
        </form>
      </>
    )
  }
  