import Link from "next/link";
import { getAuth, removeTokens } from "./authentication/Auth";

function ProfilePic() {
  const accessToken = getAuth();
  const handleLogout = () => {
    removeTokens();
  };
  return (
    <>
      {accessToken ? (
        <div
          onClick={handleLogout}
          className="border-gray-100 hover:border-2 bg-primary-lm  md:w-8 md:h-8 sm:w-7 sm:h-7 w-6 h-6  rounded-full"
        ></div>
      ) : (
        <Link href="/auth/signin">Sign in</Link>
      )}
    </>
  );
}
export default ProfilePic;
