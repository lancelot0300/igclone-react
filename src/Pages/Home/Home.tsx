import { IResponse } from "../../interfaces/interfaces";
import Post from "../../components/Post/Post";
import { useEffect} from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import React from "react";

export const Home = () => {

  const { isError, isLoading, isFetching, data, fetchNextPage, hasNextPage } = useInfiniteQuery<IResponse>(
    "posts",
    async ({ pageParam = 1 }) => {
       console.log(pageParam)
      const { data } = await axios.get(`${process.env.REACT_APP_FETCH_APP}/posts/page/${pageParam}?limit=3`);
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page >= lastPage.pages) return;
        return lastPage.page + 1;
      },
    }
  );

  useEffect(() => {
    const handleScroll = () => {


      if (document.documentElement.scrollHeight <= window.innerHeight) return;

      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight -200) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(isError);
    return <div>Error...</div>;
  }

  return (
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.posts.map((post) => (
            <Post key={post._id} postData={post} />
          ))}
        </React.Fragment>
      ))}
      {isFetching && <div>Fetching...</div>}
      {!hasNextPage && <div>No more posts</div>}
    </>
  );
};
