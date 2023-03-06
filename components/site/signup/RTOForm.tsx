import React from "react";
import {Input} from "../Input";

const RTOForm = () => {
  return (
    <div className="my-4">
      <div className="flex">
        <Input placeholder="RTO Name" type="text" name="name" />
        <Input placeholder="RTO Code" type="text" name="family-name" />
      </div>
      <div className="flex">
        <Input placeholder="RTO Phone" type="text" name="name" />
      </div>
      <div className="flex">
        <Input placeholder="Email" type="text" name="name" />
        <Input placeholder="Password" type="text" name="family-name" />
      </div>
    </div>
  );
};

export default RTOForm;
