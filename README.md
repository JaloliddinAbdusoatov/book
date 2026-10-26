# 📚 Kitob Do'koni — Zamonaviy Pedagogika va Ta'lim Mahorati
### Author Book Showcase & Online Ordering Platform with Admin Management

[![Spring Boot 3.x](https://img.shields.io/badge/Spring%20Boot-3.4.x-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java 21](https://img.shields.io/badge/Java-21%20LTS-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker%20Compose-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📖 Loyiha Haqida (Project Overview)

Ushbu platforma 20 yillik tajribaga ega ustoz-pedagog **Nigora Rahimova** tomonidan yozilgan va nashr etilgan **"Zamonaviy Pedagogika va Ta'lim Mahorati"** kitobini taqdim etish, ishonchli mualliflik muhitini yaratish hamda mijozlardan to'g'ridan-to'g'ri buyurtmalarni qabul qilish va boshqarish uchun ishlab chiqilgan to'liq stekli (Full-Stack) tizimdir.

### ✨ Asosiy Imkoniyatlar (Key Features)

#### 1. Xaridorlar uchun (Public Showcase & Ordering)
- **Zamonaviy 3D Ko'rgazma:** Kitob muqovasining 3D realistik ko'rinishi, sahifalar soni (280 bet), qattiq muqova va ombor qoldig'i hisoblagichi.
- **Interfaol Mundarija:** 7 ta asosiy bob va dars ssenariylari bo'yicha batafsil mundarijani ko'rish.
- **Muallif bilan tanishuv:** Ustozning pedagogik tajribasi, "Xalq ta'limi a'lochisi" ko'krak nishoni va yutuqlari.
- **Onlayn Buyurtma Shakli:** Bir necha soniyada buyurtma berish, nusxalar sonini tanlash va jami summani avtomatik hisoblash.
- **Muallif Dastxati (Autograph) opsiyasi:** Kitobxonlar buyurtma berishda shaxsan muallifdan esdalik yozuvi (dastxat) so'rash imkoniyati.
- **Buyurtmani Kod orqali Kuzatish:** Har bir buyurtmaga beriladigan unikal kod (`ORD-XXXXXXXX`) orqali buyurtmaning joriy holatini (Yangi ➔ Tasdiqlangan ➔ Yo'lda ➔ Yetkazilgan) tekshirish.

#### 2. Administrator uchun (Admin Management Portal — `/admin`)
- **Xavfsiz Kirish:** JWT (JSON Web Token) va BCrypt parollash orqali himoyalangan admin paneli.
- **Statistika Ko'rsatkichlari (KPI):** Jami buyurtmalar, kutilayotganlar, yetkazilganlar, umumiy tushum va ombordagi qoldiq nusxalar.
- **Buyurtmalarni Boshqarish:** Holatlar bo'yicha saralash, mijoz ismi/telefoni bo'yicha qidiruv, buyurtma holatini bir bosishda yangilash.
- **Kitob va Ombor Ma'lumotlarini Tahrirlash:** Kitob narxi, ombor qoldig'i, sarlavha, tavsif va mundarijani jonli tahrirlash.

---

## 🏗️ Arxitektura va Texnologiyalar

| Qatlam | Texnologiyalar |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Axios, React Router v7 |
| **Backend** | Java 21, Spring Boot 3.4.x, Spring Data JPA, Spring Security (JWT), Hibernate, Flyway |
| **Ma'lumotlar bazasi** | PostgreSQL 17 |
| **Infratuzilma** | Docker, Docker Compose, Nginx (Reverse Proxy & SPA routing) |

---

## 🚀 Qanday Ishga Tushiriladi (How to Run)

Loyiha ikki xil usulda ishga tushirilishi mumkin: **Docker Compose** (tavsiya etiladi) yoki **Mahalliy (Local Dev)**.

### 1-USUL: Docker Compose orqali (Tavsiya etiladi / 1 Buyruq bilan)

Tizimda [Docker Desktop](https://www.docker.com/products/docker-desktop/) o'rnatilgan bo'lishi kerak.

```bash
# 1. Loyiha papkasiga kiring
cd c:\Users\user\Desktop\book

# 2. Barcha xizmatlarni (Postgres, Backend, Frontend) ishga tushiring
docker compose up --build -d
```

Ishga tushgach quyidagi manzillardan foydalanishingiz mumkin:
- **Asosiy Veb-sayt (Frontend):** [http://localhost:3000](http://localhost:3000)
- **Admin Boshqaruv Paneli:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend REST API:** [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
- **Tizim salomatligi (Actuator Health):** [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)

---

### 2-USUL: Mahalliy Ishlab Chiqish (Local Development)

#### Talablar:
- Java 21 (JDK)
- Node.js (v20 yoki undan yuqori) va npm
- Docker (faqat PostgreSQL uchun yoki alohida o'rnatilgan Postgres)

#### 1-Qadam: PostgreSQL bazasini ishga tushirish
```bash
docker compose up -d postgres
```
*(Baza `localhost:5432` portida ishlaydi, foydalanuvchi: `bookstore`, parol: `bookstore_dev_pass`, DB: `bookstore`)*

#### 2-Qadam: Backendni ishga tushirish (Spring Boot)
```bash
cd backend
.\gradlew.bat bootRun
```
*Backend `http://localhost:8080` portida ishga tushadi va Flyway migratsiyalari avtomatik tarzda jadvallarni yaratadi va dastlabki ma'lumotlarni kiritadi.*

#### 3-Qadam: Frontendni ishga tushirish (React + Vite)
Yangi terminal oching:
```bash
cd frontend
npm install
npm run dev
```
*Frontend dev-server `http://localhost:5173` manzilida ochiladi.*

---

## 🔐 Standart Admin Ma'lumotlari (Default Admin Credentials)

Tizim ishga tushganida dastlabki administrator foydalanuvchisi avtomatik yaratiladi:

| Parametr | Qiymat |
|---|---|
| **Admin Login Sahifasi** | `http://localhost:3000/admin/login` (yoki dev rejimida `http://localhost:5173/admin/login`) |
| **Foydalanuvchi nomi (Username)** | `admin` |
| **Parol (Password)** | `Admin123!` |

*(Ushbu parolni `.env` faylida `ADMIN_PASSWORD` o'zgaruvchisi orqali xohlagan vaqt o'zgartirishingiz mumkin).*

---

## ⚙️ Muhit Sozlamalari (.env Configuration)

Loyihaning ildiz papkasidagi `.env` fayli quyidagi parametrlarni boshqaradi:

```env
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=bookstore
POSTGRES_USER=bookstore
POSTGRES_PASSWORD=bookstore_dev_pass

# Backend
SPRING_PROFILES_ACTIVE=dev
SERVER_PORT=8080

# JWT Token
JWT_SECRET=dev-secret-key-must-be-at-least-32-characters-long-for-hs256
JWT_EXPIRATION_MS=86400000

# Administrator
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin123!

# Frontend API URL
VITE_API_URL=http://localhost:8080/api/v1
```

---

## 📡 REST API Yo'nalishlari (API Endpoints)

### Ochiq API (Public)
| Metod | URL | Tavsif |
|---|---|---|
| `GET` | `/api/v1/books` | Faol kitoblar ro'yxatini olish |
| `GET` | `/api/v1/books/{id}` | Kitobning batafsil ma'lumotini olish |
| `POST` | `/api/v1/orders` | Yangi buyurtma yaratish |
| `GET` | `/api/v1/orders/track/{reference}` | Kod (`ORD-XXXX`) orqali buyurtma holatini kuzatish |

### Autentifikatsiya (Auth)
| Metod | URL | Tavsif |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Admin tizimiga kirish (JWT token qaytaradi) |
| `GET` | `/api/v1/auth/me` | Joriy tizimga kirgan admin ma'lumotlari |

### Administrator API (Admin - Bearer Token talab etiladi)
| Metod | URL | Tavsif |
|---|---|---|
| `GET` | `/api/v1/admin/dashboard` | Dashboard statistikasi (tushum, buyurtmalar, qoldiq) |
| `GET` | `/api/v1/admin/orders` | Barcha buyurtmalarni filtrlash va sahifalash |
| `GET` | `/api/v1/admin/orders/{id}` | Buyurtma tafsilotlari va tarixi |
| `PATCH` | `/api/v1/admin/orders/{id}/status` | Buyurtma holatini o'zgartirish (`NEW`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`) |
| `GET` | `/api/v1/admin/books` | Barcha kitoblar ro'yxati |
| `PUT` | `/api/v1/admin/books/{id}` | Kitob narxi, qoldig'i va matnlarini tahrirlash |

---

## 🗄️ Ma'lumotlar Bazasi Migratsiyalari (Flyway)

Barcha jadval o'zgarishlari va dastlabki ma'lumotlar `backend/src/main/resources/db/migration/` papkasida versiyalangan:
- `V1__initial_schema.sql`: `books`, `book_images`, `admin_users`, `customer_orders`, `order_items`, `order_status_history` jadvallari va indekslari.
- `V2__seed_data.sql`: Ustoz Nigora Rahimovaning "Zamonaviy Pedagogika va Ta'lim Mahorati" kitobining to'liq tavsifi, mundarijasi va narxi.

---

## 🧪 Sinov va Qurish (Testing & Build)

### Backend testlarini yurgazish:
```bash
cd backend
.\gradlew.bat test
```

### Backend ishlab chiqarish (JAR) faylini yaratish:
```bash
cd backend
.\gradlew.bat bootJar
```
*Natija: `backend/build/libs/bookstore-0.0.1-SNAPSHOT.jar`*

### Frontend ishlab chiqarish (Production Build) yaratish:
```bash
cd frontend
npm run build
```
*Natija: `frontend/dist/` papkasida to'liq optimallashtirilgan statik fayllar.*

---

## 📄 Mualliflik Huquqi (License)

© 2024–2026 Ustoz Nigora Rahimova. Barcha huquqlar himoyalangan.
Loyiha mualliflik kitobini targ'ib qilish va sotish maqsadida yaratilgan.
