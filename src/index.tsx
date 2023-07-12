import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

if(!navigator.geolocation) {
  alert("Your browers doesn't has Geolication option");
  throw new Error("Your browers doesn't has Geolication option")
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <MapsApp />
  // </React.StrictMode>
);

