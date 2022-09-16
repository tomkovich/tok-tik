import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdAdd } from "react-icons/io";

import { useAuthStore } from "../store/authStore";
import { createOrGetUser } from "../utils";

import Logo from "../utils/logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { userProfile, addUser, removeUser } = useAuthStore();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) router.push(`/search/${searchValue}`);
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            alt="Tok Tik"
            className="cursor-pointer"
            src={Logo}
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white"
        >
          <input
            type="text"
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
            placeholder="Search accounts and videos"
            className="rounded-full border-box md:top-0 bg-primary p-3 md:text-md font-medium border-gray-100 focus:outline-none w-[300px] md:w-[350px]"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-3 border-l-2 border-gray-300 pl-4 text-2xl"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="">
                <>
                  <Image
                    width={40}
                    height={40}
                    src={userProfile.image}
                    alt="user photo"
                    className="rounded-fill courser-pointer"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => console.log("Login error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
