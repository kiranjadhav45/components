import React from "react";

const Paginate = ({ pageSize, totalAdd, pagination }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalAdd / pageSize); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="text-center">
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num} className="page-item">
            <a onClick={() => pagination(num)} className="page-link">
              {num}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
