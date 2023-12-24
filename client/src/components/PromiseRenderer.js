import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function PromiseRenderer({ promise }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    promise.then((data) => {
      setResult(data.full_name + " " + data.position);
    });
  }, [promise]);

  return <>{result && <Typography>{result}</Typography>}</>;
}

export default PromiseRenderer