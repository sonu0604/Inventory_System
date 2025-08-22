// src/dashboards/admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import { Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaBars,
  FaUsers,
  FaBoxOpen,
  FaTags,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaPlusCircle,
  FaListUl,
  FaUserPlus,
  FaTrash, FaSearch,
  FaDownload,
  FaEdit,
  FaTimes,
  FaFilter,
  FaMicrophone,
  FaShoppingCart, FaCashRegister,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";


// ✅ Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);



function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState("overview");
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false);
  const [showCategoriesSubmenu, setShowCategoriesSubmenu] = useState(false);
  const [showSuppliersSubmenu, setShowSuppliersSubmenu] = useState(false);
  const [showCustomersSubmenu, setShowCustomersSubmenu] = useState(false);
  const [showPurchasesSubmenu, setShowPurchasesSubmenu] = useState(false);
  const [showSalesSubmenu, setShowSalesSubmenu] = useState(false);
  const [showReportsSubmenu, setShowReportsSubmenu] = useState(false);


  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          {isOpen && <h4 className="text-warning m-0">Admin</h4>}
          <FaBars className="toggle-btn" onClick={toggleSidebar} />
        </div>

        <ul className="sidebar-menu list-unstyled">
          <li onClick={() => setActivePage("overview")}>
            <FaTachometerAlt /> <span>{isOpen && " Dashboard"}</span>
          </li>

          <li onClick={() => setActivePage("users")}>
            <FaUsers /> <span>{isOpen && " Manage Users"}</span>
          </li>

          {/* Manage Products */}
          <li
            onClick={() => setShowProductsSubmenu(!showProductsSubmenu)}
            className="menu-with-submenu"
          >
            <FaBoxOpen /> <span>{isOpen && " Manage Products"}</span>
          </li>
          {isOpen && showProductsSubmenu && (
            <ul className="submenu list-unstyled">
              <li onClick={(e) => {
                e.stopPropagation(); // prevent parent click
                setActivePage("addProduct");
              }}>
                <FaPlusCircle /> <span>Add Product</span>
              </li>
              <li onClick={(e) => {
                e.stopPropagation();
                setActivePage("viewProducts");
              }}>
                <FaListUl /> <span>View Products</span>
              </li>
            </ul>
          )}

          {/* Manage Categories */}
          <li
            onClick={() => setShowCategoriesSubmenu(!showCategoriesSubmenu)}
            className="menu-with-submenu"
          >
            <FaTags /> <span>{isOpen && " Manage Categories"}</span>
          </li>
          {isOpen && showCategoriesSubmenu && (
            <ul className="submenu list-unstyled">
              <li onClick={(e) => {
                e.stopPropagation(); // prevent parent click
                setActivePage("addCategory");
              }}>
                <FaPlusCircle /> <span>Add Category</span>
              </li>
              <li onClick={(e) => {
                e.stopPropagation();
                setActivePage("viewCategories");
              }}>
                <FaListUl /> <span>View Categories</span>
              </li>
            </ul>
          )}
          {/* Manage Suppliers */}
          <li
            onClick={() => setShowSuppliersSubmenu(!showSuppliersSubmenu)}
            className="menu-with-submenu"
          >
            <FaUsers /> <span>{isOpen && " Manage Suppliers"}</span>
          </li>
          {isOpen && showSuppliersSubmenu && (
            <ul className="submenu list-unstyled">
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("addSupplier");
                }}
              >
                <FaPlusCircle /> <span>Add Supplier</span>
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("viewSuppliers");
                }}
              >
                <FaListUl /> <span>View Suppliers</span>
              </li>
            </ul>
          )}
          {/* Manage Customers */}
          <li
            onClick={() => setShowCustomersSubmenu(!showCustomersSubmenu)}
            className="menu-with-submenu"
          >
            <FaUsers /> <span>{isOpen && " Manage Customers"}</span>
          </li>
          {isOpen && showCustomersSubmenu && (
            <ul className="submenu list-unstyled">
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("addCustomer");
                }}
              >
                <FaPlusCircle /> <span>Add Customer</span>
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("viewCustomers");
                }}
              >
                <FaListUl /> <span>View Customers</span>
              </li>
            </ul>
          )}
          {/* Manage Purchases Menu */}
          <li
            onClick={() => setShowPurchasesSubmenu(!showPurchasesSubmenu)}
            className="menu-with-submenu"
          >
            <FaBoxOpen /> <span>{isOpen && " Manage Purchases"}</span>
          </li>
          {isOpen && showPurchasesSubmenu && (
            <ul className="submenu list-unstyled">
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("makePurchase");
                }}
              >
                <FaPlusCircle /> <span>Make Purchase</span>
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("viewPurchases");
                }}
              >
                <FaListUl /> <span>View Purchases</span>
              </li>
            </ul>
          )}
          {/* Manage Sales Menu */}
          <li
            onClick={() => setShowSalesSubmenu(!showSalesSubmenu)}
            className="menu-with-submenu"
          >
            <FaShoppingCart /> <span>{isOpen && " Manage Sales"}</span>
          </li>
          {isOpen && showSalesSubmenu && (
            <ul className="submenu list-unstyled">
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("makeSale");
                }}
              >
                <FaCashRegister /> <span>Make Sale</span>
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("viewSales");
                }}
              >
                <FaListUl /> <span>View Sales</span>
              </li>
            </ul>
          )}
          {/* Reports Menu */}
          <li
            onClick={() => setShowReportsSubmenu(!showReportsSubmenu)}
            className="menu-with-submenu"
          >
            <FaChartBar /> <span>{isOpen && " Reports"}</span>
          </li>
          {isOpen && showReportsSubmenu && (
            <ul className="submenu list-unstyled">
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("salesReport");
                }}
              >
                <FaListUl /> <span>Sales Report</span>
              </li>
              {/* ✅ Purchases Report */}
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage("purchasesReport");
                }}
              >
                <FaShoppingCart /> <span>Purchases Report</span>
              </li>
              {/* Later we can add more reports like Purchases, Stock, etc. */}
            </ul>
          )}

          <li onClick={() => setActivePage("settings")}>
            <FaCog /> <span>{isOpen && " Settings"}</span>
          </li>

          <li onClick={handleLogout} className="logout">
            <FaSignOutAlt /> <span>{isOpen && " Logout"}</span>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="content flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center">
          <h4 className="text-warning fw-bold">InventoryMS</h4>
          <div className="d-flex align-items-center text-white">
            <span className="me-3">🔔</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Admin"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <span>Admin</span>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          {activePage === "overview" && <DashboardOverview />}
          {activePage === "addCategory" && <AddCategoryForm />}
          {activePage === "viewCategories" && <ViewCategory />}
          {activePage === "addProduct" && <AddProductForm />}
          {activePage === "viewProducts" && <ViewProducts />}
          {activePage === "addSupplier" && <AddSupplierForm />}
          {activePage === "viewSuppliers" && <ViewSuppliers />}
          {activePage === "addCustomer" && <AddCustomerForm />}
          {activePage === "viewCustomers" && <ViewCustomers />}
          {activePage === "makePurchase" && <MakePurchaseForm />}
          {activePage === "viewPurchases" && <ViewPurchases />}
          {activePage === "makeSale" && <MakeSale />}
          {activePage === "viewSales" && <ViewSales />}
          {activePage === "salesReport" && <SalesReport />}
          {activePage === "purchasesReport" && <PurchasesReport />}
        </div>
      </div>
    </div>
  );
}

// Dashboard Overview
function DashboardOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/dashboard/overview", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  if (!data) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* KPI Cards */}
      <div className="cards-container">
        <div className="card kpi-card">
          <h4>Total Products</h4>
          <p>{data.totalProducts}</p>
        </div>
        <div className="card kpi-card">
          <h4>Low Stock</h4>
          <p>{data.lowStock}</p>
        </div>
        <div className="card kpi-card">
          <h4>Total Revenue</h4>
          <p>₹ {Number(data.totalRevenue).toLocaleString()}</p>
        </div>
        <div className="card kpi-card">
          <h4>Total Purchases</h4>
          <p>₹ {Number(data.totalPurchases).toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="tables-section">
        <div className="table-card">
          <h3>Recent Sales</h3>
          <table>
            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Product</th>
                <th>Consumer</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentSales.map((sale) => (
                <tr key={sale.sale_id}>
                  <td>{sale.sale_id}</td>
                  <td>{sale.product_name}</td>
                  <td>{sale.consumer_name}</td>
                  <td>{sale.quantity}</td>
                  <td>₹ {sale.unit_price}</td>
                  <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Purchases */}
        <div className="table-card">
          <h3>Recent Purchases</h3>
          <table>
            <thead>
              <tr>
                <th>Purchase ID</th>
                <th>Product</th>
                <th>Supplier</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentPurchases.map((pur) => (
                <tr key={pur.purchase_id}>
                  <td>{pur.purchase_id}</td>
                  <td>{pur.product_name}</td>
                  <td>{pur.supplier_name}</td>
                  <td>{pur.quantity}</td>
                  <td>₹ {pur.unit_price}</td>
                  <td>{new Date(pur.purchase_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// Add Category
// Add Category
function AddCategoryForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/categories/add",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setName("");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-5 bg-dark text-light">
      <h3 className="mb-4 text-warning fw-bold text-center">
        ➕ Add New Category
      </h3>

      {message && (
        <div
          className={`alert ${message.includes("success")
            ? "alert-success"
            : "alert-danger"
            } text-center`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">
            Category Name
          </label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-warning btn-lg fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}

// View Categories
function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      setMessage("❌ Failed to fetch categories");
    }
  };

  // Search category
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return fetchCategories();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/categories/search/${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([res.data]); // Single result
    } catch (err) {
      setMessage("⚠️ No category found");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/categories/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Category deleted successfully");
      fetchCategories();
    } catch (err) {
      setMessage("❌ Failed to delete category");
    }
  };

  // Update category (simple prompt for now)
  const handleEdit = async (id, oldName) => {
    const newName = prompt("Enter new category name:", oldName);
    if (!newName || newName.trim() === "") return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/categories/update/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Category updated successfully");
      fetchCategories();
    } catch (err) {
      setMessage("❌ Failed to update category");
    }
  };

  // Load on mount
  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 bg-dark text-light">
      <h3 className="mb-4 text-warning fw-bold text-center">📂 View Categories</h3>

      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      {/* Search Bar */}
      <form className="d-flex mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="🔍 Search category by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-warning fw-semibold">Search</button>
      </form>

      {/* Categories Table */}
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle text-center">
          <thead className="table-warning text-dark">
            <tr>
              <th>Sr. No</th>
              <th>Category Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.category_id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info text-white"
                      onClick={() => handleEdit(cat.category_id, cat.name)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat.category_id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">⚠️ No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// Add Product (placeholder)
function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    unit_price: "",
    quantity_in_stock: "",
    minQty: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // 👈 image preview
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // 👈 generate preview URL
    } else {
      setPreview(null);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("product_image", image);

      const res = await axios.post(
        "http://localhost:3000/api/products",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);
      setFormData({
        name: "",
        category_id: "",
        unit_price: "",
        quantity_in_stock: "",
        minQty: "",
      });
      setImage(null);
      setPreview(null); // reset preview
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-5 bg-dark text-light">
      <h3 className="mb-4 text-warning fw-bold text-center">📦 Add New Product</h3>

      {message && (
        <div
          className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"
            } text-center`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label text-light">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-3">
          <label className="form-label text-light">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="form-select form-select-lg rounded-3"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Price */}
        <div className="mb-3">
          <label className="form-label text-light">Unit Price</label>
          <input
            type="number"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter unit price"
            required
          />
        </div>

        {/* Quantity in Stock */}
        <div className="mb-3">
          <label className="form-label text-light">Stock Quantity</label>
          <input
            type="number"
            name="quantity_in_stock"
            value={formData.quantity_in_stock}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Min Qty */}
        <div className="mb-3">
          <label className="form-label text-light">Minimum Quantity</label>
          <input
            type="number"
            name="minQty"
            value={formData.minQty}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter minimum quantity"
            required
          />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label className="form-label text-light">Product Image</label>
          <input
            type="file"
            className="form-control form-control-lg"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-4 text-center">
            <p className="text-light">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="img-thumbnail rounded-3 shadow"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
        )}

        {/* Submit */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-warning btn-lg fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
// View Products

function ViewProducts() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    unit_price: "",
    quantity_in_stock: "",
    minQty: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      setMessage("❌ Failed to fetch products");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch categories");
    }
  };

  // 🔍 Dynamic search on typing
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!search.trim()) return fetchProducts();
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/api/products/search/${search}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(res.data);
      } catch (err) {
        setProducts([]); // clear results
      }
    }, 400); // debounce 400ms
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Product deleted successfully");
      fetchProducts();
    } catch (err) {
      setMessage("❌ Failed to delete product");
    }
  };

  // Edit mode
  const handleEdit = (product) => {
    setEditingProduct(product.product_id);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      unit_price: product.unit_price,
      quantity_in_stock: product.quantity_in_stock,
      minQty: product.minQty,
    });
    setPreview(product.product_image ? `http://localhost:3000/uploads/${product.product_image}` : null);

  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category_id: "",
      unit_price: "",
      quantity_in_stock: "",
      minQty: "",
    });
    setImage(null);
    setPreview(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("product_image", image);

      await axios.put(
        `http://localhost:3000/api/products/${editingProduct}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Product updated successfully");
      cancelEdit();
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update product");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 bg-dark text-light">
      <h3 className="mb-4 text-warning fw-bold text-center">📦 View Products</h3>
      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Search bar */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search product by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Products Table */}
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle text-center">
          <thead className="table-warning text-dark">
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>Stock</th>
              <th>Min Qty</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((prod, index) => (
                <tr key={prod.product_id}>
                  <td>{index + 1}</td>
                  <td>{prod.name}</td>
                  <td>{prod.category_id}</td>
                  <td>₹{prod.unit_price}</td>
                  <td>{prod.quantity_in_stock}</td>
                  <td>{prod.minQty}</td>
                  <td>
                    {prod.product_image ? (
                      <img
                        src={`http://localhost:3000/uploads/${prod.product_image}`}
                        alt="product"
                        className="rounded"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info text-white"
                      onClick={() => handleEdit(prod)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(prod.product_id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">⚠️ No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit form */}
      {editingProduct && (
        <div className="card bg-secondary text-light mt-4 p-4 rounded-3">
          <h4 className="text-warning fw-bold mb-3">✏️ Edit Product</h4>
          <form onSubmit={handleUpdate}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Unit Price</label>
                <input
                  type="number"
                  name="unit_price"
                  value={formData.unit_price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  name="quantity_in_stock"
                  value={formData.quantity_in_stock}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Min Qty</label>
                <input
                  type="number"
                  name="minQty"
                  value={formData.minQty}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {preview && (
                <div className="col-md-6 text-center">
                  <p>Preview:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-thumbnail rounded"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-warning fw-bold">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
// Add Supplier
// Add Supplier
function AddSupplierForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact_info: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/supplier/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setFormData({ name: "", contact_info: "", address: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to add supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-5 supplier-form">
      <h3 className="mb-4 text-warning fw-bold text-center">➕ Add New Supplier</h3>

      {message && (
        <div
          className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"
            } text-center`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Supplier Name */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Supplier Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter supplier name"
            required
          />
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Contact Info</label>
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Phone number or email"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter full address"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-warning btn-lg fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Supplier"}
          </button>
        </div>
      </form>
    </div>
  );
}


// View Suppliers
function ViewSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({ name: "", contact_info: "", address: "" });

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch suppliers
  useEffect(() => {
    fetchSuppliers();
  }, [page]);

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/supplier/view?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers(res.data.suppliers);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching suppliers", err);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchSuppliers();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/supplier/search/${value}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers(res.data);
      setTotalPages(1);
    } catch {
      setSuppliers([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/supplier/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSuppliers();
    } catch (err) {
      console.error("Error deleting supplier", err);
    }
  };

  const handleEdit = (supplier) => {
    setEditSupplier(supplier.supplier_id);
    setFormData({ name: supplier.name, contact_info: supplier.contact_info, address: supplier.address });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/supplier/update/${editSupplier}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditSupplier(null);
      fetchSuppliers();
    } catch (err) {
      console.error("Error updating supplier", err);
    }
  };

  return (
    <div className="suppliers-container">
      <h2 className="title">Suppliers</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search suppliers..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Table */}
      <table className="suppliers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact Info</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((s) => (
              <tr key={s.supplier_id}>
                <td>{s.supplier_id}</td>
                <td>
                  {editSupplier === s.supplier_id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td>
                  {editSupplier === s.supplier_id ? (
                    <input
                      type="text"
                      value={formData.contact_info}
                      onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                    />
                  ) : (
                    s.contact_info
                  )}
                </td>
                <td>
                  {editSupplier === s.supplier_id ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  ) : (
                    s.address
                  )}
                </td>
                <td>
                  {editSupplier === s.supplier_id ? (
                    <>
                      <button className="btn save" onClick={handleUpdate}>💾 Save</button>
                      <button className="btn cancel" onClick={() => setEditSupplier(null)}>❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn edit" onClick={() => handleEdit(s)}>✏️ Edit</button>
                      <button className="btn delete" onClick={() => handleDelete(s.supplier_id)}>🗑️ Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No suppliers found</td></tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>⬅ Prev</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ➡</button>
      </div>
    </div>
  );
};



function AddCustomerForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact_info: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/customer/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setFormData({ name: "", contact_info: "", address: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-5 supplier-form">
      <h3 className="mb-4 text-warning fw-bold text-center">👤 Add New Customer</h3>

      {message && (
        <div
          className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"
            } text-center`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Customer Name */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">
            Customer Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter customer name"
            required
          />
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">
            Contact Info
          </label>
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Phone number or email"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter full address"
            rows="3"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-warning btn-lg fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}


function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState({
    consumer_id: "",
    name: "",
    contact_info: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/customer/view", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      setMessage("❌ Failed to load customers");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      fetchCustomers();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/customer/search/${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCustomers(res.data);
    } catch (err) {
      setCustomers([]);
      setMessage("No customers found");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/customer/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Customer deleted successfully");
      fetchCustomers();
    } catch (err) {
      setMessage("❌ Failed to delete customer");
    }
  };

  // Open modal with selected customer data
  const handleEditClick = (customer) => {
    setEditCustomer({ ...customer });
    setShowModal(true);
  };

  // Handle modal input changes
  const handleModalChange = (e) => {
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value });
  };

  // Update customer (submit modal form)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/customer/update/${editCustomer.consumer_id}`,
        {
          name: editCustomer.name,
          contact_info: editCustomer.contact_info,
          address: editCustomer.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Customer updated successfully");
      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      setMessage("❌ Failed to update customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customers-container">
      <h3 className="text-warning fw-bold text-center mb-4">
        📋 Customer List
      </h3>

      {/* Alert Message */}
      {message && (
        <div
          className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"
            } text-center`}
        >
          {message}
        </div>
      )}

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="d-flex justify-content-center mb-4"
      >
        <input
          type="text"
          className="form-control w-50 me-2 bg-dark text-light border-warning"
          placeholder="Search customer by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-warning">
          <FaSearch />
        </button>
      </form>

      {/* Customer Table */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle text-center rounded">
          <thead className="table-warning text-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.consumer_id}>
                  <td>{customer.consumer_id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.contact_info || "N/A"}</td>
                  <td>{customer.address || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEditClick(customer)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(customer.consumer_id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Customer Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          className="bg-dark text-warning border-bottom border-warning"
        >
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form onSubmit={handleUpdate}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={editCustomer.name}
                onChange={handleModalChange}
                className="form-control bg-dark text-light border-warning"
                required
              />
            </div>
            {/* Contact */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Contact Info</label>
              <input
                type="text"
                name="contact_info"
                value={editCustomer.contact_info || ""}
                onChange={handleModalChange}
                className="form-control bg-dark text-light border-warning"
              />
            </div>
            {/* Address */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                name="address"
                value={editCustomer.address || ""}
                onChange={handleModalChange}
                className="form-control bg-dark text-light border-warning"
                rows="3"
              ></textarea>
            </div>
            <Button
              type="submit"
              className="btn btn-warning w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Customer"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}


function MakePurchaseForm() {
  const [formData, setFormData] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    unit_price: "",
  });
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products & suppliers when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Fetch all products
    axios
      .get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));

    // ✅ Fetch all suppliers (no pagination)
    axios
      .get("http://localhost:3000/api/suppliers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", { ...formData, user_id: localStorage.getItem("user_id") });
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user?.user_id;   // ✅ safely get user_id

      const res = await axios.post(
        "http://localhost:3000/api/purchase/add",
        { ...formData, user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`✅ ${res.data.message} | Invoice: ${res.data.invoice_no}`);
      setFormData({ product_id: "", supplier_id: "", quantity: "", unit_price: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to create purchase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-5 customer-form">
      <h3 className="mb-4 text-warning fw-bold text-center">🛒 Make a Purchase</h3>

      {message && (
        <div
          className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"
            } text-center`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Select Product */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Select Product</label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3 bg-dark text-light"
            required
          >
            <option value="">-- Choose a Product --</option>
            {products.map((p) => (
              <option key={p.product_id} value={p.product_id}>
                {p.name} {/* ✅ use correct column */}
              </option>
            ))}
          </select>
        </div>

        {/* Select Supplier */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Select Supplier</label>
          <select
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3 bg-dark text-light"
            required
          >
            <option value="">-- Choose a Supplier --</option>
            {suppliers.map((s) => (
              <option key={s.supplier_id} value={s.supplier_id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Unit Price */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-light">Unit Price</label>
          <input
            type="number"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            className="form-control form-control-lg rounded-3"
            placeholder="Enter unit price"
            required
          />
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-warning btn-lg fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Purchase"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ViewPurchases() {
  const [allPurchases, setAllPurchases] = useState([]);   // raw from API
  const [purchases, setPurchases] = useState([]);         // after local date filtering
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Edit modal
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ quantity: "", unit_price: "" });
  const [saving, setSaving] = useState(false);

  // Date filter (client-side)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Voice search
  const [recognizing, setRecognizing] = useState(false);
  const recognitionRef = useRef(null);

  // --- Helpers ---
  const tokenHeader = useMemo(() => {
    const token = localStorage.getItem("token") || "";
    // IMPORTANT: Bearer prefix — your middleware expects it
    return { Authorization: `Bearer ${token}` };
  }, []);

  // Simple debounce
  const debounceRef = useRef(null);
  const debounce = (fn, delay = 350) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fn, delay);
  };

  // --- Fetch all ---
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/purchases", {
        headers: tokenHeader,
      });
      const rows = Array.isArray(res.data) ? res.data : [];
      setAllPurchases(rows);
      // Apply local date filter
      setPurchases(applyDateFilter(rows, fromDate, toDate));
      setMsg("");
    } catch (err) {
      console.error("Fetch purchases failed:", err);
      setAllPurchases([]);
      setPurchases([]);
      setMsg(
        err?.response?.status === 401
          ? "Unauthorized. Please log in again."
          : "Failed to load purchases."
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Search (by invoice/product/supplier/user) on each key ---
  const fetchSearch = async (q) => {
    try {
      setLoading(true);
      const url = q?.trim()
        ? `http://localhost:3000/api/purchases/search?q=${encodeURIComponent(q)}`
        : "http://localhost:3000/api/purchases";
      const res = await axios.get(url, { headers: tokenHeader });
      const rows = Array.isArray(res.data) ? res.data : [];
      setAllPurchases(rows);
      // Apply local date filter
      setPurchases(applyDateFilter(rows, fromDate, toDate));
      setMsg("");
    } catch (err) {
      console.error("Search failed:", err);
      setAllPurchases([]);
      setPurchases([]);
      setMsg("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Local date range filter (applied after every fetch/search) ---
  const applyDateFilter = (rows, from, to) => {
    if (!from && !to) return rows;
    const fromTs = from ? new Date(from + "T00:00:00").getTime() : null;
    const toTs = to ? new Date(to + "T23:59:59").getTime() : null;

    return rows.filter((r) => {
      const ts = new Date(r.purchase_date).getTime();
      if (fromTs && ts < fromTs) return false;
      if (toTs && ts > toTs) return false;
      return true;
    });
  };

  // Re-apply local date filtering anytime dates change
  useEffect(() => {
    setPurchases(applyDateFilter(allPurchases, fromDate, toDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Handlers ---
  const onChangeSearch = (value) => {
    setSearch(value);
    debounce(() => fetchSearch(value), 350);
  };

  const onClickDownloadAll = () => {
    window.open("http://localhost:3000/api/purchases/download/pdf", "_blank");
  };

  const onClickDownloadRow = (purchase_id) => {
    window.open(
      `http://localhost:3000/api/purchases/invoice/${purchase_id}`,
      "_blank"
    );
  };

  const onEdit = (row) => {
    setEditing(row);
    setEditForm({
      quantity: row.quantity,
      unit_price: row.unit_price,
    });
  };

  const onSaveEdit = async () => {
    if (!editing) return;
    if (!editForm.quantity || !editForm.unit_price) {
      setMsg("Quantity and Unit Price are required");
      return;
    }
    try {
      setSaving(true);
      await axios.put(
        `http://localhost:3000/api/purchases/${editing.purchase_id}`,
        {
          quantity: Number(editForm.quantity),
          unit_price: Number(editForm.unit_price),
        },
        { headers: tokenHeader }
      );
      setEditing(null);
      setMsg("✅ Purchase updated");
      fetchSearch(search); // refresh current view
    } catch (err) {
      console.error("Update failed:", err);
      setMsg("❌ Update failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this purchase? This will adjust stock.")) return;
    try {
      await axios.delete(`http://localhost:3000/api/purchases/${id}`, {
        headers: tokenHeader,
      });
      setMsg("✅ Purchase deleted");
      fetchSearch(search); // refresh current view
    } catch (err) {
      console.error("Delete failed:", err);
      setMsg("❌ Delete failed");
    }
  };

  // --- Voice search (Web Speech API) ---
  const toggleVoiceSearch = () => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setMsg("Voice search not supported in this browser.");
        return;
      }
      if (!recognitionRef.current) {
        const rec = new SpeechRecognition();
        rec.lang = "en-US";
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        rec.onstart = () => setRecognizing(true);
        rec.onend = () => setRecognizing(false);
        rec.onerror = () => setRecognizing(false);
        rec.onresult = (e) => {
          const transcript = e.results?.[0]?.[0]?.transcript || "";
          setSearch(transcript);
          fetchSearch(transcript);
        };
        recognitionRef.current = rec;
      }
      if (!recognizing) recognitionRef.current.start();
      else recognitionRef.current.stop();
    } catch (e) {
      setRecognizing(false);
    }
  };

  return (
    <div className="vp-container">
      <div className="vp-header">
        <h3>🧾 View Purchases</h3>
        <div className="vp-actions">
          <button className="btn vp-btn-gold" onClick={onClickDownloadAll}>
            <FaDownload /> Download All (PDF)
          </button>
        </div>
      </div>

      {/* Alerts */}
      {msg && (
        <div
          className={`vp-alert ${msg.startsWith("✅") ? "vp-alert-success" : "vp-alert-danger"
            }`}
        >
          {msg}
        </div>
      )}

      {/* Filters */}
      <div className="vp-filters">
        <div className="vp-search">
          <FaSearch className="vp-search-icon" />
          <input
            className="vp-input"
            type="text"
            placeholder="Search by invoice, product, supplier, or user..."
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
          />
          <button
            className={`btn vp-btn-mic ${recognizing ? "active" : ""}`}
            onClick={toggleVoiceSearch}
            title="Voice search"
          >
            <FaMicrophone />
          </button>
        </div>

        <div className="vp-date-filters">
          <span className="vp-filter-label">
            <FaFilter /> Date Range
          </span>
          <input
            type="date"
            className="vp-input-date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span className="vp-date-sep">to</span>
          <input
            type="date"
            className="vp-input-date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          {(fromDate || toDate) && (
            <button
              className="btn vp-btn-clear"
              onClick={() => {
                setFromDate("");
                setToDate("");
              }}
              title="Clear date filter"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="vp-table-wrap">
        <table className="vp-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Product</th>
              <th>Supplier</th>
              <th>User</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Date</th>
              <th className="vp-col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && purchases?.length === 0 && (
              <tr>
                <td colSpan="8" className="vp-empty">
                  No purchases found.
                </td>
              </tr>
            )}

            {loading && (
              <tr>
                <td colSpan="8" className="vp-empty">
                  Loading…
                </td>
              </tr>
            )}

            {!loading &&
              purchases?.map((p) => (
                <tr key={p.purchase_id}>
                  <td className="mono">{p.invoice_no}</td>
                  <td>{p.product_name}</td>
                  <td>{p.supplier_name}</td>
                  <td>{p.user_name || "—"}</td>
                  <td>{p.quantity}</td>
                  <td>₹ {Number(p.unit_price).toFixed(2)}</td>
                  <td>
                    {p.purchase_date
                      ? new Date(p.purchase_date).toLocaleString()
                      : "—"}
                  </td>
                  <td className="vp-actions-cell">
                    <button
                      className="btn btn-ghost"
                      onClick={() => onClickDownloadRow(p.purchase_id)}
                      title="Download invoice"
                    >
                      <FaDownload />
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => onEdit(p)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger-ghost"
                      onClick={() => { console.log(p.purchase_id); onDelete(p.purchase_id) }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="vp-modal-overlay" onClick={() => setEditing(null)}>
          <div
            className="vp-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="vp-modal-header">
              <h4>
                Edit Purchase <span className="mono">#{editing.invoice_no}</span>
              </h4>
              <button className="vp-modal-close" onClick={() => setEditing(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="vp-modal-body">
              <div className="vp-field">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={editForm.quantity}
                  onChange={(e) =>
                    setEditForm({ ...editForm, quantity: e.target.value })
                  }
                  className="vp-input"
                />
              </div>

              <div className="vp-field">
                <label>Unit Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={editForm.unit_price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, unit_price: e.target.value })
                  }
                  className="vp-input"
                />
              </div>

              <div className="vp-summary">
                <div>
                  <small>Product</small>
                  <div>{editing.product_name}</div>
                </div>
                <div>
                  <small>Supplier</small>
                  <div>{editing.supplier_name}</div>
                </div>
                <div>
                  <small>Total</small>
                  <div className="mono">
                    ₹{" "}
                    {(
                      Number(editForm.quantity || 0) *
                      Number(editForm.unit_price || 0)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="vp-modal-footer">
              <button
                className="btn vp-btn-gold"
                onClick={onSaveEdit}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button className="btn vp-btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MakeSale() {
  const [products, setProducts] = useState([]);
  const [consumers, setConsumers] = useState([]);

  const [form, setForm] = useState({
    product_name: "",
    consumer_name: "",
    quantity: "",
    unit_price: "",
    user_id: "", // set your logged-in user id
  });

  const [available, setAvailable] = useState(0);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const tokenHeader = useMemo(() => {
    const token = localStorage.getItem("token") || "";
    return { Authorization: `Bearer ${token}` };
  }, []);

  useEffect(() => {
    // Prefill user_id if you store it

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const uid = storedUser.user_id || "";
    // console.log(uid)
    setForm((f) => ({ ...f, user_id: uid }));

    // Load products (with availability) & consumers
    (async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          axios.get("http://localhost:3000/api/sales/products", { headers: tokenHeader }),
          axios.get("http://localhost:3000/api/sales/consumers", { headers: tokenHeader }),
        ]);
        setProducts(Array.isArray(pRes.data) ? pRes.data : []);
        setConsumers(Array.isArray(cRes.data) ? cRes.data : []);
      } catch (e) {
        setMsg("Failed to load products/consumers.");
      }
    })();
  }, [tokenHeader]);

  // When product changes, prefill unit price & availability
  useEffect(() => {
    const p = products.find((x) => x.name === form.product_name);
    if (p) {
      setAvailable(p.available);
      // Pre-fill unit price from product, but allow override
      setForm((f) => ({ ...f, unit_price: String(p.unit_price || "") }));
    } else {
      setAvailable(0);
      setForm((f) => ({ ...f, unit_price: "" }));
    }
  }, [form.product_name, products]);

  const total = useMemo(() => {
    const q = Number(form.quantity || 0);
    const up = Number(form.unit_price || 0);
    return (q * up).toFixed(2);
  }, [form.quantity, form.unit_price]);

  const isQtyValid = () => {
    const q = Number(form.quantity || 0);
    return q > 0 && q <= available;
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    console.log(form)
    if (!form.product_name || !form.consumer_name || !form.user_id) {
      setMsg("Please select product, consumer, and ensure you are logged in.");
      return;
    }
    if (!isQtyValid()) {
      setMsg(`Invalid quantity. Available to sell: ${available}.`);
      return;
    }
    if (!form.unit_price || Number(form.unit_price) < 0) {
      setMsg("Enter a valid unit price.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(
        "http://localhost:3000/api/sales",
        {
          product_name: form.product_name,
          consumer_name: form.consumer_name,
          user_id: form.user_id,
          quantity: Number(form.quantity),
          unit_price: Number(form.unit_price),
        },
        { headers: tokenHeader }
      );

      setToast({
        type: "success",
        text: `Sale created. Invoice: ${res.data.invoice_no}`,
      });

      // Reset form (keep user)
      setForm((f) => ({
        ...f,
        product_name: "",
        consumer_name: "",
        quantity: "",
        unit_price: "",
      }));

      // Refresh products to show updated availability
      const pRes = await axios.get("http://localhost:3000/api/sales/products", {
        headers: tokenHeader,
      });
      setProducts(Array.isArray(pRes.data) ? pRes.data : []);
      setAvailable(0);
    } catch (err) {
      const apiErr = err?.response?.data?.error || "Sale failed.";
      setToast({ type: "error", text: apiErr });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="ms-wrap">
      <div className="ms-card">
        <div className="ms-header">
          <h3>
            <FaShoppingCart /> Make Sale
          </h3>
        </div>

        {msg && (
          <div className="ms-alert">
            <FaExclamationTriangle /> {msg}
          </div>
        )}

        <form onSubmit={onSubmit} className="ms-form">
          <div className="ms-field">
            <label>Product</label>
            <select
              name="product_name"
              value={form.product_name}
              onChange={onChange}
              className="ms-input"
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.product_id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="ms-hint">
              Available to sell: <span className="mono">{available}</span>
            </div>
          </div>

          <div className="ms-field">
            <label>Customer</label>
            <select
              name="consumer_name"
              value={form.consumer_name}
              onChange={onChange}
              className="ms-input"
            >
              <option value="">Select customer</option>
              {consumers.map((c) => (
                <option key={c.consumer_id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="ms-row">
            <div className="ms-field">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={onChange}
                className={`ms-input ${form.quantity && !isQtyValid() ? "invalid" : ""}`}
                placeholder={`Max ${available}`}
              />
              {!isQtyValid() && form.quantity && (
                <div className="ms-error">Max allowed: {available}</div>
              )}
            </div>

            <div className="ms-field">
              <label>Unit Price</label>
              <input
                type="number"
                step="0.01"
                name="unit_price"
                value={form.unit_price}
                onChange={onChange}
                className="ms-input"
                placeholder="e.g. 199.99"
              />
            </div>

            <div className="ms-field">
              <label>Total</label>
              <div className="ms-total mono">₹ {total}</div>
            </div>
          </div>

          <div className="ms-actions">
            <button className="btn ms-btn-gold" type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Create Sale"}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div className={`ms-toast ${toast.type === "success" ? "ok" : "bad"}`}>
          {toast.type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
          <span>{toast.text}</span>
        </div>
      )}
    </div>
  );
}

function ViewSales() {
  const [allSales, setAllSales] = useState([]);
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Edit modal
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ quantity: "", unit_price: "" });
  const [saving, setSaving] = useState(false);

  // Date filter (client-side)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Voice search
  const [recognizing, setRecognizing] = useState(false);
  const recognitionRef = useRef(null);

  // --- Helpers ---
  const tokenHeader = useMemo(() => {
    const token = localStorage.getItem("token") || "";
    return { Authorization: `Bearer ${token}` };
  }, []);

  const debounceRef = useRef(null);
  const debounce = (fn, delay = 350) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fn, delay);
  };

  // --- Fetch all ---
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/sales", { headers: tokenHeader });
      const rows = Array.isArray(res.data) ? res.data : [];
      setAllSales(rows);
      setSales(applyDateFilter(rows, fromDate, toDate));
      setMsg("");
    } catch (err) {
      console.error("Fetch sales failed:", err);
      setAllSales([]);
      setSales([]);
      setMsg(err?.response?.status === 401 ? "Unauthorized. Please log in again." : "Failed to load sales.");
    } finally {
      setLoading(false);
    }
  };

  // --- Search ---
  const fetchSearch = async (q) => {
    try {
      setLoading(true);
      const url = q?.trim()
        ? `http://localhost:3000/api/sales/search?q=${encodeURIComponent(q)}`
        : "http://localhost:3000/api/sales";
      const res = await axios.get(url, { headers: tokenHeader });
      const rows = Array.isArray(res.data) ? res.data : [];
      setAllSales(rows);
      setSales(applyDateFilter(rows, fromDate, toDate));
      setMsg("");
    } catch (err) {
      console.error("Search failed:", err);
      setAllSales([]);
      setSales([]);
      setMsg("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Date filter ---
  const applyDateFilter = (rows, from, to) => {
    if (!from && !to) return rows;
    const fromTs = from ? new Date(from + "T00:00:00").getTime() : null;
    const toTs = to ? new Date(to + "T23:59:59").getTime() : null;

    return rows.filter((r) => {
      const ts = new Date(r.sale_date).getTime();
      if (fromTs && ts < fromTs) return false;
      if (toTs && ts > toTs) return false;
      return true;
    });
  };

  useEffect(() => {
    setSales(applyDateFilter(allSales, fromDate, toDate));
  }, [fromDate, toDate, allSales]);

  useEffect(() => {
    fetchAll();
  }, []);

  const onChangeSearch = (value) => {
    setSearch(value);
    debounce(() => fetchSearch(value), 350);
  };

  const onClickDownloadAll = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/sales/download/pdf", {
        headers: tokenHeader,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sales_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download all sales:", err);
      setMsg("❌ Failed to download all sales report");
    }
  };

  const onClickDownloadRow = async (sale_id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/sales/invoice/${sale_id}`, {
        headers: tokenHeader,
        responseType: "blob" // important for PDF
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${sale_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
      setMsg("❌ Failed to download invoice");
    }
  };

  const onEdit = (row) => {
    setEditing(row);
    setEditForm({ quantity: row.quantity, unit_price: row.unit_price });
  };

  const onSaveEdit = async () => {
    if (!editing) return;
    if (!editForm.quantity || !editForm.unit_price) {
      setMsg("Quantity and Unit Price are required");
      return;
    }
    try {
      setSaving(true);
      await axios.put(
        `http://localhost:3000/api/sales/${editing.sale_id}`,
        { quantity: Number(editForm.quantity), unit_price: Number(editForm.unit_price) },
        { headers: tokenHeader }
      );
      setEditing(null);
      setMsg("✅ Sale updated");
      fetchSearch(search);
    } catch (err) {
      console.error("Update failed:", err);
      setMsg("❌ Update failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this sale? This will adjust stock.")) return;
    try {
      await axios.delete(`http://localhost:3000/api/sales/${id}`, { headers: tokenHeader });
      setMsg("✅ Sale deleted");
      fetchSearch(search);
    } catch (err) {
      console.error("Delete failed:", err);
      setMsg("❌ Delete failed");
    }
  };

  const toggleVoiceSearch = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setMsg("Voice search not supported in this browser.");
        return;
      }
      if (!recognitionRef.current) {
        const rec = new SpeechRecognition();
        rec.lang = "en-US";
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        rec.onstart = () => setRecognizing(true);
        rec.onend = () => setRecognizing(false);
        rec.onerror = () => setRecognizing(false);
        rec.onresult = (e) => {
          const transcript = e.results?.[0]?.[0]?.transcript || "";
          setSearch(transcript);
          fetchSearch(transcript);
        };
        recognitionRef.current = rec;
      }
      if (!recognizing) recognitionRef.current.start();
      else recognitionRef.current.stop();
    } catch (e) {
      setRecognizing(false);
    }
  };

  return (
    <div className="vp-container">
      <div className="vp-header">
        <h3>🧾 View Sales</h3>
        <div className="vp-actions">
          <button className="btn vp-btn-gold" onClick={onClickDownloadAll}>
            <FaDownload /> Download All (PDF)
          </button>
        </div>
      </div>

      {msg && (
        <div className={`vp-alert ${msg.startsWith("✅") ? "vp-alert-success" : "vp-alert-danger"}`}>
          {msg}
        </div>
      )}

      <div className="vp-filters">
        <div className="vp-search">
          <FaSearch className="vp-search-icon" />
          <input
            className="vp-input"
            type="text"
            placeholder="Search by invoice, product, customer, or user..."
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
          />
          <button
            className={`btn vp-btn-mic ${recognizing ? "active" : ""}`}
            onClick={toggleVoiceSearch}
            title="Voice search"
          >
            <FaMicrophone />
          </button>
        </div>

        <div className="vp-date-filters">
          <span className="vp-filter-label"><FaFilter /> Date Range</span>
          <input type="date" className="vp-input-date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <span className="vp-date-sep">to</span>
          <input type="date" className="vp-input-date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          {(fromDate || toDate) && (
            <button className="btn vp-btn-clear" onClick={() => { setFromDate(""); setToDate(""); }} title="Clear date filter">
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="vp-table-wrap">
        <table className="vp-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Product</th>
              <th>Customer</th>
              <th>User</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Date</th>
              <th className="vp-col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && sales?.length === 0 && (
              <tr><td colSpan="8" className="vp-empty">No sales found.</td></tr>
            )}
            {loading && (
              <tr><td colSpan="8" className="vp-empty">Loading…</td></tr>
            )}
            {!loading && sales?.map((s) => (
              <tr key={s.sale_id}>
                <td className="mono">{s.invoice_no}</td>
                <td>{s.product_name}</td>
                <td>{s.consumer_name}</td>
                <td>{s.username || "—"}</td>
                <td>{s.quantity}</td>
                <td>₹ {Number(s.unit_price).toFixed(2)}</td>
                <td>{s.sale_date ? new Date(s.sale_date).toLocaleString() : "—"}</td>
                <td className="vp-actions-cell">
                  <button className="btn btn-ghost" onClick={() => onClickDownloadRow(s.sale_id)} title="Download invoice"><FaDownload /></button>
                  <button className="btn btn-ghost" onClick={() => onEdit(s)} title="Edit"><FaEdit /></button>
                  <button className="btn btn-danger-ghost" onClick={() => onDelete(s.sale_id)} title="Delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="vp-modal-overlay" onClick={() => setEditing(null)}>
          <div className="vp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vp-modal-header">
              <h4>Edit Sale <span className="mono">#{editing.invoice_no}</span></h4>
              <button className="vp-modal-close" onClick={() => setEditing(null)}><FaTimes /></button>
            </div>
            <div className="vp-modal-body">
              <div className="vp-field">
                <label>Quantity</label>
                <input type="number" min="1" value={editForm.quantity} onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })} className="vp-input" />
              </div>
              <div className="vp-field">
                <label>Unit Price</label>
                <input type="number" step="0.01" min="0" value={editForm.unit_price} onChange={(e) => setEditForm({ ...editForm, unit_price: e.target.value })} className="vp-input" />
              </div>
              <div className="vp-summary">
                <div><small>Product</small><div>{editing.product_name}</div></div>
                <div><small>Customer</small><div>{editing.consumer_name}</div></div>
                <div><small>Total</small><div className="mono">₹ {(Number(editForm.quantity || 0) * Number(editForm.unit_price || 0)).toFixed(2)}</div></div>
              </div>
            </div>
            <div className="vp-modal-footer">
              <button className="btn vp-btn-gold" onClick={onSaveEdit} disabled={saving}>{saving ? "Saving…" : "Save"}</button>
              <button className="btn vp-btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



function SalesReport() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesSummary, setSalesSummary] = useState({});

  useEffect(() => {
    fetchSalesReport();
  }, []);

  const fetchSalesReport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/reports/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSalesSummary(response.data.summary || {});
      setSalesData(response.data.sales || []);
      setLoading(false); // ✅ Fix: stop loading after data is fetched
    } catch (error) {
      console.error("Error fetching sales report:", error);
      setLoading(false);
    }
  };

  const labels = salesData.map((s) =>
    new Date(s.sale_date).toLocaleDateString()
  );
  const quantities = salesData.map((s) => s.quantity);
  const revenues = salesData.map((s) => Number(s.quantity) * Number(s.unit_price));

  const barData = {
    labels,
    datasets: [
      {
        label: "Total Sales (₹)",
        data: revenues,
        backgroundColor: "rgba(0, 255, 255, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Quantity Sold",
        data: quantities,
        fill: false,
        borderColor: "#ff9800",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="sales-report-container">
      <h2 className="sales-report-title">📊 Sales Report</h2>

      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <div className="row g-4">
          {/* Bar Chart */}
          <div className="col-md-6">
            <Card className="sales-report-card">
              <Card.Body>
                <Card.Title className="chart-title">Daily Sales (₹)</Card.Title>
                <Bar data={barData} options={{ responsive: true, plugins: { legend: { labels: { color: "#fff" } } } }} />
              </Card.Body>
            </Card>
          </div>

          {/* Line Chart */}
          <div className="col-md-6">
            <Card className="sales-report-card">
              <Card.Body>
                <Card.Title className="chart-title">Quantity Sold</Card.Title>
                <Line data={lineData} options={{ responsive: true, plugins: { legend: { labels: { color: "#fff" } } }, scales: { x: { ticks: { color: "#bbb" } }, y: { ticks: { color: "#bbb" } } } }} />
              </Card.Body>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="summary-container">
            <div className="summary-card">
              <h4>Total Sales</h4>
              <p>{salesSummary.total_sales}</p>
            </div>
            <div className="summary-card">
              <h4>Total Quantity</h4>
              <p>{salesSummary.total_quantity}</p>
            </div>
            <div className="summary-card">
              <h4>Total Revenue</h4>
              <p>₹{salesSummary.total_revenue}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PurchasesReport = () => {
  const [purchasesData, setPurchasesData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchPurchasesReport();
  }, []);

  const fetchPurchasesReport = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/reports/purchases", {
        params: { fromDate, toDate },
      });
      setPurchasesData(res.data.purchases || []);
      setSummary(res.data.summary || {});
    } catch (err) {
      console.error("Error fetching purchases report:", err);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const labels = purchasesData.map((p) =>
    new Date(p.purchase_date).toLocaleDateString()
  );
  const quantities = purchasesData.map((p) => p.quantity);
  const totalSpent = purchasesData.map(
    (p) => Number(p.quantity) * Number(p.unit_price)
  );

  const barData = {
    labels,
    datasets: [
      {
        label: "Total Spent (₹)",
        data: totalSpent,
        backgroundColor: "rgba(0, 216, 255, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Quantity Purchased",
        data: quantities,
        fill: false,
        borderColor: "#ff6384",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="report-container">
      <h2 className="report-title">📦 Purchases Report</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="date-input"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="date-input"
        />
        <button onClick={fetchPurchasesReport} className="filter-btn">
          Apply Filter
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h4>Total Purchases</h4>
          <p>{summary?.total_purchases || 0}</p>
        </div>
        <div className="card">
          <h4>Total Quantity</h4>
          <p>{summary?.total_quantity || 0}</p>
        </div>
        <div className="card">
          <h4>Total Spent</h4>
          <p>₹{summary?.total_spent || 0}</p>
        </div>
      </div>

      {/* Charts */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="charts-grid">
          <Card className="chart-card">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Total Spent per Purchase</Card.Title>
              <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </Card.Body>
          </Card>

          <Card className="chart-card">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Quantity Purchased Over Time</Card.Title>
              <Line data={lineData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Purchases Table */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Product</th>
              <th>Supplier</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {purchasesData.length > 0 ? (
              purchasesData.map((purchase) => (
                <tr key={purchase.purchase_id}>
                  <td>{purchase.invoice_no}</td>
                  <td>{purchase.product_name}</td>
                  <td>{purchase.supplier_name}</td>
                  <td>{purchase.category_name}</td>
                  <td>{purchase.quantity}</td>
                  <td>₹{purchase.unit_price}</td>
                  <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
