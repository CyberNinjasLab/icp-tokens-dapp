import React, { useEffect, useRef, useState, useContext } from 'react';
import { GeneralContext } from '../../../../contexts/general/General.Context';
import { createChart } from 'lightweight-charts';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import useFetchOHLCVData from '../../../hooks/useFetchOHLCVData'

// Define available periods for the chart
const periods = ['7d', '30d', '90d', 'All'];

// Define available intervals for candlestick charts
const intervals = ['1h', '1d', '1w'];

const ChartComponent = ({ canister_id }) => {
  const chartContainerRef = useRef(null); // Ref for the div container of the chart
  const [selectedPeriod, setSelectedPeriod] = useState('90d'); // State for the selected period
  const [selectedInterval, setSelectedInterval] = useState('1d'); // State for selected interval for candlestick charts
  const [chartType, setChartType] = useState('area'); // State for the chart type (area or candle)

  const { parseTimestampToUnix, calculatePrecisionAndMinMove, formatDateBasedOnInterval, formatPrice } = useContext(GeneralContext)
    
  // Use the custom hook to fetch data
  const { data, loading, error } = useFetchOHLCVData(canister_id, selectedInterval, selectedPeriod);

  const setupAreaChart = (chart, data, min) => {
    const { precision, minMove } = calculatePrecisionAndMinMove(min);

    let priceFormat = {
      type: 'price'
    }

    if(precision && minMove) {
      priceFormat.precision = precision
      priceFormat.minMove = minMove
    }

    const series = chart.addAreaSeries({
      topColor: 'rgba(1, 154, 154, 0.56)', // Lighter shade with opacity for the top
      bottomColor: 'rgba(1, 154, 154, 0.04)', // Very light shade with low opacity for the bottom
      lineColor: 'rgba(1, 154, 154, 1)', // Solid color for the line
      lineWidth: 2,
      crossHairMarkerVisible: false,
      priceFormat: {
        type: 'price',
        precision: precision, // Adjusted based on min value
        minMove: minMove,
      },
    });
    series.priceScale().applyOptions({
      scaleMargins: {
        // positioning the price scale for the area series
        top: 0.1,
        bottom: 0.3,
      },
    });
    series.setData(data);

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
      color: parseFloat(d.close) < parseFloat(d.open) ? 'rgba(255, 82, 82, 0.8)' : 'rgba(0, 150, 136, 0.8)', // Red for down days, green for up days
    }));
  
    volumeSeries.setData(volumeData);
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
    series.setData(data);

    return series;
  };

  const appendTolltipToChar = (chart, series, data) => {
    const container = chartContainerRef.current
    const toolTipWidth = 140;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    // Create and style the tooltip html element
    const toolTip = document.createElement('div');
    toolTip.style = `width: ${toolTipWidth}px; height: auto; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = 'white';
    toolTip.style.color = 'black';
    toolTip.style.borderColor = 'rgba(38, 166, 154, 1)';
    container.appendChild(toolTip);

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
            const seriesData = param.seriesData.get(series);
            const fullData = data.find(obj => obj.time == param.time);

            if(chartType == 'area') {
              toolTip.innerHTML = `
              <div style="font-size: 16px; margin-bottom: 2px; color: black">
              ${formatPrice(fullData.value)}
              </div>
              <div>
                VOL: ${Math.round(fullData.volume).toLocaleString()} ICP
              </div>
              <div style="color: black; margin-top: 6px">
                ${dateStr}
              </div>`;
            } else if(chartType == 'candle') {
              toolTip.innerHTML = `
              <div style="margin-bottom: 2px; color: black">
                <span style="font-weight: 500">OPEN</span>: ${formatPrice(fullData.open)}<br>
                <span style="font-weight: 500">HIGH</span>: ${formatPrice(fullData.high)}<br>
                <span style="font-weight: 500">LOW</span>: ${formatPrice(fullData.low)}<br>
                <span style="font-weight: 500">CLOSE</span>: ${formatPrice(fullData.close)}
              </div>
              <div>
                VOL: ${Math.round(fullData.volume).toLocaleString()} ICP
              </div>
              <div style="color: black; margin-top: 6px">
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
            toolTip.style.left = left + 'px';
            toolTip.style.top = top + 'px';
        }
    });
  }

  useEffect(() => {
    if (!chartContainerRef.current || loading || error) return;

    // Initialize the chart with basic configuration
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: '#ffffff',
        textColor: 'rgba(33, 56, 77, 1)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.7)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.7)',
        },
      },
      crosshair: {
        mode: 1, // Corresponds to CrosshairMode.Normal if using the LightweightCharts namespace
      },
      priceScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
    });

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
      appendTolltipToChar(chart, series, transformedData)
    }

    return () => chart.remove();
  }, [chartType, data, loading, error]); // Reinitialize the chart when these dependencies change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to handle chart type change
  const handleChartTypeChange = (newType) => {
    setChartType(newType);
    // Automatically set interval to '1d' when switching to candle chart
    if (newType === 'candle') {
      setSelectedInterval('1d');
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 max-w-6xl">
      <div className="flex gap-1 justify-between">
        {/* Left side: UI for toggling chart type */}
        <ButtonGroup size="small" aria-label="chart type buttons">
          <Tooltip title="Area Chart">
            <Button 
              variant={chartType === 'area' ? "contained" : "outlined"}
              {...(chartType === 'area' && { color: "primary" })}
              onClick={() => handleChartTypeChange('area')}
            >
              <ShowChartIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Candle Chart">
            <Button 
              variant={chartType === 'candle' ? "contained" : "outlined"}
              {...(chartType === 'candle' && { color: "primary" })}
              onClick={() => handleChartTypeChange('candle')}
            >
              <CandlestickChartIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>

        {/* Right side: UI for selecting intervals (only if chart type is 'candle') */}  
        <ButtonGroup size="small" aria-label="chart interval buttons">
          {intervals.map((interval) => (
            <Tooltip key={interval} title={`${interval} Interval`}>
              <Button
                variant={selectedInterval === interval ? "contained" : "outlined"}
                {...(selectedInterval === interval && { color: "primary" })}
                onClick={() => setSelectedInterval(interval)}
              >
                {interval}
              </Button>
            </Tooltip>
          ))}
        </ButtonGroup>
      </div>
      <div className='relative'>
        <div ref={chartContainerRef} className="w-full h-96" />
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
                variant={selectedPeriod === period ? "contained" : "outlined"}
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
