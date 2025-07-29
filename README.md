# ShedulNA

**ShedulNA** is an AI-powered web platform designed to streamline appointment scheduling and messaging between international students and university admissions teams. Built for ease of use and accessibility, ShedulNA helps students book sessions, receive automated reminders, and get instant answers to common questions via AI chatbot support.

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Dependencies](#dependencies)

## Features

* **Student Booking System:** Students can create, view, and manage their appointments with admissions officers.
* **Admin Dashboard:** Admissions staff can view, confirm, and manage incoming appointment requests.
* **AI Chatbot Integration:** Offers real-time responses to frequently asked questions using OpenAI.
* **Messaging Support:** Sends confirmations and reminders via Email and WhatsApp using Nodemailer and Twilio.
* **Responsive Design:** Built with Tailwind CSS and ShadCN for a clean, mobile-friendly interface.
* **Zoom Integration:** Automatically generates and sends meeting links via Zoom API.
* **Authentication:** Secure role-based login for students and administrators using Firebase Auth.

## Installation

To get started with ShedulNA, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/shedulna.git
cd shedulna
npm install
```

## Usage

To start the development server:

```bash
npm run dev
```

Ensure you’ve set up your `.env` file with your Firebase, Twilio, Zoom, and OpenAI credentials before running.

## Dependencies

ShedulNA uses modern technologies across the stack, including:

* **Next.js** – React framework for SSR and routing
* **Tailwind CSS** – Utility-first CSS styling
* **Firebase** – Authentication and Firestore database
* **OpenAI** – AI-based chatbot functionality
* **Twilio + Nodemailer** – Messaging via WhatsApp and Email
* **Zoom API** – Video meeting automation
* **React Hook Form + Zod** – Form handling and validation
* **TypeScript** – Static typing for safer code

For a full list of packages, see `package.json`.