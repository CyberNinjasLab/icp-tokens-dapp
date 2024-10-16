import React, { useState, useContext, lazy, Suspense } from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../../contexts/auth/Auth.Context';
import { useLoading } from '../../../contexts/general/Loading.Provider';

// Lazy load the ConfirmationDialog
const ConfirmationDialog = lazy(() => import('../_base/ConfirmationDialog')); // Adjust the import path as necessary

const TransactionActionsCellOld = ({ transactionId, setLoadingState, fetchPortfolios }) => {
  const { backendCoreActor } = useContext(AuthContext);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    setLoadingState(true);
    await backendCoreActor.removePortfolioTransaction(0, transactionId);
    setDialogOpen(false); // Close dialog after action
    fetchPortfolios();
  };

  return (
    <>
      <Typography
        component="span"
        className="flex justify-end h-[60px] items-center"
      >
        <Tooltip title="Delete">
          <IconButton onClick={() => setDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Typography>

      {isDialogOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmationDialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAccept={handleDelete}
            title="Confirm Delete"
            subtitle="Are you sure you want to delete this transaction?"
            acceptButton="Delete"
            rejectButton="Cancel"
          />
        </Suspense>
      )}
    </>
  );
};

// Export the component
export default TransactionActionsCellOld;
