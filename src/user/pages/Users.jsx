import React, { useState, useEffect } from 'react';
import UserList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

function Users() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await sendRequest('http://localhost:5000/api/users', 'GET');
        await setUsers(response.users);
      } catch (err) {}
    };

    fetchData();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
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
