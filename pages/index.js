import Layout from '../ui/components/_base/Layout';
import TokensTable from '../ui/components/tokens/table/TokensTable';

const Home = () => {
  return (
    <Layout>
      <div>
        <h1 className='lg:text-xl text-base font-semibold'>Internet Computer Tokens <span className='block xs:inline'>by Market Cap</span></h1>
        <TokensTable />
      </div>
    </Layout>
  );
};

export default Home;
