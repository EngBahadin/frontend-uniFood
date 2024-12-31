import Image from "next/image";
import Link from "next/link";
import { BsCameraFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiLockKeyThin } from "react-icons/pi";
import { TiUser } from "react-icons/ti";

function ProfileDetail({
  onComponent,
}: {
  onComponent: (component: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        <section className="border rounded-2xl border-gray-50 p-8 text-primary-lm grid gap-y-3 h-full">
          {/* Your Profile Content */}
          <h3 className="md:text-body-3-semiBold sm:text-body-4-semiBold text-text-1-semiBold">
            Public information
          </h3>
          <div className="flex justify-between items-center ">
            <label className="grid gap-y-3">
              <span className="flex gap-x-4 items-center">
                <TiUser className="md:size-6 sm:size-5 size-4" />
                <p className="md:text-body-4-medium sm:text-text-1-medium text-text-2-medium ">
                  User profile
                </p>
              </span>

              <p className="md:text-body-4-regular sm:text-text-1-regular text-text-2-regular text-gray-100">
                User Name
              </p>
            </label>
            <HiArrowLongRight
              className="md:size-6 sm:size-5 size-4 cursor-pointer"
              onClick={() => onComponent("editProfile")}
            />
          </div>

          <span className="flex gap-x-4 items-center">
            <BsCameraFill className="md:size-6 sm:size-5 size-4" />
            <p className="md:text-body-4-medium sm:text-text-1-medium text-text-2-medium">
              Profile picture
            </p>
          </span>
          <span className="md:size-16 sm:size-14 size-12 bg-pure-white overflow-hidden rounded-full">
            <Image
              src="/mypic.png"
              alt="Profile Pic"
              height={100}
              width={100}
              className="size-full rounded-full border-2 border-gray-100 p-2"
            />
          </span>
        </section>

        <section className="border rounded-2xl border-gray-50 p-8 text-primary-lm flex flex-col gap-y-3  ">
          <h3 className="md:text-body-3-semiBold sm:text-body-4-semiBold text-text-1-semiBold">
            Login information
          </h3>
          <div className="flex justify-between items-center ">
            <label className="grid gap-y-3">
              <span className="flex gap-x-4 items-center">
                <CiMail className="md:size-6 sm:size-5 size-4" />
                <p className="md:text-body-4-medium sm:text-text-1-medium text-text-2-medium">
                  Email address
                </p>
              </span>

              <p className="md:text-body-4-regular sm:text-text-1-regular text-text-2-regular text-gray-100">
                example@gmail.com
              </p>
            </label>
            <HiArrowLongRight
              className="md:size-6 sm:size-5 size-4 cursor-pointer"
              onClick={() => onComponent("changeEmail")}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="flex gap-x-4 items-center">
              <PiLockKeyThin className="md:size-6 sm:size-5 size-4" />
              <p className="md:text-body-4-medium sm:text-text-1-medium text-text-2-medium">
                Change password
              </p>
            </span>
            <Link href="/auth/change-password">
              <HiArrowLongRight className="md:size-6 sm:size-5 size-4 cursor-pointer" />
            </Link>
          </div>
        </section>
        <Link href={"/auth/delete-account"} className="sm:justify-self-start justify-self-center">
          <button className="md:px-12 sm:px-10 px-9 md:py-4 py-3 w-fit bg-error-lm text-pure-white md:text-text-1-semiBold sm:text-text-2-semiBold text-text-3-semiBold my-10  rounded-lg">
            Delete account
          </button>
        </Link>
      </div>
    </>
  );
}

export default ProfileDetail;
