import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment Cancelled</h2>
            <p>Your payment was cancelled. Please try again.</p>

            <Link to='/dashboard/my-parcels' className="btn btn-primary text-black">
                View Parcels
            </Link> | OR |
            <Link to='/' className="btn btn-primary text-black">
                Back to Home
            </Link>
        </div>
    );
};

export default PaymentCancelled;