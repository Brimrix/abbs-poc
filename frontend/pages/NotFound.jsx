import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { HomeFilled } from "@ant-design/icons";

const NotFound = () => {
  return (
    <section className="h-[100vh] w-full bg-stone-200">
      <div className="flex flex-col items-center justify-start pt-5 h-full space-y-4">
        <img className="w-2/4 mx-auto rounded-lg shadow border" src="https://img.freepik.com/free-photo/young-handsome-guy-wearing-pink-polo-shirt-looking-scared-standing-white-wall_141793-30954.jpg?t=st=1719442675~exp=1719446275~hmac=6dfe9c10ec96d8e88bf87444d98334aacbd0ecd5a392b9b63c896a54223fe736&w=1800" alt="" />
        <p className="text-5xl font-bold">!! بس بس  </p>
        <p className="text-2xl">یہاں کیسے پہنچ گئے جناب ؟</p>
        <Link className="p-2 border border-black rounded-md hover:btn-app-transparent no-underline hover:font-bold hover:border-2" to={"/"}>
          واپس
          <HomeFilled className="ms-2" />
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
