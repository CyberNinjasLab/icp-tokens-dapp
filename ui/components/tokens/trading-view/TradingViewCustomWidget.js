import React, { useContext, useEffect } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { loadScript } from '../../../../utils/scriptLoader';

const TradingViewCustomWidget = ({ canister_id }) => {
  const { theme, currency } = useContext(GeneralContext);

  const saveChartState = (chart) => {
    chart.save((state) => {
      localStorage.setItem('tv_chart_state', JSON.stringify(state));
    });
  };

  const loadChartState = () => {
    const savedState = localStorage.getItem('tv_chart_state');
    return savedState ? JSON.parse(savedState) : null;
  };

  const initializeWidget = () => {
    if (window.TradingView) {
      const savedState = loadChartState();

      const widget = new window.TradingView.widget({
        symbol: 'icptokens.net',             // Default symbol
        interval: '1d',                    // Default interval
        fullscreen: false,                 // Displays the chart in the fullscreen mode
        container: 'tv_chart_container',   // Reference to an attribute of the DOM element
        theme: 'dark',
        datafeed: new Datafeeds.UDFCompatibleDatafeed("https://web2.icptokens.net/api/datafeed/" + canister_id + "/" + currency),
        library_path: '/js/trading-view/charting_library/',
        autosize: true,
        time_frames: [
          { text: "1y", resolution: "1W", description: "1 Year" },
          { text: "6m", resolution: "1D", description: "6 Months" },
          { text: "3m", resolution: "1D", description: "3 Months" },
          { text: "1m", resolution: "720", description: "1 Month" },
          { text: "7d", resolution: "60", description: "7 Days" },
          { text: "1d", resolution: "30", description: "1 Day" },
        ],
      });

      widget.onChartReady(() => {
        if (savedState) {
          widget.load(savedState);
        }

        const saveState = () => saveChartState(widget);

        widget.chart().onIntervalChanged(saveState);
        widget.chart().onSymbolChanged(saveState);
        widget.chart().onChartTypeChanged(saveState);
      });
    }
  };

  const setDynamicHeight = () => {
    const viewportHeight = window.innerHeight;
    const element = document.getElementById('tv_chart_container');
    if (element) {
      element.style.height = `${viewportHeight - 200}px`;
    }
  };

  useEffect(() => {
    const loadScriptsAndInitialize = async () => {
      try {
        await loadScript('/js/trading-view/charting_library/charting_library.js');
        await loadScript('/js/trading-view/datafeeds/udf/dist/bundle.js');
        initializeWidget();
        setDynamicHeight(); // Set initial height
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScriptsAndInitialize();

    window.addEventListener('resize', setDynamicHeight); // Update height on window resize
    return () => {
      window.removeEventListener('resize', setDynamicHeight);
    };
  }, []);

  useEffect(() => {
    initializeWidget();
  }, [currency, canister_id]);

  return (
    <div className='md:ml-0 md:mr-0 -ml-4 -mr-4'>
      <div id="tv_chart_container" style={{ width: '100%' }} className='md:border md:max-h-[469px] md:rounded-md overflow-hidden border-[#D3D3D3] dark:border-[#555]'></div>
    </div>
  );
};

export default TradingViewCustomWidget;
