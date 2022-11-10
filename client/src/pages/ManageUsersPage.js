import React, { useState } from 'react';
import UsersTable from '../components/UsersTable';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ManageUsersPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [params, setParams] = useState({
    page: 1,
    items_per_page: 6,
    order_name: 'id',
    order_direction: 'asc',
    keyword: '',
  });

  const handleSearch = (e) => {
    if ((params.keyword !== '') && e.target.value === '' ) {
      setParams({...params, page: 1, keyword: ''})
    }
      
    if (e.key === 'Enter') {
      setParams({...params, keyword: searchKeyword, page: 1})
    }
    setSearchKeyword(e.target.value)
  };
  
  const handleSearchSubmit = () => {
    setParams({...params, keyword: searchKeyword})
  }
  
  const handlePageChange = ({ selected }) => {
    setParams({ ...params, page: selected + 1 });
  };

  const handleSort = (name, direction) => {
    setIsAscending(!isAscending);
    setParams({ ...params, order_name: name, order_direction: direction });
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full">
        <h1 className="flex justify-between font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          <div>
            <span>Manage Users</span>
            <Link to="/register">
              <button
                type="button"
                className="p-2.5 ml-4 bg-regal-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out dark:bg-background dark:hover:bg-secondary-background"
              >
                Add User
              </button>
            </Link>
          </div>
          <div className="relative flex items-center w-1/3">
            <input
              onKeyDown={handleSearch}
              onSubmit={handleSearchSubmit}
              onChange={handleSearch}
              value={searchKeyword}
              placeholder="Search..."
              className="w-full px-2 font-light h-10 bg-white border rounded-md focus:outline-blue-500"
            ></input>
            <button onClick={handleSearchSubmit} className="absolute text-gray-400 right-0 -translate-x-1/2 ">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </h1>

        <div className="container mx-auto mt-[3vh]">
          <UsersTable
            params={params}
            isAscending={isAscending}
            onSortChange={handleSort}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
export default ManageUsersPage;
