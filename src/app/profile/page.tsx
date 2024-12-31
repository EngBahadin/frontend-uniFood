"use client";
import ChangeEmail from "../_components/ChangeEmail";
import EditProfile from "../_components/EditProfile";
import ProfileDetail from "../_components/ProfileDetail";
import { useState } from "react";

function ProfilePage() {
  const [currentComponent, setCurrentComponent] = useState("");

  const handleComponent = (component: string) => {
    setCurrentComponent(component);
  };
  return (
    <div className="md:px-16 sm:px-10 px-14 min-h-screen w-screen">
      <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 p-2 my-10 w-fit">
        Profile
      </h1>
      {currentComponent === "" && (
        <ProfileDetail onComponent={handleComponent} />
      )}
      {currentComponent === "editProfile" && (
        <EditProfile onComponent={handleComponent} />
      )}
      {currentComponent === "changeEmail" && (
        <ChangeEmail onComponent={handleComponent} />
      )}
    </div>
  );
}

export default ProfilePage;
