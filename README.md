# 🎟️ TicketflowAI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

## 🌟 Overview

**TicketFlowAI** is a web application that helps manage tech support tickets to streamline an IT department helpdesk environment. It is comprised of two parts, and this is the front end. TicketFlowAI connects to AWS AI services such as Comprehend and Bedrock to classify ticket priority, complexity, and the need for human interaction according to a model trained on custom data from each company. It can also provide automated answers for simple queries that don't need human interaction based on custom documentation from each company.

## 🚀 Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 🛠️ Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## 🏗️ Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 🧪 Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## 🔍 Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## 📚 Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🗂️ Back End

The back-end for this implementation is available in a different repository: [TicketFlowAI Back End](https://github.com/TicketFlowAI/serviciosTicketFlow). We recommend using both of them together but if you wish to build your own front end you may do so. We provide Swagger documentation at the route `/api/documentation` of your installation.

## 🔒 Security Vulnerabilities

If you discover a security vulnerability within TicketFlowAI, please send an e-mail to the team via vulnerabilities@ticketflowai.com. All security vulnerabilities will be promptly addressed.

## 📄 License

The TicketFlowAI framework is open-sourced software licensed under the MIT license. We provide a free license in good faith, but for teams larger than 7 people, we recommend contacting us at info@ticketflowai.com to set up a demo as a SAAS solution.

## ⚙️ Node.js Version

We recommend using Node.js version 20 or greater to run this project.

## 📦 Deployment

To deploy the project, follow these steps:

1. Clone the project:
   ```bash
   git clone https://github.com/TicketFlowAI/ticketflow-frontend.git
   cd ticketflow-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. If you have any outdated packages, we recommend using:
   ```bash
   npm audit fix
   ```
   **Note:** Do not use `--force` as it may break your installation.

4. For development mode, run:
   ```bash
   ng serve
   ```
   This will start a dev server and update your changes in real time.

5. For production, build the project:
   ```bash
   ng build
   ```
   This will create all necessary production-ready files in the `dist/` directory.

6. If running in production, point your server to the `dist/` directory.

## 🔧 Configuring Back-End URL

To set up the route to the back-end deployment, navigate to `/src/environments` and configure the URL in both `environment.ts` and `environment.development.ts` files so that it points to your installation of the back end.
