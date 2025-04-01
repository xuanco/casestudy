 // Trang chỉnh sửa nhà  
 import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const HouseEdit = () => {
    const { id } = useParams(); // Lấy id của nhà từ URL
    const navigate = useNavigate();

    const [houseData, setHouseData] = useState({
        name: "",
        location: "",
        type: "Căn hộ",
        price: "",
        area: "",
        status: "available",
        img: "",
    });

    const [loading, setLoading] = useState(true);

    // Fetch dữ liệu nhà cần chỉnh sửa
    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/houses/${id}`);
                if (!response.ok) throw new Error("Không tìm thấy nhà!");

                const data = await response.json();
                setHouseData(data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                alert("Không thể tải dữ liệu nhà.");
                navigate("/dashboard");
            }
        };

        fetchHouseData();
    }, [id, navigate]);

    // Hàm xử lý thay đổi dữ liệu input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHouseData({ ...houseData, [name]: value });
    };

    // Hàm cập nhật thông tin nhà
    const handleSubmit = async (e) => {
        e.preventDefault();

        const price = Number(houseData.price);
        const area = Number(houseData.area);

        if (!houseData.name || !houseData.location || !houseData.type || !price || !area) {
            alert("Vui lòng điền đầy đủ thông tin hợp lệ!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/houses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...houseData, price, area }),
            });

            if (response.ok) {
                alert("Cập nhật thành công!");
                navigate("/dashboard"); // Chuyển hướng về Dashboard
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            alert("Đã có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    if (loading) {
        return <p className="text-center text-lg font-semibold text-gray-500">Đang tải dữ liệu...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-4xl font-extrabold text-blue-500 uppercase text-center tracking-wide border-b-4 border-blue-500 inline-block pb-2">
                Chỉnh Sửa Nhà
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                {/* Tên nhà */}
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Tên nhà</label>
                    <input
                        type="text"
                        name="name"
                        value={houseData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition"
                    />
                </div>

                {/* Địa điểm */}
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Địa điểm</label>
                    <input
                        type="text"
                        name="location"
                        value={houseData.location}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition"
                    />
                </div>

                {/* Loại nhà */}
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Loại nhà</label>
                    <select
                        name="type"
                        value={houseData.type}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition"
                    >
                        <option value="Căn hộ">Căn hộ</option>
                        <option value="Nhà riêng">Nhà riêng</option>
                        <option value="Biệt thự">Biệt thự</option>
                    </select>
                </div>

                {/* Giá thuê */}
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Giá thuê (VNĐ/tháng)</label>
                    <input
                        type="number"
                        name="price"
                        value={houseData.price}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition"
                    />
                </div>

                {/* Diện tích */}
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Diện tích (m²)</label>
                    <input
                        type="number"
                        name="area"
                        value={houseData.area}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition"
                    />
                </div>

                {/* Ảnh */}
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Ảnh</label>
                    <input
                        type="text"
                        name="img"
                        value={houseData.img}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition"
                    />
                </div>

                {/* Tình trạng */}
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Tình trạng</label>
                    <select
                        name="status"
                        value={houseData.status}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition"
                    >
                        <option value="available">Còn trống</option>
                        <option value="rented">Đã thuê</option>
                    </select>
                </div>

                {/* Nút Lưu Chỉnh Sửa */}
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Lưu Chỉnh Sửa
                </button>
            </form>
        </div>
    );
};

export default HouseEdit;
