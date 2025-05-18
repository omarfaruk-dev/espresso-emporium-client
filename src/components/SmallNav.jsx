
import backgroundImage from '../assets/images/nav-bg.jpg'
import logo from '../assets/images/logo.png';
import { Link } from 'react-router';

const SmallNav = () => {
    return (
        <>
            <div
                className=" bg-cover bg-center h-20 border-gray-200 flex justify-center items-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                <Link to='/' className='flex items-center'>
                    <img className='w-14 mr-3' src={logo} alt="" />
                    <p className="text-4xl rancho-font text-white text-center">
                        Espresso Emporium
                    </p>
                </Link>
            </div>
        </>
    );
};

export default SmallNav;