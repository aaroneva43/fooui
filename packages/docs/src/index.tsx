import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { Table, Column, HeaderCell, Cell } from '@fooui/table';
import '../public/index.css';

const App = () => {
  return (
    <Table
      data={[
        { id: 1, name: 'a', email: 'a@email.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 3, name: 'c', email: 'c@email.com', avartar: '...' },
      ]}
    >
      <Column width={100} sortable fixed resizable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={100} sortable resizable>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={100} resizable>
        <HeaderCell>Avartar</HeaderCell>
        <Cell dataKey="avartar" />
      </Column>
    </Table>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
