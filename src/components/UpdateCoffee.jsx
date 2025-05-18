import React from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const { _id, name, photo, price, taste, supplier, quantity, details } = coffee;

    const handleUpdateCoffee = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const updatedCoffee = Object.fromEntries(formData.entries());

        //send updated data to the database
        fetch(`https://espresso-emporium-server-alpha.vercel.app/coffees/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Coffee added successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    return (
        <div className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://i.ibb.co/Q70XtmLB/bg-flower.png')" }}>
            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className='flex md:justify-between flex-wrap justify-center'>
                    <Link to="/" className="text-primary font-semibold inline-flex items-center mb-6 p-2 hover:text-secondary">
                        <FaArrowLeftLong className="text-gray-700" />
                        <span className="ml-2 rancho-font text-2xl text-gray-700 text-shadow-secondary hover:text-primary hover:underline">Back to home</span>
                    </Link>
                    <Link to={`/coffee-details/${_id}`} className="text-primary font-semibold inline-flex items-center mb-6 p-2 hover:text-secondary">
                        <span className="mr-2 rancho-font text-2xl text-gray-700 text-shadow-secondary hover:text-primary hover:underline">View Updated Coffee</span>
                        <FaArrowRightLong className="text-gray-700" />
                    </Link>
                </div>
                <div className="bg-accent px-20 py-16 rounded-md shadow-md border border-secondary">
                    <h2 className="text-5xl text-gray-700 text-shadow-secondary rancho-font font-bold text-center mb-4 leading-10">Update Existing Coffee Details</h2>
                    <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto mb-10">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.
                    </p>

                    <form onSubmit={handleUpdateCoffee} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={name}
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
                                    defaultValue={quantity}
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
                                    defaultValue={supplier}
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
                                    defaultValue={taste}
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
                                    defaultValue={price}
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
                                    defaultValue={details}
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
                                defaultValue={photo}
                                placeholder="Enter photo URL"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>

                        <button type="submit" className="text-2xl rancho-font btn btn-secondary w-full text-primary">
                            Update Coffee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCoffee;