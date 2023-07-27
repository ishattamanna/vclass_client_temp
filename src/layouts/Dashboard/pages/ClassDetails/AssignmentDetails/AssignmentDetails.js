import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentIcon from "../../../../../tools/icons/DocumentIcon";
import IconCoverButton from "../../../../../tools/buttons/IconCoverButton";
import useGetAssignment from "../../../../../hooks/useGetAssignment";
import useGetClass from "../../../../../hooks/useGetClass";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import LikeIcon from "../../../../../tools/icons/LikeIcon";
import SendIcon from "../../../../../tools/icons/SendIcon";
import TextField from "../../../../../tools/inputs/TextField";
import AttachIcon from "../../../../../tools/icons/AttachIcon";
import BasicIconOutlineButton from "../../../../../tools/buttons/BasicIconOutlineButton";
import PlusIcon from "../../../../../tools/icons/PlusIcon";
import BasicButton from "../../../../../tools/buttons/BasicButton";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import DropboxChooser from "react-dropbox-chooser";
import IconOutlineCoverButton from "../../../../../tools/buttons/IconOutlineCoverButton";
import CrossIcon from "../../../../../tools/icons/CrossIcon";
import useGetClasses from "../../../../../hooks/useGetClasses";
import { toast } from "react-toastify";
import useGetSubByAs from "../../../../../hooks/useGetSubByAs";
import SubmissionCard from "./components/SubmissionCard";

const AssignmentDetails = () => {
  const { assignmentId, id } = useParams();
  const { authUser } = useContext(AuthContext);
  const [fileContent, setFileContent] = useState(null)

  const [selectedTab, setSelectedTab] = useState("i");

  const { asnment, assignemntRefetch } = useGetAssignment(assignmentId);
  const { cls, clsRefetch } = useGetClass(id);
  const { classesRefetch } = useGetClasses()
  const { dbUser } = useGetDBUser(cls?.classTeacher);
  const { asSubs, asSubsRefetch } = useGetSubByAs(assignmentId)


  const handleChange = (files) => {
    console.log(files[0]);
    setFileContent(files[0]);
  };



  const handleSubmit = () => {
    if (fileContent) {
      const submissionInfo = {
        classId: id,
        assignmentId,
        submittedBy: authUser?.email,
        submittedFile: fileContent,
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1
          }-${new Date().getDate()}`,
      }

      fetch(`${process.env.REACT_APP_serverSiteLink}add-submission`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(submissionInfo)
      }).then(res => res.json()).then(data => {
        console.log(data)
        if (data?.acknowledged) {
          assignemntRefetch()
          clsRefetch()
          classesRefetch()
          asSubsRefetch()
          toast.success('Your assignment is submitted')
          setFileContent(null)
        }
      })



    }
  }



  return (
    <div>
      <div className="tabs tabs-boxed">
        <button
          onClick={() => setSelectedTab("i")}
          className={`tab w-[50%] ${selectedTab === "i" ? "tab-active" : ""}`}
        >
          Instructions
        </button>
        <button
          onClick={() => setSelectedTab("s")}
          className={`tab w-[50%] ${selectedTab === "s" ? "tab-active" : ""}`}
        >
          Submissions
        </button>
      </div>
      {/* instructions */}
      {
        selectedTab === 'i' ?
          <div className="lg:flex justify-evenly px-5 my-5">
            <div
              className={`${dbUser?.email !== authUser?.email ? "lg:w-[40%]" : "lg:w-full"
                }`}
            >
              <div className="flex items-start">
                <IconCoverButton>
                  <DocumentIcon className={"w-10 h-10"} />
                </IconCoverButton>
                <div className="mx-2">
                  <h3 className="lg:text-5xl text-3xl font-bold">
                    {asnment?.title}
                  </h3>
                  <p className="text-start">
                    <span>{dbUser?.userName} .</span>
                    <span> {asnment?.date}</span>
                  </p>
                  <p className="text-start">{asnment?.totalPoints} points</p>
                  <p className="text-start">Deadline : {asnment?.deadline}</p>
                </div>
              </div>
              <hr className="my-2 border border-black border-solid" />
              <div
                dangerouslySetInnerHTML={{ __html: asnment?.details }}
                className="text-start"
              ></div>
              <hr className="my-2 border border-black border-solid" />
              <div className="flex items-center justify-between px-4 py-3 border-t gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={dbUser?.profilePic} alt="" />
                  </div>
                </div>
                <TextField placeholder={"Aa"} className={"w-full input-sm"} />
                <div className="flex">
                  <button>
                    <SendIcon className={"cursor-pointer w-6 h-6 mx-2"} />
                  </button>
                </div>
              </div>
            </div>
            {dbUser?.email !== authUser?.email && (
              <div className="lg:w-[40%] rounded-lg shadow-xl p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xl">Your Work</p>
                  {
                    asSubs?.find(sub => sub?.submittedBy === authUser?.email) ?
                      <p className="text-green-500 font-semibold">Submitted</p>
                      :
                      <p className="text-red-500 font-semibold">Missing</p>
                  }
                </div>
                <div className="mt-2">
                  {
                    fileContent &&
                    <div
                      className="btn btn-primary flex justify-between lg:w-[50%] my-1"
                    >
                      <a
                        className="flex justify-between items-center"
                        href={fileContent?.link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <img className="w-10 h-10" src={fileContent?.icon} alt="" />
                        {fileContent?.name}
                      </a>
                      <IconOutlineCoverButton
                        onClick={() => {
                          setFileContent(
                            fileContent?.filter?.(
                              (deletingFile) => deletingFile !== fileContent
                            )
                          );
                        }}
                      >
                        <CrossIcon className={"w-4 h-4"} />
                      </IconOutlineCoverButton>
                    </div>
                  }
                  {
                    fileContent ? <BasicButton onClick={handleSubmit} className={"mt-4 w-full"}>Submit</BasicButton> :
                      <DropboxChooser
                        appKey={`${process.env.REACT_APP_dropbox_secret}`}
                        success={handleChange}
                        cancel={() => console.log("canceled")}
                      >
                        <BasicIconOutlineButton className={"w-full"}>
                          <PlusIcon className={"w-6 h-6 "} />
                          Add Submission
                        </BasicIconOutlineButton>
                      </DropboxChooser>
                  }
                </div>
              </div>
            )}
          </div>
          :
          <div className="mt-5 lg:px-20">
            {
              asSubs?.map(sub => <SubmissionCard sub={sub} key={sub?._id} />)
            }
          </div>
      }

    </div>
  );
};

export default AssignmentDetails;
