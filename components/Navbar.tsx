import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import Logo from "../utils/logo.png";

const Navbar = () => {
  const user = false;
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

      <div>SEACH</div>

      <div>
        {user ? (
          <div>Logged in</div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => console.log(res)}
            onError={() => console.log("Login error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
