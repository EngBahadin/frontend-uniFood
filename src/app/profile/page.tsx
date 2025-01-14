"use client";
import ChangeEmail from "../_components/ChangeEmail";
import EditProfile from "../_components/EditProfile";
import ProfileDetail from "../_components/ProfileDetail";
import { useContext, useState } from "react";
import { UserDetailsContext } from "@/context/UserDetailsContext";

function ProfilePage() {
  const [currentComponent, setCurrentComponent] = useState("");
  const { email,id,profile_pic,username } = useContext(UserDetailsContext);

  const handleComponent = (component: string) => {
    setCurrentComponent(component);
  };
  return (
    <div className="md:px-16 sm:px-10 px-14 min-h-screen w-screen">
      <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary border-l-8 p-2 my-10 w-fit">
        Profile
      </h1>
      {currentComponent === "" && (
        <ProfileDetail
          email={email}
          username={username}
          profile_pic={profile_pic}
          onComponent={handleComponent}
        />
      )}
      {currentComponent === "editProfile" && (
        <EditProfile
          username={username}
          profile_pic={profile_pic}
          onComponent={handleComponent}
          id={id}
        />
      )}
      {currentComponent === "changeEmail" && (
        <ChangeEmail email={email} onComponent={handleComponent} />
      )}
    </div>
  );
}

export default ProfilePage;
