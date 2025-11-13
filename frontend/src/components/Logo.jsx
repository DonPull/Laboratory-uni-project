import { useNavigate } from 'react-router-dom';
import logoImg from '../../public/logo.png';
import '../styles/Logo.css';

function Logo() {
    const navigate = useNavigate();

    return (
        <div className="logo" onClick={() => navigate('/')}>
            <label>Lul</label>
            <img src={logoImg} alt="Logo" />
            <label>n-Labs</label>
        </div>
    );
}

export default Logo;