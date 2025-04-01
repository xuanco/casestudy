// Trang chi tiết nhà thuê  
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // Dùng để lấy tham số từ URL
import axios from "axios";

function HouseDetail() {
    const { id } = useParams(); // Lấy id của căn nhà từ URL
    const [house, setHouse] = useState(null);

    useEffect(() => {
        // Gửi request đến API để lấy dữ liệu chi tiết căn nhà
        axios.get(`http://localhost:3001/houses/${id}`)
            .then(response => {
                setHouse(response.data);  // Lưu dữ liệu căn nhà vào state
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi lấy dữ liệu chi tiết căn nhà:", error);
            });
    }, [id]);

    if (!house) {
        return <div>Đang tải thông tin căn nhà...</div>;  // Hiển thị khi chưa có dữ liệu
    }

    return (
        <div className="house-detail p-6">
            <h1 className="text-4xl font-extrabold text-red-500">{house.name}</h1>
            <div className="flex gap-8 mt-6">
                <div className="w-1/2">
                    <img src={house.img} alt={house.name} className="w-full h-80 object-cover rounded-lg shadow-lg" />
                </div>
                <div className="w-1/2">
                    <p><strong>Địa điểm:</strong> {house.location}</p>
                    <p><strong>Loại căn nhà:</strong> {house.type}</p>
                    <p><strong>Giá thuê:</strong> {house.price}</p>
                    <p><strong>Diện tích:</strong> {house.area}</p>
                    <p><strong>Tình trạng:</strong> {house.status === "available" ? "Còn trống" : "Đã thuê"}</p>
                </div>
            </div>
            <div className="mt-8">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Liên hệ để thuê</button>
            </div>
        </div>
    );
}

export default HouseDetail;
