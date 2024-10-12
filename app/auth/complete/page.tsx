"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "@/firebase";

const CompleteSignIn = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {(async ()=>{
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let storedEmail = window.localStorage.getItem("emailForSignIn");

        if (!storedEmail) {
          storedEmail = window.prompt("Please provide your email to complete sign-in.");
        }

        try {
          await signInWithEmailLink(auth, storedEmail!, window.location.href); // ! means i am sure that the email will not null
          window.localStorage.removeItem("emailForSignIn");
          setMessage("Sign-in successful! Redirecting...");

          setTimeout(() => { // 1 Second delay before redirect
            router.push("/dashboard");
          }, 1000);
        } catch (error) {
          console.error("You need to check the Error :: ", error);
          setMessage("Error completing sign-in. Please try again.");
        }
      }
  })()}, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Completing Sign-In...</h1>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CompleteSignIn;