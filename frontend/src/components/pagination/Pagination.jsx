import pagination from "./pagination.css";

const Pagination = ({ page, limit, total, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className={pagination.container}>
      {totalPages > 0 &&
        [...Array(totalPages)].map((val, index) => (
          <button
            onClick={() => onClick(index)}
            className={
              page === index + 1
                ? `${pagination.page_btn} ${pagination.active}`
                : pagination.page_btn
            }
            key={index}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
