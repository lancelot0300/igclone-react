import { IResponse } from "../../interfaces/interfaces";
import Post from "../../components/Post/Post";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

export const Home = () => {
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const {
    isError,
    isLoading,
    isFetching,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<IResponse>(
    "posts",
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_FETCH_APP}/posts/page/${pageParam}?limit=3`
      );
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.pages || lastPage.page >= lastPage.pages) return;
        return lastPage.page + 1;
      },
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollHeight <= window.innerHeight)
        return;

      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !hasFetched
      ) {
        fetchNextPage();
        setHasFetched(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasFetched]);

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
