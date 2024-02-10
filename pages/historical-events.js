import React from 'react';
import Layout from '../ui/components/_base/Layout';
import HistoricalEventsComp from '../ui/components/historicalEventsComp';


const HistoricalEvents = () => {



	return (
		<Layout>
      <span>
        Historical-Events
      </span>
      <HistoricalEventsComp></HistoricalEventsComp>
		</Layout>
		

	);
};

export default HistoricalEvents;