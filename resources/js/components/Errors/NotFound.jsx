import React from 'react'

const NotFound = () => {
  return (
    <div className="not-found-container">
    <h1 className="not-found-title">404</h1>
    <p className="not-found-message">Oops! The page you are looking for doesn’t exist.</p>
    <img 
        src="https://via.placeholder.com/400" 
        alt="Page not found illustration" 
        className="not-found-image"
    />
    <button onClick={handleGoHome} className="not-found-button">
        Go Back Home
    </button>
</div>
  )
}

export default NotFound