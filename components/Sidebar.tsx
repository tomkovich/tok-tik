import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import GoogleLogin from "react-google-login";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [isShow, setShow] = useState(true);

  const userProfile = false;
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";

  return (
    <div>
      <div
        className="block xl:hiddenm -2 ml-4 mt-3 tezt-xl"
        onClick={() => setShow(!isShow)}
      >
        {isShow ? <ImCancelCircle /> : <AiOutlineMenu />}
        {isShow && (
          <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
            <div className="xl:border-b-2 border-gray-200 xl:pb-4">
              <Link href="/">
                <div className={normalLink}>
                  <p className="text-2xl">
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden xl:block">For you</span>
                </div>
              </Link>
            </div>
            {!userProfile && (
              <div className="px-2 py-4 hidden xl:block">
                <p className="text-gray-400">
                  Log in to like and comment on videos
                </p>
                <div className="pr-4">
                  <GoogleLogin
                    clientId=""
                    onSuccess={() => {}}
                    onFailure={() => {}}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="bg-white text-lg text-[#F51997] cursor-pointer border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-2 hover:text-white hover:bg-[#F51997]"
                      >
                        Log in
                      </button>
                    )}
                  />
                </div>
              </div>
            )}

            <Discover />
            <SuggestedAccounts />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
