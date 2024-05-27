// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, Button, CardHeader, Menu, MenuItem, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, updateRole } from '../../../Redux/Admin/User/Action'
import { useEffect, useState } from 'react'


const Customers = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [anchorElArray, setAnchorElArray] = useState([]);
  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateRole = (userId, index, data) => {
    handleUpdateStatusMenuClose(index);
    dispatch(updateRole({userId, data}));
  };

  const {adminsUser} = useSelector(store => store)
  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }

  useEffect(() => {
    // setFilterValue({ 
    dispatch(getAllUser());
    console.log("get all user", adminsUser)
  }, [adminsUser.role]);

  return (
    <Box>
         <Card>
      <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
        />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Avatar</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Cấp quyền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminsUser?.users.map((item,index) => (
              <TableRow hover key={item.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{item.id}</TableCell>
                <TableCell> <Avatar alt={item.lastName} src={item.image} /> </TableCell>
                <TableCell>{item.firstName} {item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                <Chip
                      sx={{
                        color: "white !important",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      label={item.role === "admin" ? "Quản trị" : "Người dùng"}
                      size="small"
                      color={
                        item.role === "admin" ? "info" : "secondary"
                      }
                      className="text-white"
                    />
                
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                <div>
                      <Button
                        id={`basic-button-${item.id}`}
                        aria-controls={`basic-menu-${item.id}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElArray[index])}
                        onClick={(event) =>
                          handleUpdateStatusMenuClick(event, index)
                        }
                      >
                        Cấp quyền
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item.id}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleUpdateRole(item.id, index, {role: "admin"})}
                        >
                          Quản trị
                          
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleUpdateRole(item.id, index, {role: ""})}
                        >
                          Người dùng
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                
                
               
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
   
  )
}

export default Customers;
