import React, { useState, useEffect } from 'react';
import UserList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        setIsLoading(true);
        response = await fetch('http://localhost:5000/api/users');
        const json = await response.json();
        await setUsers(json.users);
      } catch (err) {
        setError(err.message);
      }

      if (!response.ok) {
        throw new Error(
          response.message || 'something went wroong please try agian later'
        );
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      <ErrorModal onClear={errorHandler} error={error} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {users && !isLoading && <UserList items={users} />}
    </>
  );
}

export default Users;
