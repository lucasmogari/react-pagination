import { useRouter } from 'next/router';
import IndexPage from '../index';

const PagePage = () => {
  const router = useRouter();
  const { page } = router.query;
  return page ? <IndexPage page={page} /> : null;
};

export default PagePage;
