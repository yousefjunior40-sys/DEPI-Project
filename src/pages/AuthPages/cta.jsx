import { useNavigate } from "react-router-dom"
import "./cta.css"

function CTASection(){
    const navigate = useNavigate()

    return(
        <section className="cta-section">
            <div className="cta-div">
                <h2>Own a Food Truck?</h2>
                <p>Join TruckSpot and reach thousands of hungry customers. Start getting orders today.</p>
                <button className="cta-btn" onClick={() => navigate("/register")}>Get Started</button>
            </div>
        </section>
    )
}

export default CTASection