import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";

import { useAuthStore } from "../store/authStore";
import { IUser } from "../types.dev";
import NoResults from "./NoResults";

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}

interface IProps {
  comment: string;
  comments: IComment[];
  isPostingComment: Boolean;
  addComment: (e: React.FormEvent) => void;
  setComment: Dispatch<SetStateAction<string>>;
}

const Comments = ({
  isPostingComment,
  comments,
  setComment,
  addComment,
  comment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map(({ comment, postedBy }, idx) => {
            return (
              <>
                {allUsers.map(
                  (user: IUser) =>
                    user._id === (postedBy._ref || postedBy._id) && (
                      <div key={idx} className="p-2 items-center">
                        <Link href={`/profile/${user._id}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8">
                              <Image
                                src={user.image}
                                width={34}
                                height={34}
                                className="rounded-full"
                                alt=""
                                layout="responsive"
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
                        <div className="">
                          <p>{comment}</p>
                        </div>
                      </div>
                    )
                )}
              </>
            );
          })
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 md:px-10 pb-6 px-2">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={({ target: { value } }) => setComment(value)}
              placeholder="Add a comment"
              className="bg-primary px-6 py-4 text-medium font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-gray-300 flex-1 rounded-lg focus:border-2"
            />
            <button type="submit" className="text-md text-gray-400">
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
