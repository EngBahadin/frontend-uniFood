import { TfiArrowCircleLeft } from "react-icons/tfi";
import Input from "./authentication/Input";
import Button from "./ui/Button";
import { MdEmail } from "react-icons/md";

function ChangeEmail({
  onComponent,
}: {
  onComponent: (component: string) => void;
}) {
  const isPending = false;
  return (
    <div className="rounded-2xl border-[2px] border-gray-50 p-5 flex flex-col w-fit gap-y-3 ">
      <header className="grid grid-flow-col grid-cols-3 ">
        <button type="button" className="w-fit cursor-pointer rounded-2xl ">
          <TfiArrowCircleLeft className=" text-gray-100 sm:w-8 sm:h-10 h-7 w-5 " onClick={()=>onComponent('')}/>
        </button>
        <h3 className="place-content-center text-center text-primary-lm text-body-3-medium">
          Personal information
        </h3>
      </header>
      <form action="">
        <ul className="grid gap-y-3 text-body-4-medium">
          <li className="grid gap-y-2">
            <span className="flex items-center gap-x-3 text-primary-lm">
              <MdEmail />
              <span>Current email address</span>
            </span>{" "}
            <p className="text-text-1-regular text-gray-100">
              JohnDoe@gmail.com
            </p>
          </li>
          <li>
            <hr className="border-[1px] text-gray-50" />
          </li>
          <li className="text-primary-lm text-body-4-semiBold">
            Change your email address
          </li>
          <li className="flex">
            <Input
              name="email"
              type="email"
              label="New email"
              IconType="email"
              placeholder="example@gmail.com"
            />
          </li>
        </ul>
        <Button isPending={isPending} position="w-[60%] ml-[20%] my-14 mb-8">
          Confirm Changes
        </Button>
      </form>
    </div>
  );
}
export default ChangeEmail;
