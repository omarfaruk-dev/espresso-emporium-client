import { Link, useLoaderData } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';

const CoffeeDetails = () => {
    const coffee = useLoaderData(); // Assumes data comes via loader
    const { name, photo, price, taste, supplier, quantity, details } = coffee;
    console.log(coffee);

    return (
        <div className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://i.ibb.co/Q70XtmLB/bg-flower.png')" }}>
            <div className='max-w-5xl mx-auto py-12 px-4'>
                {/* Back to Home */}
                <div className="mb-6">
                    <Link to="/" className="text-primary font-semibold inline-flex items-center mb-6 p-2 hover:text-secondary">
                        <FaArrowLeftLong className="text-gray-700" />
                        <span className="ml-2 rancho-font text-2xl text-gray-700 text-shadow-secondary hover:text-primary hover:underline">Back to home</span>
                    </Link>
                </div>

                {/* Details Card */}
                <div className="bg-accent rounded-xl shadow-md p-6 md:p-12 flex flex-col md:flex-row items-center gap-8">
                    {/* Coffee Image */}
                    <div className="w-full md:w-1/3 flex justify-center">
                        <img
                            src={photo}
                            alt={name}
                            className="w-60 h-auto rounded-lg shadow-md"
                        />
                    </div>

                    {/* Info */}
                    <div className="w-full md:w-2/3">
                        <h2 className="text-3xl font-rancho text-[#331A15] mb-4">{name} Coffee Details</h2>
                        <div className="space-y-2 text-[#5C5B5B]">
                            <p><span className="font-bold text-[#1B1A1A]">Name:</span> {name}</p>
                            <p><span className="font-bold text-[#1B1A1A]">Price:</span> {price}</p>
                            <p><span className="font-bold text-[#1B1A1A]">Supplier:</span> {supplier}</p>
                            <p><span className="font-bold text-[#1B1A1A]">Taste:</span> {taste}</p>
                            <p><span className="font-bold text-[#1B1A1A]">Quantity:</span> {quantity}</p>
                            <p><span className="font-bold text-[#1B1A1A]">Details:</span> {details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeDetails;
