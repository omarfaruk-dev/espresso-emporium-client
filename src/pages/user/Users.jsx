import {  useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
// import { AuthContext } from '../../context/AuthContext';

const Users = () => {
    // const { deleteSingleUser } = use(AuthContext);
    const initialUsers = useLoaderData();
    const [users, setUsers] = useState(initialUsers);

    const handleDelete = (id) => { //firebaseUid
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#331A15',
        cancelButtonColor: '#D2B48C',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            // 1️⃣ Step 1: Delete from MongoDB
            fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount) {
                                Swal.fire(
                                    'Deleted!',
                                    'User has been deleted.',
                                    'success',
                                );
                                //delete from state and update
                                const remainingUsers = users.filter(user => user._id !== id)
                                setUsers(remainingUsers);
                    }
                });
        }
    });
};

    return (
        <div className='min-h-screen mx-auto max-w-7xl'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Phone No</th>
                            <th>Member Since</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photo}
                                                    alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.phone}
                                    {/* <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                                <td>{user.creationTime}</td>
                                <th>
                                    <div className="flex space-x-2 sm:space-y-3">
                                        <Link >
                                            <button

                                                className="p-2  bg-secondary hover:bg-[#c9b695] text-white rounded-md transition-colors"
                                            >
                                                <BsEye size={18} className="" />
                                            </button>
                                        </Link>
                                        <Link>
                                            <button

                                                className="p-2  bg-[#4A4A4A] hover:bg-[#3A3A3A] text-white rounded-md transition-colors"
                                            >
                                                <FiEdit size={18} className="" />
                                            </button>
                                        </Link>
                                        <Link>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 bg-[#EA5252] hover:bg-[#d04242] text-white rounded-md transition-colors"
                                            >
                                                <FaTrash size={18} className="" />
                                            </button>
                                        </Link>
                                    </div>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;