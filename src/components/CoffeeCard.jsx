import { use } from 'react';
import { BsEye } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';


const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
    const { _id, name, photo, price, taste } = coffee;

    const { user } = use(AuthContext);
    const navigate = useNavigate();


    const handleDelete = (_id) => {
        if (!user) {
            return navigate('/signin')
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#331A15', // your primary color
            cancelButtonColor: '#D2B48C',  // your secondary color
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://espresso-emporium-server-alpha.vercel.app/coffees/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire(
                                'Deleted!',
                                'Your coffee has been deleted.',
                                'success',
                            );
                            // Remove the deleted coffee from the state
                            const remainingCoffees = coffees.filter(coffee => coffee._id !== _id);
                            setCoffees(remainingCoffees);
                        }
                    })
            }
        });
    };

    return (
        <div>
            <div className="">
                <div className="bg-accent p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4 sm:space-x-6">
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                        <img
                            className="h-36 w-28 sm:h-48 sm:w-36 object-contain" // object-contain is better for mockups
                            src={photo}
                        />
                    </div>

                    {/* Text Info Section */}
                    <div className="flex-grow min-w-0"> {/* min-w-0 helps with flex text truncation if needed */}
                        <div className="space-y-1 sm:space-y-2">
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className="font-bold text-gray-800">Name:</span> {name}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className="font-bold text-gray-800">Taste:</span> {taste}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className="font-bold text-gray-800">Price:</span> {price} Taka
                            </p>
                        </div>
                    </div>

                    {/* Icons Section */}
                    <div className="flex flex-col space-y-2 sm:space-y-3">
                        <Link to={`/coffee-details/${_id}`}>
                            <button

                                className="p-2 sm:p-2.5 bg-secondary hover:bg-[#c9b695] text-white rounded-md transition-colors"
                            >
                                <BsEye size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </Link>
                        <Link to={`/update-coffee/${_id}`}>
                            <button

                                className="p-2 sm:p-2.5 bg-[#4A4A4A] hover:bg-[#3A3A3A] text-white rounded-md transition-colors"
                            >
                                <FiEdit size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(_id)}
                            className="p-2 sm:p-2.5 bg-[#EA5252] hover:bg-[#d04242] text-white rounded-md transition-colors"
                        >
                            <FaTrash size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;