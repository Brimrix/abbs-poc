import React from "react";
import { Link } from "react-router-dom";
import "@styles/NotFound.css";
import { Button } from "antd";
import { HomeFilled } from "@ant-design/icons";

const NotFound = () => {
  return (
    <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span className="display-1 fw-bold">
                  Such page does not exist in ABBS
                </span>
              </h2>
              <div>
                <h3 className="h2 mb-2">Oops! You're lost.</h3>
                <p className="mb-5">Please try to navigate to valid routes.</p>
                <Button icon={<HomeFilled />} className="page-button">
                  <Link className="link-home" to={"/"}>
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
