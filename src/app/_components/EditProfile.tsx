import { TiUser } from "react-icons/ti";
import Input from "./authentication/Input";
import Button from "./ui/Button";
import { GoPencil } from "react-icons/go";
import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import { TfiArrowCircleLeft } from "react-icons/tfi";

function EditProfile({
  onComponent,
}: {
  onComponent: (component: string) => void;
}) {
  const isPending = false;
  return (
    <div className="rounded-2xl border-[2px] border-gray-50 p-5 grid w-fit gap-y-3  ">
      <header className="grid grid-flow-col grid-cols-3 ">
        <button type="button" className="w-fit cursor-pointer rounded-2xl ">
          <TfiArrowCircleLeft className=" text-gray-100 sm:w-8 sm:h-10 h-7 w-5 " onClick={()=>onComponent('')} />
        </button>
        <h3 className="place-content-center text-center text-primary-lm text-body-3-medium">
          Personal information
        </h3>
      </header>
      <form action="">
        <ul className="grid gap-y-3 text-body-4-medium">
          <li className="flex items-center gap-x-3 text-primary-lm ">
            <span>
              <BsCameraFill />
            </span>{" "}
            Profile picture{" "}
          </li>
          <li>
            <div className="relative inline-block">
              <Image
                src="/mypic.jpg"
                width={200}
                height={200}
                alt="image"
                className="size-24 rounded-full object-cover z-10"
              />

              <label
                htmlFor="profile_pic"
                className="absolute bottom-2 right-2 bg-primary-lm size-7 rounded-full cursor-pointer z-20 flex items-center justify-center"
              >
                <GoPencil className="text-white" />
              </label>

              <input
                type="file"
                id="profile_pic"
                alt="profile image"
                name="name"
                placeholder="ff"
                className="hidden"
              />
            </div>
          </li>
          <li className="grid gap-y-2">
            <span className="flex items-center gap-x-3 text-primary-lm">
              <TiUser />
              <span>Username</span>
            </span>{" "}
            <p className="text-text-1-regular text-gray-100">JohnDoe</p>
          </li>
          <li>
            <hr className="text-gray-50 border-[1px]" />
          </li>
          <li className="text-primary-lm text-body-4-semiBold">
            Change your username
          </li>
          <li className="flex">
            <Input
              name="user"
              type="text"
              label="Username"
              IconType="user"
              placeholder="eg. johnDoe"
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

export default EditProfile