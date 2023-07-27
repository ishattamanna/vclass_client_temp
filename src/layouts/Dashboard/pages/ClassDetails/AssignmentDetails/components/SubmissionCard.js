import React from 'react';
import useGetDBUser from '../../../../../../hooks/useGetDBUser';

const SubmissionCard = ({ sub }) => {

    const { dbUser } = useGetDBUser(sub?.submittedBy)



    return (
        <div className={`flex items-center justify-between mt-2 px-4 border border-black shadow-lg p-2 rounded-lg`}>
            <div
                className="flex items-center w-full cursor-pointer"
            >
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={dbUser?.profilePic} alt="" />
                    </div>
                </div>
                <p className="ml-2 font-bold">{dbUser?.userName}</p>
            </div>
        </div>
    );
};

export default SubmissionCard;