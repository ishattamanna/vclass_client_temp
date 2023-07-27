import React from "react";
import { useParams } from "react-router-dom";
import useGetClass from "../../../../../../hooks/useGetClass";
import useGetDBUser from "../../../../../../hooks/useGetDBUser";

const Stream = () => {
  const { id } = useParams();

  const { cls } = useGetClass(id);
  const { dbUser } = useGetDBUser(cls?.classTeacher);

  return <div></div>;
};

export default Stream;
