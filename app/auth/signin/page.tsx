"use client"

import { useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { useForm } from "react-hook-form";

const actionCodeSettings = {
  url: 'http://localhost:3000/auth/complete',
  handleCodeInApp: true
};

const SignInPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignIn = async (data: any) => {
    try {
      await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", data.email);
      setMessage("A sign-in link has been sent to your email.");
    } catch (error) {
      console.error("Check the Error :: ", error);
      setError("Failed to send sign-in link. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col items-center">
        <input
          {...register("email", {
            required: {value: true, message: "Please enter your email."},
            pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address."}
          })}
          type="email"
          placeholder="Enter your email"
          className="p-2 border rounded mb-4 w-64"
        />

        {errors.email && typeof errors.email.message === "string" && (
        <span className="text-red-700 text-sm font-bold">{errors.email.message}</span>)}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send Sign-In Link
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default SignInPage;