import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import CollegeIcon from "../shared/CollegeIcon";
import DepartmentAccordion from "./DepartmentAccordion";
import { useParams } from "react-router-dom";


const CollegeAccordion = ({
  userData,
  data,
  departments,
  department,
}) => {
  const { id } = useParams();
  const user = JSON.parse(Cookies.get("user") || "{}");
  const ROLES = {
    STUDENT: 1,
    ADMIN: 2,
  };

  return (
    <div className="accordion-item">
      <div
        className={`accordion-title flex items-center px-5 py-2 ${
          data?.id == id && "bg-slate-800"
        } cursor-pointer`}
      >
        <CollegeIcon />
        <span className="ml-2">{data?.college}</span>
      </div>

      {user?.role_user?.role_id === ROLES["ADMIN"]
        ? data?.id == id &&
          departments?.map((department) => {
            return (
              <div key={department.id}>
                <DepartmentAccordion
                  data={department}
                  courses={department.courses}
                />
              </div>
            );
          })
        : data?.id == id && (
            <DepartmentAccordion
              data={department}
              courses={userData?.course_users}
            />
          )}
    </div>
  );
};

export default CollegeAccordion;
