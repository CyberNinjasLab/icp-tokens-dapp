import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { loadScript } from '../../../../utils/scriptLoader';
import TradingViewSaveLoadAdapter from './TradingViewSaveLoadAdapter';
import { AuthContext } from '../../../../contexts/auth/Auth.Context';
import useWindowWidthUnder from '../../../hooks/useWindowWidthUnder';

const TradingViewCustomWidget = ({ canister_id, fullscreen = false }) => {
  const { theme, currency } = useContext(GeneralContext);
  const { backendCoreActor, isAuthenticated } = useContext(AuthContext);
  const isWindowUnder1024 = useWindowWidthUnder(1024);

  const initializeWidget = () => {
    if (window.TradingView) {
      const widget = new window.TradingView.widget({
        symbol: 'icptokens.net',             // Default symbol
        interval: '1d',                    // Default interval
        fullscreen: fullscreen,                 // Displays the chart in the fullscreen mode
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
        save_load_adapter: new TradingViewSaveLoadAdapter(canister_id, currency, backendCoreActor, isAuthenticated),
        load_last_chart: true,
        enabled_features: [
            "header_in_fullscreen_mode",
            "side_toolbar_in_fullscreen_mode",
            "hide_left_toolbar_by_default",
        ],
      });

      widget.onChartReady(() => {

      });
    }
  };

  const setDynamicHeight = () => {
    const viewportHeight = window.innerHeight;
    const element = document.getElementById('tv_chart_container');
    if (element) {
      const chartOffset = isWindowUnder1024 ? 110 : 200;
      element.style.height = fullscreen ? `${viewportHeight}px` : `${viewportHeight - chartOffset}px`;
    }
  };

  useEffect(() => {
    setDynamicHeight();
  }, [isWindowUnder1024])

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
  }, []);

  useEffect(() => {
    initializeWidget();
    setDynamicHeight();
  }, [currency, canister_id, isAuthenticated, fullscreen]);

  return (
    <div className='relative'>
      <div 
        id="tv_chart_container" 
        style={{ width: '100%', transition: 'height 0.3s ease' }} 
        className={`lg:border lg:rounded-md overflow-hidden border-[#D3D3D3] dark:border-[#555] ${fullscreen ? 'fixed top-0 left-0 z-50' : `lg:max-h-[calc(100vh-235px)]`}`}
      ></div>
    </div>
  );
};

export default TradingViewCustomWidget;
