import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export const SearchView = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchItem(newSearch);
   
        if (newSearch === '') {
      onSearch('');
    } else {
      onSearch(newSearch);
    }
  };

  return (
    <Form className="mx-auto col-4 my-4">
      <Form.Control
        type="text"
        placeholder="Find your movie"
        value={searchItem}
        onChange={handleSearchChange}
      />
    </Form>
  );
};