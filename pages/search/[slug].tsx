import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types.dev";
import NoResults from "../../components/NoResults";
import { useRouter } from "next/router";
import VideoCard from "../../components/VideoCard";
import { useAuthStore } from "../../store/authStore";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

const Search = ({ videos }: { videos: Video[] }) => {
  const router = useRouter();
  const { slug }: any = router.query;
  const { allUsers } = useAuthStore();
  const [showVideos, setShowVideos] = useState(true);

  const isAccounts = !showVideos ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = showVideos ? "border-b-2 border-black" : "text-gray-400";

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(slug.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setShowVideos(true)}
        >
          Videos
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts}`}
          onClick={() => setShowVideos(false)}
        >
          Accounts
        </p>
      </div>

      {!showVideos ? (
        <div className="md:mt-16 ">
          {searchedAccounts.length ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex items-center mb-3 pb-2 gap-3 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div className="w-8 h-8">
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt=""
                    />
                  </div>

                  <div className="hidden xl:block ">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(" ", "_")}{" "}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No accounts results for ${slug}`} />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, index: number) => (
              <VideoCard post={video} key={index} />
            ))
          ) : (
            <NoResults text={`No videos results for ${slug}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${slug}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
