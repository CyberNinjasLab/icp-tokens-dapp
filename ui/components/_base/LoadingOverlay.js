import { useLoading } from "../../../contexts/general/Loading.Provider";

const LoadingOverlay = () => {
  const { loadingState } = useLoading();

  if (!loadingState) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 100000  // Ensure it covers everything
    }}>
      <svg width="50px" height="50px" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default LoadingOverlay;