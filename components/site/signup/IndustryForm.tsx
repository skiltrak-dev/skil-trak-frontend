import React from "react";
import {Input} from "../Input";

const IndustryForm = () => {
  return (
    <div className="my-4">
      <div className="flex">
        <Input placeholder="Business Name" type="text" name="name" />
        <Input placeholder="ABN" type="text" name="family-name" />
      </div>
      <div className="flex">
        <Input placeholder="Phone" type="text" name="name" />
        <Input placeholder="Contact Person" type="text" name="family-name" />
      </div>
      <div className="flex">
        <Input placeholder="Email" type="text" name="name" />
        <Input placeholder="Password" type="text" name="family-name" />
      </div>
      <div className="flex">
        <Input placeholder="Contact Person Phone " type="text" name="name" />
        <Input placeholder="Student Capacity" type="text" name="family-name" />
      </div>

      <div className="flex">
        <Input placeholder="Sectors" type="text" name="name" />
      </div>

      <div className="flex">
        <Input placeholder="Address" type="text" name="name" />
      </div>

      <div className="flex">
        <Input
          label={"I want to use this only once"}
          type="radio"
          name="name"
          id="check1"
        />
        <Input
          label={"I want to be a partner"}
          type="radio"
          name="name"
          id="check2"

        />
      </div>
    </div>
  );
};

export default IndustryForm;
