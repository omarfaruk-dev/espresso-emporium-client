import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";
import Swal from "sweetalert2";

// import img from "../assets/images/bg/bg-flower.png";   

const AddCoffee = () => {

    const handleAddCoffee = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newCoffee = Object.fromEntries(formData.entries());
        console.log(newCoffee);

        //send data to db
        fetch('http://localhost:3000/coffees', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after adding coffee', data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Coffee added successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }


    return (
        <div className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://i.ibb.co/Q70XtmLB/bg-flower.png')" }}>
            <div className="max-w-6xl mx-auto py-12 px-4">
                <Link to="/" className="text-primary font-semibold inline-flex items-center mb-6 p-2 hover:text-secondary">
                    <FaArrowLeftLong className="text-gray-700" />
                    <span className="ml-2 rancho-font text-3xl text-gray-700 text-shadow-secondary hover:text-primary hover:underline">Back to home</span>
                </Link>

                <div className="bg-accent p-10 rounded-md shadow-md border border-secondary">
                    <h2 className="text-5xl text-gray-700 text-shadow-secondary rancho-font font-bold text-center mb-4 leading-10">Add New Coffee</h2>
                    <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto mb-10">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.
                    </p>

                    <form onSubmit={handleAddCoffee} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter coffee name"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Quantity</span>
                                </label>
                                <input
                                    type="text"
                                    name="quantity"
                                    placeholder="Enter coffee Quantity"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Supplier</span>
                                </label>
                                <input
                                    type="text"
                                    name="supplier"
                                    placeholder="Enter coffee supplier"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Taste</span>
                                </label>
                                <input
                                    type="text"
                                    name="taste"
                                    placeholder="Enter coffee taste"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Price</span>
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="Coffee price / cup"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Details</span>
                                </label>
                                <input
                                    type="text"
                                    name="details"
                                    placeholder="Enter coffee details"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Photo</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Enter photo URL"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>

                        <button type="submit" className="text-2xl rancho-font btn btn-secondary w-full text-primary">
                            Add Coffee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCoffee;
