
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const ViewContacts = () => {

    const initialContacts = useLoaderData();
    const [contacts, setContacts] = useState(initialContacts);


    const handleDelete = (id) => {
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
                fetch(`https://espresso-emporium-server-alpha.vercel.app/contact/${id}`, {
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
                            // Remove the deleted contact from the state
                            const remainingContacts = contacts.filter(contact => contact._id !== id)
                            setContacts(remainingContacts);
                        }
                    })
            }
        });
    };

    return (
        <div className="overflow-x-scroll">
            <h2 className="text-3xl font-bold rancho-font text-[#331A15] mb-6">
                Contact Queries
            </h2>
            <div className="">
                <table className="table w-full border-2 border-primary">
                    <thead className="bg-[#D2B48C] text-[#331A15]">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="hover:bg-secondary">
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td><button
                                    onClick={() => handleDelete(contact._id)}
                                    className="p-2 sm:p-2.5 bg-red-400 hover:bg-red-500 text-white rounded-md transition-colors"
                                >
                                    <FaTrash size={18} className="sm:w-5 sm:h-5" />
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewContacts;
