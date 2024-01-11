import { useRouter } from 'next/router';
import ChartComponent from '../../ui/components/ChartComponent';
import Layout from '../../ui/components/_base/Layout';

const generateData = () => {
  const initialData = [];
  const startDate = new Date('2018-12-22');
  let startValue = 32.51;
  const numRecords = 100;

  for (let i = 0; i < numRecords; i++) {
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(startDate.getDate() + i);

    initialData.push({
      time: currentDate.toISOString().split('T')[0],
      value: parseFloat(startValue.toFixed(2)),
    });

    startValue += Math.random() * 2 - 1;
  }

  return initialData;
};


const TokenPage = () => {
  const router = useRouter();
  const { symbol } = router.query; // Access the "symbol" parameter
  const initialData = generateData(); // Generate the data

  return (
    <Layout>
      <div>
        <h1 className='text-lg font-semibold'>Token Page</h1>
        <p>{symbol}</p>
        <ChartComponent data={initialData} />
      </div>
    </Layout>
  );
};

export default TokenPage;
