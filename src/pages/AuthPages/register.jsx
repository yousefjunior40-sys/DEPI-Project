    import { Link } from "react-router-dom";
    import loginImg from "../../assets/logo-2.png"
    import "./register.css";


    function loginPage(){
        return(
        <div className="registerMain">
            <div className="register">

                <img src={loginImg} alt="Truckspot"/>
                <h1>Create your account</h1>
                <p>Join TruckSpot today</p>

                <form>

                    <label>Iam a...</label>
                    <div className="type">
                        
                        <button className="customer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" 
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                            stroke-linecap="round" stroke-linejoin="round" 
                            class="lucide lucide-user h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle></svg>
                            Customer
                        </button>
                        <button className="truck">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" 
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                            stroke-linecap="round" stroke-linejoin="round" 
                            class="lucide lucide-truck h-5 w-5">
                            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                            <path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                            <circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
                            Truck Owner
                        </button>
                        <button id="delivery" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" 
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                            stroke-linecap="round" stroke-linejoin="round" 
                            class="lucide lucide-bike h-5 w-5"><circle cx="18.5" cy="17.5" r="3.5"></circle>
                            <circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="15" cy="5" r="1"></circle>
                            <path d="M12 17.5V14l-3-3 4-3 2 3h2"></path></svg>
                            Delivery
                        </button>
                        
                    </div>

                    <label>Full Name</label>
                    <div className="name">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                        viewBox="0 0 24 24" fill="none" stroke="#464343b2" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle></svg>
                        <input type="text" name="username" placeholder="Muhammed Ramadan" required/>
                    </div> 

                    <label>Email</label>
                    <div className="email">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                        viewBox="0 0 24 24" fill="none" stroke="#464343b2" stroke-width="2" 
                        stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                        <input type="text" name="username" placeholder="you@example.com" required/>
                    </div> 

                    <label>Password</label>
                    <div className="pass">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="#464343b2" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        <input type="password" name="password" placeholder="••••••••" required />
                    </div>

                    <button className="registerBtn" type="submit">Create Account</button>

                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
        )
    }
    export default loginPage;