// Trang quản lý người dùng (Admin - Manager)  
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, Modal, Form } from "antd";

const API_URL = "http://localhost:3001/users";

const ManagerUsers = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn
  const [form] = Form.useForm();

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Thêm hoặc cập nhật người dùng
  const handleSaveUser = async (values) => {
    try {
      if (isEditing) {
        // Cập nhật người dùng
        await axios.put(`${API_URL}/${selectedUser.id}`, values);
      } else {
        // Thêm mới người dùng
        await axios.post(API_URL, values);
      }
      setIsModalOpen(false);
      fetchUsers(); // Load lại danh sách người dùng
    } catch (error) {
      console.error("Lỗi khi lưu người dùng:", error);
    }
  };

  // Xóa người dùng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };

  // Mở modal để thêm mới hoặc chỉnh sửa
  const showModal = (user = null) => {
    setIsEditing(!!user);
    setSelectedUser(user);
    setIsModalOpen(true);
    form.setFieldsValue(user || { username: "", email: "", phone: "", password: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý người dùng</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 20 }}>
        + Thêm Người Dùng
      </Button>

      {/* Bảng danh sách người dùng */}
      <Table
        dataSource={users}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Tên đăng nhập", dataIndex: "username" },
          { title: "Email", dataIndex: "email" },
          { title: "Số điện thoại", dataIndex: "phone" },
          {
            title: "Hành động",
            render: (text, record) => (
              <>
                <Button onClick={() => showModal(record)} style={{ marginRight: 10 }}>
                  Sửa
                </Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Xóa
                </Button>
              </>
            ),
          },
        ]}
      />

      {/* Modal thêm/sửa người dùng */}
      <Modal
        title={isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveUser}>
          <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Nhập email!" }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Nhập mật khẩu!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerUsers;
