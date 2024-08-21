import Link from "next/link";

import { authHeaderProps } from "../../../../types";
import { TfiArrowCircleLeft } from "..";

function AuthHeader({ title, description }: authHeaderProps) {
  return (
    <header>
      <h2 className="text-sub-heading-2-semiBold text-primary-lm text-center relative top-8">
        {title}
      </h2>
      <Link href="../">
        <TfiArrowCircleLeft className="left-8 relative text-black w-8 h-10" />
      </Link>

      <p className="text-center mt-2 text-text-2-regular text-gray-100">
        {description}
      </p>
    </header>
  );
}

export default AuthHeader;
