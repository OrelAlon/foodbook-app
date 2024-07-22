import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPostsWithFilters } from '../../api/ApiFetch';
import PostsFeed from '../postsFeed/PostsFeed';
import GridFeed from '../gridFeed/GridFeed';
import Loading from '../loading/Loading';
import FilterImagesModel from '../filterImagesModel/FilterImagesModel';
import { Notification } from '@mantine/core';

import './feed.scss';

const Feed = ({ showGrid }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialRestaurantUserPick = searchParams.get('restaurant') || '';
  const initialCityPick = searchParams.get('city') || '';
  const initialDishTypePick = searchParams.get('dishType') || '';

  const [restaurantUserPick, setRestaurantUserPick] = useState(
    initialRestaurantUserPick
  );
  const [cityPick, setCityPick] = useState(initialCityPick);
  const [dishTypePick, setDishTypePick] = useState(initialDishTypePick);
  const [pageNum, setPageNum] = useState(1);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      setIsLoading(true);

      const data = await fetchPostsWithFilters(
        pageNum,
        restaurantUserPick,
        cityPick,
        dishTypePick
      );
      setTotal(data.total);
      setResults((prev) => [...prev, ...data.posts]);
      setHasNextPage(Boolean(data.posts.length));
      setIsLoading(false);
      setLoading(false);
    };
    fetch();
    return () => controller.abort();
  }, [pageNum, dishTypePick, cityPick, restaurantUserPick]);

  useEffect(() => {
    setLoading(true);
    setResults([]);
    setPageNum(1);
  }, [dishTypePick, cityPick, restaurantUserPick]);

  // Update URL params on filter change
  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (restaurantUserPick) searchParams.set('restaurant', restaurantUserPick);
    if (cityPick) searchParams.set('city', cityPick);
    if (dishTypePick) searchParams.set('dishType', dishTypePick);

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }, [restaurantUserPick, cityPick, dishTypePick, navigate, location.pathname]);

  // infinite_scroll
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const msgResults = 'No pictures found, go eat there and upload a picture 😜';
  const content = showGrid ? (
    <PostsFeed posts={results} ref={lastPostRef} />
  ) : (
    <GridFeed images={results} ref={lastPostRef} />
  );
  return (
    <div className='feed'>
      <div className='filter-div'>
        <FilterImagesModel
          setRestaurantUserPick={setRestaurantUserPick}
          setCityPick={setCityPick}
        />
        {loading ? (
          <div className='center-div'>
            <Loading />
          </div>
        ) : (
          <>{content}</>
        )}

        {total === 0 && (
          <div className='center-div msg-results'>{msgResults}</div>
        )}
      </div>
    </div>
  );
};

export default Feed;
