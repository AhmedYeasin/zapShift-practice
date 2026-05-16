import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log('sessionId->', sessionId)
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
            })
        }
    }, [sessionId, axiosSecure])

    return (
        <div>
            <h2>Payment Successfull</h2>
            <Link to='/dashboard/my-parcels' className="btn btn-primary text-black">View Parcels</Link>| OR |
            <Link to='/' className="btn btn-primary text-black">Back to Home</Link>
        </div>
    );
};

export default PaymentSuccess;