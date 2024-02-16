import React from 'react';

const Pagination = ({ studentsPerPage, totalStudents, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination flex justify-center space-between gap-2">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a
                            href="#"
                            onClick={() => paginate(number)}
                            className="page-link bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
