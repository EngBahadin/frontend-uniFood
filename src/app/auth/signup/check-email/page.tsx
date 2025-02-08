"use client";
import {
  getUserEmail,
  removeUserEmail,
} from "@/app/_components/authentication/Auth";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { apiClient } from "@/lib/axios";
import { useTheme } from "@/lib/ThemeProvider";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const wssBaseURL = process.env.NEXT_PUBLIC_WSS_BASE_URL;

function CheckEmail() {
  const router = useRouter();
  const { theme } = useTheme();

  const { refetch } = useContext(UserDetailsContext);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Load stored time left from sessionStorage
    const savedTime = parseInt(sessionStorage.getItem("timeLeft") || "0", 10);
    if (savedTime > 0) {
      setTimeLeft(savedTime);
    }

    // WebSocket logic
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

    // Listen to events from server
    socket.onmessage = function (event) {
      console.log("onmessage");
      let data = JSON.parse(event.data);
      if (data.type === "error") {
        console.log("error: ", data);
      }
      if (data.type === "success") {
        toast.success("account verified successfully");
        removeUserEmail();
        refetch(); // To update the user details in context
        router.push("/");
      }
    };

    return () => {
      socket.close(); // Close socket connection on cleanup
    };
  }, [refetch, router]);

  useEffect(() => {
    if (timeLeft > 0) {
      sessionStorage.setItem("timeLeft", timeLeft.toString());
    }

    // Countdown logic
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval);
          sessionStorage.removeItem("timeLeft");
          return 0; // Reset countdown when it reaches 0
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval); // Cleanup interval on unmount
  }, [timeLeft]);

  const handleResend = async () => {
    const email = getUserEmail();
    console.log({ email: email });
    if (timeLeft === 0) {
      toast.info("Verification email resent. Please wait...");
      await apiClient.post("/auth/users/resend_activation/", {
        email: email,
      });
      setTimeLeft(60); // 60 seconds countdown
    }
  };

  return (
    <main className="py-[146px] bg-white flex flex-col">
      <Image
        src={theme === "dark" ? "/unifood-logo-dm.png" : "/unifood-logo.png"}
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain absolute left-0 top-0 ml-[40px] mt-[40px]"
      />
      <div className="flex flex-col items-center ">
        <h2 className="md:text-sub-heading-1-semiBold sm:text-sub-heading-2-semiBold text-body-1-semiBold  text-primary">
          Just one more step !
        </h2>
        <p className="md:text-body-3-regular sm:text-body-4-regular text-text-1-regular text-black mt-6 px-8 text-center">
          A confirmation link has been sent to your email. Please check your
          inbox to verify your account.
        </p>
        <Image
          src="/pana.png"
          alt="check email image"
          width={467}
          height={292}
          className="md:size-96 sm:size-80 size-72 object-contain mt-9"
        />

        {/* Resend Verification Button */}
        <div className="mt-6">
          {timeLeft > 0 ? (
            <p className="px-4 py-2 text-primary text-text-1-regular text-gray-500">
              Resend in {timeLeft} seconds
            </p>
          ) : (
            <button
              className="px-4 py-2 bg-primary text-black text-text-1-medium rounded-md hover:bg-white hover:text-primary transition-all duration-500 hover:"
              onClick={handleResend}
            >
              Resend Verification Link
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default CheckEmail;
