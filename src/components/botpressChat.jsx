import React, { useEffect } from 'react';

const botpressChat = () => {
  useEffect(() => {
    
    
    // Adding the Botpress script dynamically
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://files.bpcontent.cloud/2025/02/07/14/20250207140224-0DWX8AF1.js"; // Change this URL to your actual Botpress chat script URL
    script2.async = true;
    document.body.appendChild(script2);
    
    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // This component doesn't need to render anything, as the scripts are injected
};

export default botpressChat;
