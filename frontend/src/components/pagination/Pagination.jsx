import "./pagination.css";

const Pagination = ({ page, limit, total, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className='container'>
      {totalPages > 0 &&
        [...Array(totalPages)].map((val, index) => (
          <div className='transform' key={index}>
            {" "}
            <button
              onClick={() => onClick(index)}
              className={
                page === index + 1
                  ? `page_btn active
                `
                  : "page_btn"
              }
            >
              {index + 1}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Pagination;
