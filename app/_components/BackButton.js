'use client';
import {ArrowBackRounded} from '@mui/icons-material';

function BackButton() {
  return (
    <button
      className="rounded-full bg-accent-shade-300 p-2"
      onClick={() => {
        history.back();
      }}>
      <ArrowBackRounded
        sx={{
          stroke: '#e0fbd3',
          fill: '#e0fbd3',
        }}
      />
    </button>
  );
}

export default BackButton;
