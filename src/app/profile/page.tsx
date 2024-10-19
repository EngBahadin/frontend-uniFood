import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiLockKeyThin } from "react-icons/pi";
import { TiUser } from "react-icons/ti";

function ProfilePage() {
  return (
    <div className="px-16">
      <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 my-10 ">
        Profile
      </h1>
      <div className="grid grid-cols-2 gap-x-4">
        <section className="border rounded-2xl border-gray-50 p-8 text-primary-lm grid gap-y-3 h-full">
          {/* Your Profile Content */}
          <h3 className="text-body-3-semiBold">Public information</h3>
          <div className="flex justify-between items-center ">
            <label className="grid gap-y-3">
              <span className="flex gap-x-4">
                <TiUser className="size-6" />
                <p className="text-body-4-medium">User profile</p>
              </span>

              <p className="text-body-4-regular text-gray-100">Blnd Ismael</p>
            </label>
            <HiArrowLongRight className="size-6" />
          </div>

          <span className="flex gap-x-4">
            <BsCameraFill className="size-6" />
            <p className="text-body-4-medium">Profile picture</p>
          </span>
          <span>
            <Image
              src="/man_pic.webp"
              alt="Profile Pic"
              height={100}
              width={100}
              className="size-20 rounded-full border-2 border-gray-300 p-2"
            />
          </span>
        </section>

        <section className="border rounded-2xl border-gray-50 p-8 text-primary-lm flex flex-col gap-y-3  ">
          <h3 className="text-body-3-semiBold">Login information</h3>
          <div className="flex justify-between items-center ">
            <label className="grid gap-y-3">
              <span className="flex gap-x-4">
                <CiMail className="size-6" />
                <p className="text-body-4-medium">Email address</p>
              </span>

              <p className="text-body-4-regular text-gray-100">
                example@gmail.com
              </p>
            </label>
            <HiArrowLongRight className="size-6" />
          </div>
          <div className="flex justify-between">
            <span className="flex gap-x-4">
              <PiLockKeyThin className="size-6" />
              <p className="text-body-4-medium">Change password</p>
            </span>
            <HiArrowLongRight className="size-6" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
