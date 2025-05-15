import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import footerImg from '../assets/images/bg-footer.jpg';
import smallFooter from '../assets/images/dark-seed.jpg';
import logo from '../assets/images/logo.png';
import Swal from "sweetalert2";

const handleContact = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

      if (!name || !email || !message) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in all the fields.",
            confirmButtonColor: '#D2B48C'
        });
        return;
    }

    const contactData = { name, email, message };
    console.log(contactData);

    //send data to server / db
    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Message has been sent successfully!",
                    text: "We will get back to you soon.",
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset()
            } else {
                Swal.fire({
                    confirmButtonColor: '#D2B48C',
                    icon: "error",
                    title: "Oops...",
                    text: "Please fill in all the fields.",
                });
                return;
            }
        })

}

const Footer = () => {
    return (
        <footer

        >
            <div className="bg-cover bg-center text-primary py-10 px-4"
                style={{
                    backgroundImage: `url(${footerImg})`, // Replace this with your image
                }}>
                <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-15 h-15"
                            />
                            <h1 className="text-4xl font-bold text-shadow-primary rancho-font">Espresso Emporium</h1>
                        </div>
                        <p className="text-base">
                            Always ready to be your friend. Come & Contact with us to share your memorable moments,
                            to share with your best companion.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 text-2xl">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaLinkedinIn /></a>
                        </div>
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-4xl font-bold text-shadow-primary rancho-font mt-6 mb-2">Get in Touch</h2>
                            <p className="flex items-center gap-2">
                                <FaPhone /> +88 01533 333 333
                            </p>
                            <p className="flex items-center gap-2">
                                <FaEnvelope /> inf@espressoemporium.com
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt /> 2 / 3, Park Road, Bogura.
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div>
                        <h2 className="text-4xl font-bold text-shadow-primary rancho-font mb-4">Connect with Us</h2>
                        <form onSubmit={handleContact} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Input Your Name"
                                name="name"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Input Your Email"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <textarea
                                name="message"
                                className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="Type Your Message Here..."
                            ></textarea>
                            <button
                                type="submit"
                                className="btn rounded-3xl border-primary rancho-font text-2xl text-primary hover:bg-primary hover:text-white"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* small footer */}
            {/* <div className="bg-cover bg-center text-center h-12 border-t border-gray-200" style={{
                backgroundImage: `url(${smallFooter})`, // Replace this with your image
            }}>
                <div className="flex justify-center items-center text-center text-[#331A15]">
                    <p className="text-lg rancho-font text-white">
                        © {new Date().getFullYear()} Espresso Emporium | All Rights Reserved
                    </p>
                </div>
            </div> */}
            <div
                className="bg-cover bg-center h-12 border-t border-gray-200 flex justify-center items-center"
                style={{
                    backgroundImage: `url(${smallFooter})`,
                }}
            >
                <p className="text-lg rancho-font text-white text-center">
                    © {new Date().getFullYear()} Espresso Emporium | All Rights Reserved
                </p>
            </div>

        </footer>
    );
};

export default Footer;
