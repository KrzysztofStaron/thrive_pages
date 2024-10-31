"use client";

import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";

const provider = new GoogleAuthProvider();

enum state {
  LOGIN = "Log In",
  CREATE = "Create Account",
}

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [mode, setMode] = useState(state.LOGIN);
  onAuthStateChanged(auth, user => {
    if (user) {
      window.location.href = "/app";
    }
  });

  const continueWithGoogle = async () => {
    setError("");

    try {
      await signInWithPopup(auth, provider);

      console.log("logged in");
    } catch (error: any) {
      setError(error.message);
    }
  };

  async function logIn() {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log("logged in");
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function signUp() {
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      console.log("logged in");
    } catch (error: any) {
      setError(error.message);
    }
  }

  function handleButton() {
    if (mode === state.CREATE) {
      signUp();
    } else {
      logIn();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-white">
          {mode == state.LOGIN ? "Log in to your account" : "Create account"}
        </h1>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleButton}>
            {mode}
          </Button>
          <button
            className="text-blue-400 text-center"
            onClick={() => {
              if (mode === state.LOGIN) {
                setMode(state.CREATE);
              } else if (mode === state.CREATE) {
                setMode(state.LOGIN);
              }
            }}
          >
            {mode === state.LOGIN ? "Create Account instead" : "Already have an account?"}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <span className="w-full border-t border-gray-600"></span>
          <span className="px-3 text-gray-400">Or</span>
          <span className="w-full border-t border-gray-600"></span>
        </div>
        <Button
          onClick={continueWithGoogle}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
        >
          <FaGoogle className="mr-2" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
