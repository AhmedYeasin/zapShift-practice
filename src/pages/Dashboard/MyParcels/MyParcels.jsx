import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit } from "react-icons/fa";
import { CgDetailsLess } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] , refetch} = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })


    const handleParcelDelete = id => {
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            textColor: "#03373D",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66 ",
            cancelButtonColor: "#03373D",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {

                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                        console.log(res.data)

                    })
            }
        });
    }
    return (
        <div className='m-4 my-8'>

            {/* Parcel data */}
            <div className=''>
                <h2 className='text-2xl font-semibold'>Issued parcels : {parcels.length}</h2>

                {/* parcel info table */}
                <div className="overflow-x-auto my-8">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Receiver</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, index) => <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{parcel.receiverName}</td>

                                    <td alt="action button" className=''>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <FaEdit />
                                        </button>
                                        <button className='btn btn-square hover:bg-primary mx-2'>
                                            <CgDetailsLess />
                                        </button>
                                        <button
                                            onClick={() => handleParcelDelete(parcel._id)}
                                            className='btn btn-square hover:bg-primary'>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyParcels;