import { use, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import bgImg from '../../assets/images/bg-flower.png';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';


const SignUp = () => {

    const { createUser } = use(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    //validation
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showValidation, setShowValidation] = useState(false);

    const validation = {
        length: password.length >= 6,
        lowerUpper: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
        numberOrSymbol: /(?=.*[0-9])|(?=.*[^A-Za-z0-9])/.test(password),
        emailNotIncluded: !password.includes(email.split('@')[0]),
    };


    const handleSignUp = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...restFormData } = Object.fromEntries(formData.entries());


        //create user in the firebase
        createUser(email, password)
            .then((userCredential) => {
                const currentUser = userCredential.user;

                const userProfile ={ email, ...restFormData, 
                     uid: currentUser.uid,
                    creationTime: currentUser?.metadata?.creationTime,
                    lastSignInTime: currentUser?.metadata?.lastSignInTime,
                }

                //save user info in the database
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Profile Created successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error creating user:', errorCode, errorMessage);
            });


        const isValid = {
            length: password.length >= 6,
            lowerUpper: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
            numberOrSymbol: /(?=.*[0-9])|(?=.*[^A-Za-z0-9])/.test(password),
            emailNotIncluded: !password.includes(email.split('@')[0]),
        };

        if (!Object.values(isValid).every(Boolean)) {
            toast.error('Please meet all password requirements.');
            setShowValidation(true); // force the UI to show validation
            return;
        }


    };

    return (
        <div className="py-10 min-h-screen flex items-center justify-center px-4" style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>

            <title>Registration for new customer</title>
            <div className="bg-accent rounded-2xl shadow-lg w-full max-w-md p-8 border-t-4 border-b-4 border-primary">
                <h2 className="text-3xl font-extrabold text-primary mb-6 text-center rancho-font">
                    New User SignUp !
                </h2>

                <form onSubmit={handleSignUp} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Photo URL</label>
                        <input
                            name="photo"
                            type="text"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Enter your photo URL"
                        />
                    </div>
                    {/* Phone No */}
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Phone Number</label>
                        <input
                            name="phone"
                            type="text"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Address</label>
                        <input
                            name="address"
                            type="text"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-primary mb-1">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                value={password}
                                onFocus={() => setShowValidation(true)}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-secondary focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Password Validation */}
                    {showValidation && (
                        <ul className="mt-2 text-sm space-y-1">
                            <li className={validation.length ? "text-green-600" : "text-red-600"}>
                                {validation.length ? "✔" : "✘"} at least 6 characters
                            </li>
                            <li className={validation.lowerUpper ? "text-green-600" : "text-red-600"}>
                                {validation.lowerUpper ? "✔" : "✘"} both lower & upper case
                            </li>
                            <li className={validation.numberOrSymbol ? "text-green-600" : "text-red-600"}>
                                {validation.numberOrSymbol ? "✔" : "✘"} a number or symbol
                            </li>
                            <li className={validation.emailNotIncluded ? "text-green-600" : "text-red-600"}>
                                {validation.emailNotIncluded ? "✔" : "✘"} not your email address
                            </li>
                        </ul>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-secondary rancho-font text-primary w-full py-2 rounded-lg text-2xl font-semibold transition-all"
                    >
                        SignUp
                    </button>

                    {/* Divider */}
                    <div className="flex items-center py-3 space-x-1">
                        <div className="flex-1 h-px bg-secondary"></div>
                        <p className="px-3 text-sm text-primary">Login with social accounts</p>
                        <div className="flex-1 h-px bg-secondary"></div>
                    </div>

                    {/* Google Sign-in */}
                    <div className="flex justify-center my-4">
                        <button
                            
                            type="button"
                            className="flex items-center justify-center w-full py-2 border-2 border-primary bg-white rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-secondary cursor-pointer"
                        >
                            <FcGoogle className="mr-2" />
                            <p>Continue with Google</p>
                        </button>
                    </div>

                    {/* Already have an account */}
                    <p className="text-center text-sm text-primary mt-4">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-primary font-bold hover:underline hover:text-primary transition-all">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>

    );
};

export default SignUp;
