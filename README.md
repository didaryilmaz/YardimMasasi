# Help Desk Uygulaması - Frontend (React)

## 🇹🇷 Türkçe

### Genel Bakış

Bu proje, kullanıcıların destek talepleri (ticket) oluşturabileceği, destek personellerinin bu taleplere yanıt verebileceği ve yöneticilerin tüm süreci izleyebileceği bir **Yardım Masası (Help Desk)** sisteminin React ile geliştirilmiş frontend uygulamasıdır.

Kullanıcı dostu bir arayüz sunar ve JWT tabanlı kimlik doğrulama ile güvenli oturum yönetimi sağlar. Kullanıcı rollerine göre (User, Support, Admin) içerikler dinamik olarak gösterilir.

İsteğe bağlı olarak admin panelinde **AG Grid** ile detaylı tablo görselleştirmeleri sunulabilir. Uygulama, ASP.NET Core Web API ile geliştirilen bir backend ile haberleşir.

### Özellikler

- Kullanıcı girişi ve kayıt (JWT ile kimlik doğrulama)
- Destek talebi (ticket) oluşturma ve listeleme
- Ticket detaylarını görme ve destek yanıtı yazma
- Rol bazlı yetki ve görünüm (User, Support, Admin)
- Admin paneli (AG Grid ile)

### Uygulama İçi Ekran Görüntüleri 

#### Kullanıcı Ekranı 
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/62bfab44-ffa3-48f4-844e-b6822d46f15f" />

#### Admin Ekranı 
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/f577b3be-dd35-408e-a475-499e6474cc8c" />

#### Destek Personeli Ekranı   
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/485bc878-a879-478e-b862-a3ff313ce511" />

#### Rapor Sayfası   
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/db802e62-0ba4-46d4-b111-3f38abc2d9b5" />

#### Admin Kategori ve Öncelik Ekleme  
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/c889a310-a850-4d38-a381-266601afc553" />

### Gereklilikler

- Node.js ve npm kurulu olmalıdır.
- Backend API çalışır durumda olmalıdır (varsayılan: `http://localhost:3000`)

### Kurulum

Aşağıdaki komutları terminalde çalıştırarak projeyi başlatabilirsiniz:

```bash
git clone https://github.com/your-username/YardimMasasi.git
cd YardimMasasi
npm install
npm start
```

Uygulamayı tarayıcıda görüntülemek için şu adrese gidin:

```
http://localhost:3000
```

---

## 🇬🇧 English

### Overview

This project is the frontend part of a **Help Desk System** built with React. It allows users to create support tickets, support agents to reply to them, and administrators to monitor and manage the entire process.

It features a user-friendly interface and secure authentication using JWT. The content and access are role-based (User, Support, Admin), and the UI dynamically adjusts accordingly.

An optional **Admin Panel** is available using AG Grid for advanced data tables. The frontend communicates with a backend RESTful API developed in ASP.NET Core Web API.

### Features

- User login and registration (JWT-based authentication)
- Create and list support tickets
- View ticket details and add support responses
- Role-based content and permission (User, Support, Admin)
- Admin dashboard with AG Grid (optional)
- Responsive mobile-friendly UI

### In-App Screenshots

User Role Screen  
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/1fcc0e58-f1e9-49bb-95f5-54c818c69381" />

Admin Role Screen  
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/ef5ab837-312c-4d6f-ad77-ad577b091b15" />

Support Role Screen  
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/1599bf04-0500-41fe-84c2-5b358f953aea" />

Report Page Screen  
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/064b6698-2df3-4675-b05d-58b8efc45d7a" />

Admin - Category and Priority Management Screen  
<img width="1728" height="989" alt="image" src="https://github.com/user-attachments/assets/3c76fea9-bc6b-4e76-b207-957c44b002f8" />

### Prerequisites

- Node.js and npm must be installed
- Backend API should be running (`http://localhost:3000` by default)

### Installation

Run the following commands in your terminal to install and launch the project:

```bash
git clone https://github.com/your-username/YardimMasasi.git
cd YardimMasasi
npm install
npm start
```

Then open the app in your browser:

```
http://localhost:3000
```
