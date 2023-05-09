import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Home() {
  const [postsPerPage] = useState(5);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');

  const getAllPosts = async () => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      const data = res.data;
      const sortedData = sortOrder === 'asc'
        ? data.sort((a, b) => a.name.localeCompare(b.name))
        : data.sort((a, b) => b.name.localeCompare(a.name));
      const slice = sortedData.slice(offset, offset + postsPerPage);
      setPosts(slice);
      setPageCount(Math.ceil(data.length / postsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage * postsPerPage);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    getAllPosts();
  }, [offset, sortOrder]);


  return (
    <div className="container">
      <div className="row">
        <div className="col table-container">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>first Name {sortOrder === 'asc' ? '▲' : '▼'}</th>
                <th>last name</th>
                <th>edit</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {posts.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td><i class="fa-solid fa-pen-to-square" ></i></td>
                  <td><i class="fa-solid fa-trash"></i></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-3 d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;
