import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

export const Panel = (props) => {
    const navigate = useNavigate();

// Check for loading flag 
// if (loading) return <p>Loading...</p>

return (
  <div>
    <button onClick={() => navigate(-1)}>Go back</button>
    {/* content here */}
    Panel
  </div>
);
}