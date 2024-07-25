import React from 'react';


const Loader = () => {
    return (
        <div className="loader-container">
            <l-mirage
                size="60"
                speed="2.5"
                color="red"
            ></l-mirage>
        </div>
    );
};

export default Loader;
