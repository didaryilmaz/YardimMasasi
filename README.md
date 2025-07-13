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

### Uygulama İçi Ekran Görüntüleri / In-App Screenshots

#### Kullanıcı Ekranı / User Role Screen  
<img width="281" height="210" alt="User Screen" src="https://github.com/user-attachments/assets/07f8ae9e-1eab-4521-8467-38c11aaba790" />

#### Admin Ekranı / Admin Role Screen  
<img width="279" height="208" alt="Admin Screen" src="https://github.com/user-attachments/assets/29f3b3de-ab34-40b1-9870-50285a3a8857" />

#### Destek Personeli Ekranı / Support Role Screen  
<img width="250" height="187" alt="Support Screen" src="https://github.com/user-attachments/assets/f7fcdc02-5942-4758-9493-92413b8bb769" />

#### Rapor Sayfası / Report Page Screen  
<img width="251" height="188" alt="Report Screen" src="https://github.com/user-attachments/assets/e6631299-2213-4b94-be50-44a9c00a0520" />

#### Admin Kategori ve Öncelik Ekleme / Admin - Category and Priority Management  
<img width="252" height="188" alt="Category and Priority" src="https://github.com/user-attachments/assets/ef632afb-a3a5-481f-ab96-9d3ba3092761" />

### Gereklilikler

- Node.js ve npm kurulu olmalıdır.
- Backend API çalışır durumda olmalıdır (varsayılan: `http://localhost:5000`)

### Kurulum

Aşağıdaki komutları terminalde çalıştırarak projeyi başlatabilirsiniz:

```bash
git clone https://github.com/your-username/helpdesk-frontend.git
cd helpdesk-frontend
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
<img width="281" height="210" alt="image" src="https://github.com/user-attachments/assets/07f8ae9e-1eab-4521-8467-38c11aaba790" />

Admin Role Screen  
<img width="279" height="208" alt="image" src="https://github.com/user-attachments/assets/29f3b3de-ab34-40b1-9870-50285a3a8857" />

Support Role Screen  
<img width="250" height="187" alt="image" src="https://github.com/user-attachments/assets/f7fcdc02-5942-4758-9493-92413b8bb769" />

Report Page Screen  
<img width="251" height="188" alt="image" src="https://github.com/user-attachments/assets/e6631299-2213-4b94-be50-44a9c00a0520" />

Admin - Category and Priority Management Screen  
<img width="252" height="188" alt="image" src="https://github.com/user-attachments/assets/ef632afb-a3a5-481f-ab96-9d3ba3092761" />

### Prerequisites

- Node.js and npm must be installed
- Backend API should be running (`http://localhost:5000` by default)

### Installation

Run the following commands in your terminal to install and launch the project:

```bash
git clone https://github.com/your-username/helpdesk-frontend.git
cd helpdesk-frontend
npm install
npm start
```

Then open the app in your browser:

```
http://localhost:3000
```
