"use client";

import { TiUser } from "react-icons/ti";
import { GoPencil } from "react-icons/go";
import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { Button, Input } from "./funcs";
import { useContext, useRef, useState } from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { changeProfilePic, changeUsername } from "./funcs/actions";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { UserDetailsContext } from "@/context/UserDetailsContext";

function EditProfile({
  onComponent,
  username,
  profile_pic,
}: {
  id: string;
  profile_pic: string;
  username: string;
  onComponent: (component: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newProfilePic, setNewProfilePic] = useState<string | null>(null);
  const { validate, errors, setErrors } = useFormValidation();
  const { refetch } = useContext(UserDetailsContext);
  type MutateParams = {
    newUsername: string | null;
    profilePicFormData: FormData | null;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ newUsername, profilePicFormData }: MutateParams) => {
      if (newUsername && newUsername !== username) {
        console.log("Updating username...");
        await changeUsername({ new_username: newUsername });
      }
      if (profilePicFormData && newProfilePic !== profile_pic) {
        console.log("Updating profile picture...");
        await changeProfilePic(profilePicFormData);
        setNewProfilePic(null);
      }
    },
    onSuccess: async () => {
      toast.success("Profile updated successfully!");
      refetch();
      onComponent("");
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });

  const handleFileChange = () => {
    const files = fileInputRef.current?.files?.[0];
    if (files) {
      setNewProfilePic(URL.createObjectURL(files));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    let newUsername: string | null = null;
    if (validate(formData, { username: true })) {
      newUsername = formData.get("username") as string | null;
    }
    const file = fileInputRef.current?.files?.[0];

    if (newProfilePic === profile_pic && newUsername === username) {
      toast.info("It seems like you didn’t make any changes this time.");
      return;
    }

    let profilePicFormData = file ? new FormData() : null;

    if (newProfilePic) {
      if (profilePicFormData && file) {
        profilePicFormData.append("profile_pic", file);
      }
    }
    if ((!profilePicFormData && !newUsername)) return;
    mutate({ newUsername, profilePicFormData });
  };

  return (
    <div className="rounded-2xl border-[2px] border-gray-50 p-5 grid w-fit gap-y-3">
      <header className="grid grid-flow-col grid-cols-3">
        <button type="button" className="w-fit cursor-pointer rounded-2xl">
          <TfiArrowCircleLeft
            className="text-gray-100 sm:w-8 sm:h-10 h-7 w-5"
            onClick={() => onComponent("")}
          />
        </button>
        <h3 className="place-content-center text-center text-primary md:text-body-3-medium sm:text-body-4-medium text-text-1-medium">
          Personal information
        </h3>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
      >
        <ul className="grid gap-y-3 md:body-4-medium sm:text-text-1-medium text-text-2-medium">
          <li className="flex items-center gap-x-3 text-primary">
            <span>
              <BsCameraFill className="md:size-6 sm:size-5 size-4" />
            </span>
            Profile picture
          </li>
          <li>
            <div className="relative inline-block">
              <Image
                src={newProfilePic || profile_pic || "/mypic.png"}
                width={200}
                height={200}
                alt="Profile"
                className="md:size-24 sm:size-16 size-14 rounded-full object-cover z-10"
              />

              <label
                htmlFor="profile_pic"
                className="absolute bottom-0 right-0 bg-primary md:size-7 sm:size-6 size-5 rounded-full cursor-pointer z-20 flex items-center justify-center"
              >
                <GoPencil className="text-white md:size-5 sm:size-4 size-3" />
              </label>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                id="profile_pic"
                name="profile_pic"
                className="hidden"
              />
            </div>
          </li>
          <li className="grid gap-y-2">
            <span className="flex items-center gap-x-3 text-primary">
              <TiUser />
              <span>Username</span>
            </span>
            <p className="md:text-text-1-regular sm:text-text-2-regular text-text-3-regular text-gray-100">
              {username}
            </p>
          </li>
          <li>
            <hr className="text-gray-50 border-[1px]" />
          </li>
          <li className="text-primary md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold">
            Change your username
          </li>
          <li className="my-1 mb-4">
            <Input
              initialValue={username}
              name="username"
              type="text"
              label="Username"
              IconType="user"
              placeholder="e.g., johnDoe"
              errors={errors}
              setErrors={setErrors}
            />
          </li>
        </ul>
        <Button isPending={isPending} position="w-[58%] ml-[21%] my-14 mb-8">
          Confirm Changes
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
