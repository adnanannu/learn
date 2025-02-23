import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
        <div className="space-y-4 ">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
          <Link to="course/createZoom" className="flex items-center gap-2">
            <img src="https://www.hatchwise.com/wp-content/uploads/2021/12/Screen-Shot-2021-12-03-at-8.16.08-AM-1024x654.png" height={50} width={100} />
            
          </Link>
        </div>
      </div>
    <div className="flex-1 p-10 ">
        <Outlet/>
      </div>
    </div>
  );
};

export default Sidebar;
