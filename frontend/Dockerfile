# Sử dụng một hình ảnh cơ bản của Node.js
FROM node:20.13.1

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt phụ thuộc
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "start"]
