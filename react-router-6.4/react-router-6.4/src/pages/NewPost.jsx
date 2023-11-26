import { redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import { savePost } from '../util/api';

import NewPostForm from '../components/NewPostForm';

function NewPostPage() {
  const dataAction = useActionData();
  const navigate = useNavigate();
  // Note: navigation.state:"idle" || "loading" || "submitting"
  const navigation = useNavigation();

  console.log('%c-> developmentConsole: dataAction= ', 'color:#77dcfd', dataAction);
  console.log('%c-> developmentConsole: navigation= ', 'color:#77dcfd', navigation);

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
      {dataAction && dataAction.status && <p>{dataAction.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === 'submitting'}
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request, params }) {
  console.log('%c-> developmentConsole: request= ', 'color:#77dcfd', request);
  console.log('%c-> developmentConsole: params= ', 'color:#77dcfd', params);

  const formData = await request.formData();

  const post = {
    title: formData.get('title'),
    body: formData.get('post-text'),
  };

  try {
    await savePost(post);
  } catch (err) {
    if (err.status === 422) {
      return err;
    }
    throw err;
  }

  return redirect('/blog');
}
