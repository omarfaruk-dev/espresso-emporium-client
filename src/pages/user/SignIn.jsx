import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import bgImage from '../../assets/images/bg-flower.png'; // Replace with your actual image path
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {

    const { signInUser } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then((userCredential) => {
                const currentUser = userCredential.user;
                const signInInfo = {
                    email, lastSignInTime: currentUser?.metadata?.lastSignInTime
                }
                navigate(`${location.state ? location.state : '/'}`)
                // update last signIn to db
                fetch('https://espresso-emporium-server-alpha.vercel.app/users', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(signInInfo),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.matchedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "SignIn successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signin user:', errorCode, errorMessage);
            });
    };

    return (
        <div
            className="py-10 min-h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="bg-accent rounded-2xl shadow-lg w-full max-w-md p-8 border-t-4 border-b-4 border-primary">
                <h2 className="text-3xl font-bold text-[#331A15] mb-6 text-center rancho-font">User SignIn</h2>

                <form onSubmit={handleSignIn} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#331A15] mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Enter your email"
                            // value=''
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#331A15] mb-1">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="Enter your password"
                                // value=''
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center text-primary cursor-pointer"
                                onClick={togglePassword}
                            >
                                {showPassword ? <FaEyeSlash className="text-secondary" /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="rancho-font text-primary btn btn-secondary w-full py-2 font-semibold transition-all text-2xl"
                    >
                        Sign In
                    </button>

                    {/* OR Divider */}
                    <div className="flex items-center py-3 space-x-1">
                        <div className="flex-1 h-px sm:w-16 bg-secondary"></div>
                        <p className="px-3 text-sm text-[#331A15]">Or login with</p>
                        <div className="flex-1 h-px sm:w-16 bg-secondary"></div>
                    </div>

                    {/* Google Sign In */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            
                            className="flex items-center justify-center w-full py-2 space-x-3 border-2 border-[#331A15] bg-white rounded-xl focus:ring-2 focus:ring-offset-1 focus:ring-secondary"
                        >
                            <FcGoogle size={22} />
                            <span className="text-[#331A15] font-medium">Continue with Google</span>
                        </button>
                    </div>

                    {/* Signup Redirect */}
                    <p className="text-center text-sm text-[#331A15] mt-4">
                        New to Espresso Emporium?{' '}
                        <Link to="/signup" className="text-secondary hover:underline hover:text-[#331A15] transition-all">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
