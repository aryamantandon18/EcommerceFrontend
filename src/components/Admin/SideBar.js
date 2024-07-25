import React, { useEffect } from 'react'
import { Link ,useLocation, useNavigate} from 'react-router-dom'
// import { TreeItem, TreeView } from '@material-ui/lab';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ImportExportIcon from '@mui/icons-material/ImportExport';
// import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import logo from '../../images/logo.png'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PeopleIcon from '@mui/icons-material/People'
import RateReviewIcon from '@mui/icons-material/RateReview'
import './SideBar.css'


const SideBar = () => {
    const location = useLocation();
    useEffect(() => {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
      }
    }, [location]);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/product">
      <p>
          <AddIcon/>
          Create Product
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}

export default SideBar

 {/* <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView> */}