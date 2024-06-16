/*
* Title: Rent Request Handler
* Description: Purpose is to reject or accept rent reqs
* Author: Wbaidur Rahman
* Date: 28/4/2024
*
*/


import axios from 'axios';
import { toast } from 'react-toastify';

import notifyUser from './notifyUser';


// internel imports

const apiUrl = import.meta.env.VITE_API_URL;

// purpose is to reject rent request and notify the borrower
export async function rejectRentReq({rentreq, user}){
    try {
        // deleting the rent request first
        await axios.delete(`${apiUrl}/rentrequest/${rentreq._id}`);

        // updating the user
        const updatedUser = {
            ...user,
            rentrequests: user.rentrequests.filter((id) => id !== rentreq._id),
          };
   
        const response = await axios.put(
            `${apiUrl}/users/${user._id}`,
            updatedUser
        );

        if (response.data) {
            toast.success(response.data.msg, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
        }

        // notifying the borrower
        const notification = {
            ownerid: rentreq.borrowerid,
            title: "RentReq Rejection",
            message: `Your Request for book '${rentreq.title}' does not approved`,
        }

        notifyUser(notification);

    } catch (err) {
        console.log(err.response.data);
    }
}

// purpose is to accept rent request and then notifying the corresponding parties 
export async function acceptRentReq({rentreq, ownerPhone}){

    try {
        // getting an agent
        let response = await axios.get(`${apiUrl}/admin/`);
        const agent = response.data.agent;
        
        const rentinfo = {
            borrowerid: rentreq.borrowerid,
            borrower_name: rentreq.borrower_name,
            borrowerphone: rentreq.borrowerphone,
            borrower_email: rentreq.borrower_email,
            borrower_address: rentreq.borrower_address,
            ownerid: rentreq.ownerid,
            ownerphone: ownerPhone,
            bookid: rentreq.bookid,
            booktitle: rentreq.title,
            startdate: new Date().toISOString(),
            enddate: new Date(Date.now() + Number(rentreq.duration)*24 * 3600000).toISOString(),
            cost: rentreq.amount,
            duration: rentreq.duration,
            agentid: agent.agentid,
        }

        response = await axios.post(`${apiUrl}/rents`, rentinfo);

        console.log(response.data);

        if(response.data){
            toast.success(response.data.msg, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
        }

         // notifying the borrower
         const notification1 = {
            ownerid: rentreq.borrowerid,
            title: "RentReq Acceptance",
            message: `Your Request for book '${rentreq.title}' is approved`,
        }

        notifyUser(notification1);

         // notifying the agent
         const notification2 = {
            ownerid: agent.agentid,
            title: "Rent Service",
            message: `You have a rent service for book '${rentreq.title}'`,
        }

        notifyUser(notification2);


    } catch (error) {
        console.log(error.response.data);
    }
}


