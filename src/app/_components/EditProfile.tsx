"use client";
import { TiUser } from "react-icons/ti";
import { GoPencil } from "react-icons/go";
import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { Button, Input } from "./funcs";
import { useContext, useRef, useState } from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { changeProfilePic, changeUsername } from "./funcs/actions";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartContext } from "@/context/CartContext";

function EditProfile({
  onComponent,
  username,
  profile_pic,
  id,
}: {
  id: string;
  profile_pic: string;
  username: string;
  onComponent: (component: string) => void;
}) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null); // Correct ref type
  const [newProfilePic, setNewProfilePic] = useState<string | null>(null); // Store base64 image data
  const { validate, errors, setErrors } = useFormValidation();
  const {
    mutate: updateUsername,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: changeUsername,
    onSuccess: () => {
      toast.success("Username updated successfully");
      // onComponent("profile");
      queryClient.refetchQueries({ queryKey: ["profileDetail"] });
    },
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: changeProfilePic,
    onSuccess: () => {
      toast.success("Profile picture updated successfully");
      //onComponent("profile");
      queryClient.refetchQueries({ queryKey: ["profileDetail"] });
    },
  });

  const handleFileChange = () => {
    const files = fileInputRef.current?.files?.[0];
    if (files) {
      setNewProfilePic(URL.createObjectURL(files));
    }
  };

  const handleSubmit = (formData: FormData) => {
    const NewUserName = formData.get("username");
    const file = fileInputRef.current?.files?.[0];

    if (!newProfilePic && NewUserName === username) {
      toast.info("It seems like you didn’t make any changes this time.");
    } else {
      if (file && newProfilePic) {
        const profilePicFormData = new FormData();
        profilePicFormData.append("profile_pic", file);
        mutate(profilePicFormData);
      }

      if (NewUserName !== username) {
        if (validate(formData, { username: true })) {
          console.log(NewUserName);
          updateUsername(formData);
        }
      }
      onComponent("");
    }
  };

  if (isError) {
    console.log(error);
  }

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
      <form action={handleSubmit}>
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
                src={newProfilePic || profile_pic || "/mypic.png"} // Show selected image or default
                width={200}
                height={200}
                alt="image"
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
                alt="profile image"
                name="profile_pic"
                className="hidden"
                placeholder="null"
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
              placeholder="eg. johnDoe"
              errors={errors}
              setErrors={setErrors}
            />
            {isError && (
              <p className="text-error text-caption-1-regular">
                {error.message || ""}
              </p>
            )}
          </li>
        </ul>
        <Button
          isPending={isPending || isLoading}
          position="w-[58%] ml-[21%] my-14 mb-8"
        >
          Confirm Changes
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
