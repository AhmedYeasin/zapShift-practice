import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,

        }
        const res = await axiosSecure.post('', paymentInfo)
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="m-4 my-8">
            <h2> Pay for {parcel.parcelName}</h2>
            <p>Parcel amount: ${parcel.cost} </p>
            <button className="btn btn-primary text-black my-6">Proceed to Pay</button>
        </div>
    )
}

export default Payment;