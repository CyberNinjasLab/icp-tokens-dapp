import React, { useEffect, useRef, useState, useContext } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import useFetchOHLCVData from '../../../hooks/token/useFetchOHLCVData'

const periods = ['7d', '30d', '90d', 'All'];
const intervals = ['1h', '1d', '1w'];

const ChartComponent = ({ canister_id }) => {
  const chartWrapperRef = useRef(null);
  const chartContainerRef = useRef(null); // Ref for the div container of the chart
  const chartInstanceRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState('90d'); // State for the selected period
  const [selectedInterval, setSelectedInterval] = useState('1d'); // State for selected interval for candlestick charts
  const [chartType, setChartType] = useState('area'); // State for the chart type (area or candle)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chartInitTrigger, setChartInitTrigger] = useState(0);
  const [docWidth, setDocWidth] = useState(document.documentElement.clientWidth);

  const { parseTimestampToUnix, calculatePrecisionAndMinMove, formatDateBasedOnInterval, formatPrice, prepareChartData, showPriceCurrency, currency, theme } = useContext(GeneralContext)
    
  // Use the custom hook to fetch data
  const { data, loading, error } = useFetchOHLCVData(canister_id, selectedInterval, selectedPeriod, currency);

  const toggleFullScreen = () => {
    const chartWrapper = chartWrapperRef.current;
    if (!document.fullscreenElement && chartWrapper) {
      if (chartWrapper.requestFullscreen) {
        chartWrapper.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const calculateChartHeight = (isFullScreen) => {
    return isFullScreen ? (window.innerHeight - 130) : 200;
  };
  
  const updateChartSize = (isFullScreenNow) => {
    const chartContainer = chartContainerRef.current;
    const chart = chartInstanceRef.current;
  
    if (chart && chartContainer) {
      const newHeight = calculateChartHeight(isFullScreenNow);
      const newWidth = chartContainer.clientWidth; // Use the container's current width
  
      chart.applyOptions({
        width: newWidth,
        height: newHeight
      });

      // Hack to rewrite chart on fulscreen exit... :D
      if (!isFullScreenNow) {
        setChartInitTrigger(prev => prev + 1)
      }
    }
  };  

  const setupAreaChart = (chart, data, min) => {
    const { precision, minMove } = calculatePrecisionAndMinMove(min);
  
    let priceFormat = {
      type: 'price'
    }
  
    if(precision && minMove) {
      priceFormat.precision = precision
      priceFormat.minMove = minMove
    }
  
    // Determine the color based on the first and last data values
    const baseValue = data.length > 0 ? data[0].value : null;
  
    const series = chart.addBaselineSeries({
      baseValue: {
        type: 'price',
        price: baseValue,
      },
      topLineColor: 'rgba(39, 166, 154, 1)',
      topFillColor1: 'rgba(39, 166, 154, 0.28)',
      topFillColor2: 'rgba(39, 166, 154, 0.00)',
      bottomLineColor: 'rgba(255, 58, 51, 1)',
      bottomFillColor1: 'rgba(255, 58, 51, 0.00)',
      bottomFillColor2: 'rgba(255, 58, 51, 0.28)',
      lineWidth: 2,
      crossHairMarkerVisible: false,
      priceFormat: priceFormat,
    });
    series.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.2,
      },
    });
    series.setData(prepareChartData(data));
  
    return series;
  };

  const setupChartWithVolume = (chart, data) => {
    // Add Volume Series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
      // set the positioning of the volume series
      scaleMargins: {
        top: 0.85, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.85, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });
    // Map your data to the format expected by the volume series
    const volumeData = data.map(d => ({
      time: parseTimestampToUnix(d.timestamp),
      value: parseFloat(d.volume),
      color: theme == 'dark' ? 'rgba(59, 130, 246, 0.5)' : '#D3D3D3'
    }));
  
    volumeSeries.setData(prepareChartData(volumeData));
  };  
  
  const setupCandleChart = (chart, data, min) => {
    const { precision, minMove } = calculatePrecisionAndMinMove(min);

    const series = chart.addCandlestickSeries({
      upColor: 'rgb(38,166,154)',
      downColor: 'rgb(239,83,80)',
      borderDownColor: 'rgb(239,83,80)',
      borderUpColor: 'rgb(38,166,154)',
      wickDownColor: 'rgb(239,83,80)',
      wickUpColor: 'rgb(38,166,154)',
      priceFormat: {
        type: 'price',
        precision: precision, // Adjusted based on min value
        minMove: minMove,
      },
      crossHairMarkerVisible: false,
    });
    series.setData(prepareChartData(data));

    return series;
  };

  const appendTolltipToChart = (chart, series, data) => {
    const container = chartContainerRef.current;
    const toolTipWidth = 140;
    const toolTipHeight = 80;
    const toolTipMargin = 15;
  
    let toolTip = container.querySelector('.chart-tooltip'); // Try to find an existing tooltip
  
    // If a tooltip doesn't exist, create and append it
    if (!toolTip) {
      toolTip = document.createElement('div');
      toolTip.className = 'chart-tooltip'; // Add a class for easy identification
      // Adjust tooltip styling based on theme
      toolTip.style = `width: 140px; height: auto; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; pointer-events: none; border: 1px solid; border-radius: 2px; background: ${theme == 'dark' ? '#1e1e2c' : 'white'}; border-color: ${theme === 'dark' ? '#555' : '#D3D3D3'}; color: ${theme === 'dark' ? 'white' : 'black'}; font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      container.appendChild(toolTip);
    }
  
    // Subscribe to crosshair move events to update the tooltip
    chart.subscribeCrosshairMove(param => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = 'none';
      } else {
        const dateStr = formatDateBasedOnInterval(param.time, selectedInterval);
        toolTip.style.display = 'block';
        const fullData = data.find(obj => obj.time == param.time);
  
        if(chartType == 'area') {
          toolTip.innerHTML = `
          <div style="font-size: 16px; margin-bottom: 2px;">
          ${formatPrice(fullData.value)}
          </div>
          <div>
            VOL: ${showPriceCurrency(Math.round(fullData.volume).toLocaleString())}
          </div>
          <div style="margin-top: 6px">
            ${dateStr}
          </div>`;
        } else if(chartType == 'candle') {
          toolTip.innerHTML = `
          <div style="margin-bottom: 2px;">
            <span style="font-weight: 500">OPEN</span>: ${formatPrice(fullData.open)}<br>
            <span style="font-weight: 500">HIGH</span>: ${formatPrice(fullData.high)}<br>
            <span style="font-weight: 500">LOW</span>: ${formatPrice(fullData.low)}<br>
            <span style="font-weight: 500">CLOSE</span>: ${formatPrice(fullData.close)}
          </div>
          <div>
            VOL: ${showPriceCurrency(Math.round(fullData.volume).toLocaleString())}
          </div>
          <div style="margin-top: 6px">
            ${dateStr}
          </div>`;
        }
  
        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > container.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }
        
        let top = y + toolTipMargin;
        if (top > container.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = `${left}px`;
        toolTip.style.top = `${top}px`;
      }
    });
  }
  

  useEffect(() => {
    if (!chartContainerRef.current || loading || error) return;

    // Initialize the chart with basic configuration
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: calculateChartHeight(isFullScreen),
      layout: {
        textColor: theme == 'dark' ? 'white' : 'black', 
        background: { 
          type: 'solid',
          color: theme == 'dark' ? '#0f0f26' : 'white' }
      },
      grid: {
        vertLines: {
          color: 'transparent',
        },
        horzLines: {
          color: theme == 'dark' ? 'rgba(197, 203, 206, 0.2)' : 'rgba(197, 203, 206, 0.4)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
    });

    chartInstanceRef.current = chart;

    let transformedData;
    let series;
    if (chartType === 'area') {
      transformedData = data.data.map(d => ({
        time: parseTimestampToUnix(d.timestamp),
        value: parseFloat(d.close), // Ensure value is a number
        volume: parseFloat(d.volume)
      }));
      series = setupAreaChart(chart, transformedData, data.min);
      setupChartWithVolume(chart, data.data)
    } else if (chartType === 'candle') {
      transformedData = data.data.map(d => ({
        time: parseTimestampToUnix(d.timestamp),
        open: parseFloat(d.open),
        high: parseFloat(d.high),
        low: parseFloat(d.low),
        close: parseFloat(d.close), // Ensure all numeric fields are converted
        volume: parseFloat(d.volume),
        value: parseFloat(d.close)
      }));
      series = setupCandleChart(chart, transformedData, data.min);
    }

    // Assuming `data.start_date` and `data.end_date` are in a format recognized by your `parseTimestampToUnix` function
    // Adjust the chart's visible range
    if (data.start_date && data.end_date) {
      const startTime = parseTimestampToUnix(data.start_date);
      const endTime = parseTimestampToUnix(data.end_date);
      chart.timeScale().setVisibleRange({ from: startTime, to: endTime });
    }

    if(series) {
      appendTolltipToChart(chart, series, transformedData)
    }

    return () => {
      chart.unsubscribeCrosshairMove();
      chart.remove();
      chartInstanceRef.current = null;
    }
  }, [chartType, data, loading, error, chartInitTrigger, currency, theme, docWidth]); // Reinitialize the chart when these dependencies change

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Check if the document is currently in full screen mode
      const isNowFullScreen = document.fullscreenElement === chartWrapperRef.current;
      setIsFullScreen(isNowFullScreen);
      updateChartSize(isNowFullScreen);
    };
  
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);  

  useEffect(() => {
    const handleResize = () => {
      setDocWidth(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) return <div className='h-[480px]'>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to handle chart type change
  const handleChartTypeChange = (newType) => {
    setChartType(newType);
  };

  return (
    <div ref={chartWrapperRef} className="flex flex-col justify-center gap-4 max-w-6xl">
      <div className="flex gap-1 justify-between">
        {/* Left side: UI for toggling chart type */}
        <ButtonGroup size="small" aria-label="chart type buttons" sx={{ backgroundColor: theme == 'dark' ? 'transparent' : 'white' }}>
          <Tooltip title="Area Chart">
            <Button 
              variant={chartType === 'area' ? "containedGray" : "outlinedGray"}
              {...(chartType === 'area' && { color: "primary" })}
              onClick={() => handleChartTypeChange('area')}
              sx={{padding: 0}}
            >
              <ShowChartIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Candle Chart">
            <Button 
              variant={chartType === 'candle' ? "containedGray" : "outlinedGray"}
              {...(chartType === 'candle' && { color: "primary" })}
              onClick={() => handleChartTypeChange('candle')}
              sx={{padding: 0}}
            >
              <CandlestickChartIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>

        <Button onClick={toggleFullScreen} className='opacity-0 lg:opacity-100' color='gray' sx={{backgroundColor: theme == 'dark' ? 'transparent' : 'white'}}>
          {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
        </Button>


        {/* Right side: UI for selecting intervals (only if chart type is 'candle') */}  
        <ButtonGroup size="small" aria-label="chart interval buttons" sx={{ backgroundColor: theme == 'dark' ? 'transparent' : 'white' }}>
          {intervals.map((interval) => (
            <Tooltip key={interval} title={`${interval} Interval`}>
              <Button
                variant={selectedInterval === interval ? "containedGray" : "outlinedGray"}
                {...(selectedInterval === interval && { color: "primary" })}
                onClick={() => setSelectedInterval(interval)}
                sx={{padding: '4px 0'}}
              >
                {interval}
              </Button>
            </Tooltip>
          ))}
        </ButtonGroup>
      </div>
      <div className='relative'>
        <div ref={chartContainerRef} className="w-full" />
      </div>
      {/* Period Selection UI */}
      <ButtonGroup 
        variant="outlined"
        aria-label="outlined primary button group"
        fullWidth={true}
        className="m-auto mt-2 xl:mt-4 max-w-[404px]"
      >
          {periods.map((period) => (
            <Tooltip key={period} title={`${period} Period`}>
              <Button
                variant={selectedPeriod === period ? "containedGray" : "outlinedGray"}
                {...(selectedPeriod === period && { color: "primary" })}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            </Tooltip>
          ))}
        </ButtonGroup>
    </div>
  );
};

export default ChartComponent;
