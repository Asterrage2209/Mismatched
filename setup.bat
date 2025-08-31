@echo off
echo ========================================
echo Mismatched Dating Website Setup
echo ========================================
echo.

echo Installing frontend dependencies...
npm install

echo.
echo Installing backend dependencies...
cd server
npm install
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start the backend server:
echo    cd server
echo    npm run dev
echo.
echo 2. In a new terminal, start the frontend:
echo    npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo Optional: Generate demo data by visiting:
echo http://localhost:5000/api/demo/generate
echo.
pause
