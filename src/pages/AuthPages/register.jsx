    import { Link } from "react-router-dom";
    import loginImg from "../../assets/logo-3.png"
    import "./register.css";

    function RegisterPage(){
        return(
        <div className="registerMain">
            <div className="userType">
                <h1>Register as</h1>
                <div className="btns1">
                    <button>Customer</button>
                    <button>Truck owner</button>
                </div>
            </div>
            <div className="register">
                <form>
                    <h1>Sign Up</h1>
                        <input type="text" name="name" placeholder="Full Name" required />
                        <input type="text" name="username" placeholder="Truck Name" />
                        <label>Gender:
                            <input type="radio" name="gender" /> Male
                            <input type="radio" name="gender" /> Female
                        </label>
                        <input type="text" name="address" placeholder="Address" required/>
                        <input type="tel" name="phone" placeholder="Phone" required/>
                        <input type="password" name="password" placeholder="Password"required />
                        <input type="password" name="password" placeholder="Password Confirmation"required />
                    <div className="pt1">
                        <Link to="/login">Already Has Account?</Link>
                    </div>
                    <button type="submit">Register</button>
                </form>
                <img src={loginImg} alt="Truckspot"/>
            </div>
        </div>
        )
    }
    export default RegisterPage;