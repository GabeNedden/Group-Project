import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthProfile = () => {
  const { user } = useAuth0();
  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default AuthProfile;
