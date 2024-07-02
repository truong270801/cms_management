FROM python:3.9

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép requirements.txt và cài đặt các phụ thuộc
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn
COPY . .

# Expose port and start the application
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]