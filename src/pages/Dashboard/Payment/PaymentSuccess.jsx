import React from "react";
import { Link } from "react-router";

const PaymentSuccess=()=>{
return (
    <div>
        <h2>Payment Successfull</h2>
        <Link to='/dashboard/my-parcels' className="btn btn-primary text-black">View Parcels</Link>| OR |
        <Link to='/' className="btn btn-primary text-black">Back to Home</Link>
    </div>
);
};

export default PaymentSuccess;