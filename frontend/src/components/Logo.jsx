import { useNavigate } from 'react-router-dom';
import logoImg from '../../public/logo.png';
import '../styles/Logo.css';

function Logo({ scale = 1 }) {
    const navigate = useNavigate();

    return (
        <div className="logo" onClick={() => navigate('/')}>
            <label style={{ "fontSize": `calc(2.7rem * ${scale})` }}>Lul</label>
            <img src={logoImg} alt="Logo" style={{ "width": `calc(17px * ${scale})`, "transform": `translateY(calc(9px * ${scale}))` }} />
            <label style={{ "fontSize": `calc(2.7rem * ${scale})` }}>n-Labs</label>
        </div>
    );
}

export default Logo;