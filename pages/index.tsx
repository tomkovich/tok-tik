import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types.dev";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => (
  <div className="flex flex-col gap-10 videos h-full">
    {videos.length ? (
      videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
    ) : (
      <NoResults text="No videos yet" />
    )}
  </div>
);

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  const url = `${BASE_URL}/api${!topic ? "/post" : "/discover/" + topic}`;
  const { data } = await axios.get(url);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
