import { Link } from "react-router-dom";
import "./footer.css"
function Footer(){
    return(
        <footer className="footer">
            <div className="containerF">
                <div className="sec1">
                    <span>TruckSp
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" viewBox="0 0 24 24" fill="none" 
                    stroke="#e2743e" stroke-width="2" stroke-linecap="round" 
                    stroke-linejoin="round" class="lucide lucide-map-pin h-5 w-5 text-accent inline -mx-0.5 relative -top-px"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle></svg>
                    t</span>
                    <p>Discover the best food trucks near you. fresh, fast, and always on the move.</p>
                </div>
                <div className="sec2">
                    <p>Quick Links</p>
                    <ul>
                        <li><Link to="">Food Truck</Link></li>
                        <li><Link to="">My Cart</Link></li>
                        <li><Link to="">Profile</Link></li>
                    </ul>
                </div>
                <div className="sec3">
                    <p>Support</p>
                    <ul>
                        <li><Link to="">FAQ</Link></li>
                        <li><Link to="">Privact Policy</Link></li>
                        <li><Link to="">Tearms of service</Link></li>
                    </ul>
                </div>
                <div className="sec4">
                    <p>Contact</p>
                    <ul>
                        <li>123 Food Lane, NY</li>
                        <li>(555) 123-4567</li>
                        <li>hello@truckspot.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div className="rights">© 2026 TruckSpot. All rights reserved.</div>
        </footer>
    )
}
export default Footer;