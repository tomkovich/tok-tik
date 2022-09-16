import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types.dev";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showVideos, setShowVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;
  const videos = showVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    setVideosList(showVideos ? userVideos : userLikedVideos);
  }, [showVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 bg-white w-full">
        <div className="flex gap-3 hover:bg-primary p-2 cursor:pointer font-semibold rounded">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              src={user.image}
              width={34}
              height={34}
              className="rounded-full"
              alt=""
              layout="responsive"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="flex gap-1 items-center text-md tracking-wider font-bold text-primary lowercase md:text-xl justify-center">
              {user.userName.replaceAll(" ", "_")}{" "}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="capitalize md:text-xl text-gray-400 text-xs">
              {user.userName}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowVideos(false)}
          >
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length ? (
            videosList.map((post: Video, idx: number) => {
              return <VideoCard post={post} key={idx} />;
            })
          ) : (
            <NoResults text={`No ${showVideos ? "" : "Liked"} Videos yet`} />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
