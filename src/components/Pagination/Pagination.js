import React from 'react'
import './index.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
    return (
      <div className="pagination">
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          1
        </button>
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &laquo;
        </button>
        <div className="pagination-current">{currentPage}</div>
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &raquo;
        </button>
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      </div>
    );
  };

export default Pagination