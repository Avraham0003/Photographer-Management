import {
  TableContainer, Table, Thead, Tr, Th, Td, Tbody, Box, Link
} from '@chakra-ui/react'
import React, { useState } from 'react'

function AlbumsTable({ data }) {
  return (
    <Box padding={4}>
      <TableContainer>
        <Table variant='striped' colorScheme='blue'>

          <Thead>
            <Tr>
              <Th>שם האירוע</Th>
              <Th>תאריך האירוע</Th>
              <Th>מיקום האירוע</Th>
              <Th>צלמים</Th>
            </Tr>
          </Thead>
          <Tbody>
              {data && data.map((item) => (
                <Tr key={item._id}>
                  <Td><Link style={{ textDecoration: 'none', color: 'blue' }} href={`/event/${item._id}`}>{item.event_name}</Link></Td>
                  <Td>{new Date(item.event_date).toLocaleDateString()}</Td>
                  <Td>{item.event_hall}</Td>
                  <Td>{item.event_photographers}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AlbumsTable