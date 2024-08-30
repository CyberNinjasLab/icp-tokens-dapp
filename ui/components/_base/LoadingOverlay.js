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
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid white',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>
        {`@keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }`}
      </style>
    </div>
  );
};

export default LoadingOverlay;
