import { OptionBadge } from "@/components/ui/OptionBadge";
import { TileId } from "@/types";
import { HackerNewsLinkHolder } from "@/types/hackernews";
import { Box, Heading, Link, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type PageProps = {
  tileId: TileId;
};

type HackerNewsFeed = "Ask" | "Top" | "Show";

export const HackerNewsFeed: React.FC<PageProps> = ({ tileId }) => {
  const [hackerNewsData, setHackerNewsData] = useState<
    HackerNewsLinkHolder[] | undefined
  >();
  const [hackerNewsFeed, setHackNewsFeed] = useState<HackerNewsFeed>("Ask");
  const color = `var(--text-color-${tileId})`;
  const underlineColor = color;

  useEffect(() => {
    const fetchHackerNewsData = async () => {
      try {
        const res = await fetch(
          `/api/hackerNews?hackerNewsFeed=${hackerNewsFeed}`
        );
        const data = (await res.json()) as HackerNewsLinkHolder[];

        setHackerNewsData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHackerNewsData();
  }, [hackerNewsFeed]);

  return (
    <Box p="2" color={color} position="relative">
      <Heading p="2" fontSize="xl" fontWeight="bold">
        <Link href="https://news.ycombinator.com/ask">Hacker News Feed</Link>
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={underlineColor} />
      {hackerNewsData ? (
        <>
          {hackerNewsData.map((link) => (
            <Box key={link.title} p="2" pr="4">
              <Link href={link.url}>
                <Heading fontSize="md" fontWeight="normal">
                  {link.title}
                </Heading>
              </Link>
            </Box>
          ))}
          <Box width="100%" mt="2" mb="4" textAlign="center">
            <OptionBadge onClick={() => setHackNewsFeed("Top")} color={color}>
              Top Stories
            </OptionBadge>
            <OptionBadge
              onClick={() => setHackNewsFeed("Show")}
              color={color}
              ml="2"
              mr="2"
            >
              Show Stories
            </OptionBadge>
            <OptionBadge
              onClick={() => setHackNewsFeed("Ask")}
              color={color}
              mt="2"
            >
              Ask Stories
            </OptionBadge>
          </Box>
        </>
      ) : (
        <Box height="100%" p="2">
          <Skeleton height="15px" mt="3" width="90%" />
          <Skeleton height="15px" mt="3" />
          <Skeleton height="15px" mt="3" width="75%" />
          <Skeleton height="15px" mt="3" width="65%" />
          <Skeleton height="15px" mt="3" width="85%" />
          <Skeleton height="15px" mt="3" width="95%" />
          <Skeleton height="15px" mt="3" width="75%" />
          <Skeleton height="15px" mt="3" />
          <Skeleton height="15px" mt="3" width="70%" />
          <Skeleton height="15px" mt="3" width="85%" />
          <Skeleton height="15px" mt="3" width="95%" />
        </Box>
      )}
    </Box>
  );
};
