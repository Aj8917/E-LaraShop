import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
const App = () => {
    return <h1>Welcome!</h1>;
};

const Flash =()=>{
    return <div id="banner">Sales For Today !</div>;
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <>
        <App />
        <Flash />
        <Home />
        
    </>
);