import "./style.scss";

export const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="progress-bar">
      <div className="track">
        <div className="fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};
