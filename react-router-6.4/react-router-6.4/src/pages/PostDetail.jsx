import { useLoaderData } from 'react-router-dom';

import { getPost } from '../util/api';

import BlogPost from '../components/BlogPost';

function PostDetailPage() {
  const loaderData = useLoaderData();
  console.log('%c-> developmentConsole: loaderData= ', 'color:#77dcfd', loaderData);

  return <BlogPost title={loaderData.title} text={loaderData.body} />;
}

export default PostDetailPage;

export function loader({ request, params }) {
  console.log('%c-> developmentConsole: request= ', 'color:#77dcfd', request);
  console.log('%c-> developmentConsole: params= ', 'color:#77dcfd', params);

  const postId = params.id;

  return getPost(postId);
}
