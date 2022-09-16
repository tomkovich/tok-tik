import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { useAuthStore } from "../store/authStore";

interface Like {
  _ref: string;
  _id: string;
}

interface IProps {
  likes: Like[] | null;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton = ({ handleLike, handleDislike, likes = [] }: IProps) => {
  const { userProfile }: any = useAuthStore();
  const [isLiked, setLiked] = useState(false);
  const filterLikes = likes?.filter(({ _ref }) => _ref === userProfile?._id);

  useEffect(() => {
    setLiked(!!filterLikes?.length);
  }, [likes, filterLikes]);

  return (
    <div className="gap-6 flex">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {isLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="mt-2 text-md font-semibold">{likes?.length || 0} likes</p>
      </div>
    </div>
  );
};

export default LikeButton;
