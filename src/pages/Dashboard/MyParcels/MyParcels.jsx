import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })
    return (
        <div className='m-4 my-8'>

            {/* Parcel data */}
            <div className=''>
                <h2 className='text-2xl font-semibold'>Issued parcels : {parcels.length}</h2>

                {/* parcel table */}
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
                                    <td>

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