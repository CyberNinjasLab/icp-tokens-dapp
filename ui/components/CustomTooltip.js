import React, { useMemo } from 'react';

const CustomTooltip = props => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    []
  );

  return (
    <div
      className="custom-tooltip"
      style={{ backgroundColor: props.color || '#999' }}
    >
      <p>
        <span>{data.circulatingSupply.percent}%</span>
      </p>
      <p>
        <span>Circulating Supply: </span>{' '}
        {data.circulatingSupply.circulatingSupply}
      </p>
      <p>
        <span>Max Supply: </span> {data.circulatingSupply.maxSupply}
      </p>
    </div>
  );
};
export default CustomTooltip;
