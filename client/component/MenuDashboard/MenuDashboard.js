import React from "react";
import Link from "next/link";
import {Breadcrumb} from "antd";


const MenuDashboard = ()=>{
  const items = [
    {
      label: "User infomation",
      key: "info",
    },
  ]
  return(
    <>
      <div>
        <Image
          width= {200}
          src = "assets/logo/mochi_logo.png"
        />
        <Breadcrumb
          items={[
            {
              title: <Link to="/Home">Home</Link>,
            },
            {
              title: <Link to="/admin/users-management">User list</Link>,
            },
            {
              title: "Create",
            },
          ]}
        />
        <Menu
          className="mt-10"
          selectedKeys={["info"]}
          mode="horizontal"
          items={items}
        />
      </div>
    </>
  )

}
export  default MenuDashboard;
