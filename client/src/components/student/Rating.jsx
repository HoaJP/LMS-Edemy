import React, { useEffect, useState } from "react";

const Rating = ({ initialRating, onRate, courseId }) => {
  // Khởi tạo state rating, ưu tiên initialRating, nếu không thì lấy từ localStorage
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem(`courseRating_${courseId}`);
    return initialRating || (storedRating ? parseInt(storedRating, 10) : 0);
  });

  const handleRating = (value) => {
    setRating(value); // Cập nhật state
    localStorage.setItem(`courseRating_${courseId}`, value); // Lưu vào localStorage với key riêng cho courseId
    if (onRate) onRate(value); 
  };

  // Cập nhật rating khi initialRating thay đổi
  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
      localStorage.setItem(`courseRating_${courseId}`, initialRating); // Cập nhật localStorage nếu initialRating thay đổi
    }
  }, [initialRating, courseId]);

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            onClick={() => handleRating(starValue)}
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <i className="fa-solid fa-star text-xl mx-0.5"></i>
          </span>
        );
      })}
    </div>
  );
};

export default Rating;