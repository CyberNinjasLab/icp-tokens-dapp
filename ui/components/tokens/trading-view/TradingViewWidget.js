// TradingViewWidget.jsx
import React, { useEffect, useRef, memo, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import useWindowWidthUnder from '../../../hooks/useWindowWidthUnder';

function TradingViewWidget({ symbol, fullscreen=false }) {
  const container = useRef();
  const chartWrapperRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { theme } = useContext(GeneralContext);

  const isWindowUnder1024 = useWindowWidthUnder(1024);

  useEffect(() => {
    // Clear the container before adding the new script
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": theme,
      "style": "1",
      "hide_side_toolbar": isMobile,
      "locale": "en",
      "range": "4M",
      "allow_symbol_change": true,
      "calendar": true,
      "support_host": "https://www.tradingview.com",
      "is_transparent": false,
    });

    container.current.appendChild(script);

    // No need for cleanup function as innerHTML clearing handles it
  }, [symbol, theme]); // This effect should re-run if the symbol prop changes

  const toggleFullScreen = () => {
    const chartWrapper = chartWrapperRef.current;
    if (!document.fullscreenElement && chartWrapper) {
      if (chartWrapper.requestFullscreen) {
        chartWrapper.requestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const setDynamicHeight = () => {
    // Use visualViewport.height if available, else fall back to innerHeight
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    
    const element = document.getElementById('tv_chart_container');
    
    if (element) {
      const chartOffset = isWindowUnder1024 ? 108 : 235; // Adjust offsets based on screen width
      // Set the height considering fullscreen or the offset
      element.style.height = fullscreen ? `${viewportHeight}px` : `${viewportHeight - chartOffset}px`;
    }
  };
  
  useEffect(() => {
    setDynamicHeight();
  }, [isWindowUnder1024]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <>
      <div ref={chartWrapperRef} className='text-center bg-white dark:bg-dark-bg'>
        <div id="tv_chart_container" className={`w-full lg:border md:rounded-md border-[#D3D3D3] dark:border-[#555]`}>
          <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                <span className="italic">Chart provided by TradingView</span>
              </a>
            </div>
          </div>
        </div>
        {/* <Button 
          onClick={toggleFullScreen} 
          className='opacity-0 lg:opacity-100' 
          color='gray' 
          sx={{backgroundColor: 'transparent'}}
        >
          {isFullScreen ? 'Exit Full Screen' : 'Maximize Chart View'}
        </Button> */}
      </div>
    </>
  );
}

TradingViewWidget.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default memo(TradingViewWidget);
