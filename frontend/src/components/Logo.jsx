import { useNavigate } from 'react-router-dom';
import logoImg from '../../public/logo.png';

function Logo() {
    const navigate = useNavigate();

    return (
        <div className="logo" onClick={() => navigate('/')}>
            <label>Lul</label>
            <img src={logoImg} alt="Logo" />
            <label>in-Labs</label>
        </div>
    );
}

export default Logo;