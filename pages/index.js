import Layout from '../ui/components/_base/Layout';
import Link from 'next/link';
import TokensTable from './table/[TokensTable]';

const Home = () => {
  return (
    <Layout>
      <div>
        <TokensTable />
        <br />
        <Link href="/token/ICP">Internet Computer (ICP)</Link>
      </div>
    </Layout>
  );
};

export default Home;
