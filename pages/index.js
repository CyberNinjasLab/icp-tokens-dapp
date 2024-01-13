import Layout from '../ui/components/_base/Layout';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <div>
        Table<br />
        <Link href="/token/ICP">Internet Computer (ICP)</Link>
      </div>
    </Layout>
  );
};

export default Home;