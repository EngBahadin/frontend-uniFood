"use client";
import { baseURL } from "@/lib/axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const wssBaseURL = process.env.NEXT_PUBLIC_WSS_BASE_URL;
function CheckEmail() {
  const router = useRouter();

  useEffect(() => {
    let url = `${wssBaseURL}/ws/socket-server/`;
    console.log(url);

    const socket = new WebSocket(url);

    socket.onopen = function () {
      console.log("onopen");
      socket.send(
        JSON.stringify({
          refresh_token: getCookie("refresh_token"),
        })
      );
    };

    // to listen to events from server.
    socket.onmessage = function (event) {
      console.log("onmessage");
      let data = JSON.parse(event.data);
      if (data.type === "error") {
        console.log("error: ", data);
      }
      if (data.type === "success") {
        toast.success("account verified successfully");
        router.push("/");
      }
    };
  }, []);

  return (
    <main className="py-[146px] bg-white flex flex-col">
      <Image
        src="/unifood-logo.png"
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain absolute left-0 top-0 ml-[40px] mt-[40px]"
      />
      <div className="flex flex-col items-center ">
        <h2 className="text-sub-heading-1-semiBold text-primary-lm">
          Just one more step !
        </h2>
        <p className="text-body-3-regular mt-6">
          A confirmation link has been sent to your email. Please check your
          inbox to verify your account.
        </p>
        <Image
          src="/pana.png"
          alt="check email image"
          width={467}
          height={292}
          className="object-contain mt-9"
        />
      </div>
    </main>
  );
}

export default CheckEmail;
