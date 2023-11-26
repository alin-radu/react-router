import { useLoaderData } from 'react-router-dom';

import { getPosts } from '../util/api';

import Posts from '../components/Posts';

function BlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <Posts blogPosts={loaderData} />
    </>
  );
}

export default BlogPostsPage;

export function loader() {
  return getPosts();
}
