import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function BackLink({ to, text }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Component has mounted
  }, []);

  if (!isMounted) {
    return null; // Don't render anything on the server
  }

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Link href={to || '#'} passHref>
      <Typography component="a" variant="body1" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={!to ? handleBack : null}>
        <ArrowBackIosNewIcon fontSize="small" style={{ marginRight: 4 }} />
        {text}
      </Typography>
    </Link>
  );
}

export default BackLink;
