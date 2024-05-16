"use client";
import { Button } from "@/components/ui/button";
import { createUser } from "@/drizzle/services/users";
import React from "react";

const AddUser = () => {
  const submit = async () => {
    try {
      const r = await createUser();
      console.log(r);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={submit}>Add user</Button>
    </div>
  );
};

export default AddUser;
