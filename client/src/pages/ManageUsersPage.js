import React, { useState, useContext, useEffect } from 'react';
import UsersTable from '../components/UsersTable';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../components/BackButton';
import useDebounce from '../hooks/useDebounce';
import { UserContext } from '../utils/UserContext';

const ManageUsersPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const { theme } = useContext(UserContext).user;
  const [params, setParams] = useState({
    page: 1,
    items_per_page: 6,
    order_name: 'id',
    order_direction: 'asc',
    keyword: '',
  });

  const debouncedKeyword = useDebounce(searchKeyword, 500)

  useEffect(() => {
    if(debouncedKeyword)  {
      setParams({...params, keyword: debouncedKeyword, page: 1} )
    }
  }, [debouncedKeyword]);

  const handleSearch = (e) => {
    if (params?.keyword !== "" && e.target.value === "") {
      setParams({ ...params, page: 1, keyword: "" });
    }
    setSearchKeyword(e.target.value)
  };

  const handleSearchSubmit = () => {
    setParams({ ...params, keyword: searchKeyword })
  }

  const handlePageChange = ({ selected }) => {
    setParams({ ...params, page: selected + 1 });
  };

  const handleSort = (name, direction) => {
    setIsAscending(!isAscending);
    setParams({ ...params, order_name: name, order_direction: direction });
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-full">
        <h1 className="flex justify-between font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          <div>
            <BackButton link={'/adminsettings'} />
            <span>Manage Users</span>
            <Link to="/register">
              <button
                type="button"
                className={`p-2.5 ml-4 ${theme} text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-opacity-80 transition duration-150 ease-in-out dark:bg-background dark:hover:bg-secondary-background`}
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
