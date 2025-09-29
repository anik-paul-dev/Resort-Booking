import React from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const items = []
  
  // Always show first page
  items.push(
    <BootstrapPagination.Item 
      key={1} 
      active={1 === currentPage} 
      onClick={() => onPageChange(1)}
    >
      1
    </BootstrapPagination.Item>
  );
  
  // Show ellipsis if there are pages between first and current
  if (currentPage > 3) {
    items.push(<BootstrapPagination.Ellipsis key="start-ellipsis" />);
  }
  
  // Show pages around current page
  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);
  
  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <BootstrapPagination.Item 
        key={page} 
        active={page === currentPage} 
        onClick={() => onPageChange(page)}
      >
        {page}
      </BootstrapPagination.Item>
    );
  }
  
  // Show ellipsis if there are pages between current and last
  if (currentPage < totalPages - 2) {
    items.push(<BootstrapPagination.Ellipsis key="end-ellipsis" />);
  }
  
  // Always show last page if there is more than one page
  if (totalPages > 1) {
    items.push(
      <BootstrapPagination.Item 
        key={totalPages} 
        active={totalPages === currentPage} 
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </BootstrapPagination.Item>
    );
  }

  return (
    <BootstrapPagination className="justify-content-center">
      <BootstrapPagination.First 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
      />
      <BootstrapPagination.Prev 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      />
      {items}
      <BootstrapPagination.Next 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      />
      <BootstrapPagination.Last 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  )
}

export default Pagination