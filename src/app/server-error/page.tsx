import Image from "next/image";

function ErrorPage() {
  return <Image className="object-contain" src={"/500-error.png"} alt={"500 error"} fill />;
}

export default ErrorPage;
