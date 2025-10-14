@echo off
echo 🚀 Deploying Hospital Website to Production...

echo.
echo 📦 Setting up environment...
python setup-production.py

echo.
echo 🔧 Setting up backend...
cd backend
python manage.py createcachetable
python manage.py migrate
python manage.py collectstatic --noinput

echo.
echo 🏗️ Building frontend...
cd ..\frontend
npm install
npm run build

echo.
echo ✅ Production build complete!
echo.
echo 📝 Manual steps remaining:
echo 1. Update backend/.env with your database credentials
echo 2. Update frontend/.env with your domain
echo 3. Create superuser: python manage.py createsuperuser
echo 4. Deploy to your hosting platform
echo.
echo 🔐 Admin URL: https://yourdomain.com/secure-admin-2024-xyz/
echo.
pause