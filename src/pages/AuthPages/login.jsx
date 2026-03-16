    import { Link } from "react-router-dom";
    import loginImg from "../../assets/logo-3.png"
    import "./login.css";

    function loginPage(){
        return(
        <div className="loginMain">
            <div className="login">
                <form>
                    <h1>Login</h1>
                    <input type="text" name="username" placeholder="Username" required/>
                    <input type="password" name="password" placeholder="Password" required/>
                    <div className="pt2">
                        <label>
                            <input type="checkbox"/>
                            Remember Me
                        </label>
                        <Link to="">Forget Password?</Link>
                        <Link to="/register">Register?</Link>
                    </div>
                    <button className="loginBtn" type="submit">Sign In</button>
                </form>
                <img src={loginImg} alt="Truckspot"/>
            </div>
        </div>
        )
    }
    export default loginPage;