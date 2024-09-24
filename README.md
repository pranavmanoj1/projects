# Mail: A Web-based Email Client

## Overview

This project is a web-based email client built with Django for the backend and JavaScript for the frontend. The application allows users to send, receive, and manage emails through a simple interface. It provides functionalities such as viewing inbox, sent mail, and archived mail, composing new emails, and replying to existing emails. API endpoints are used for interacting with the email data stored in the application’s database.

## Features

### 1. **Send Email**
   Users can compose and send emails using the provided form. A POST request is made to `/emails` to send the email, and the sent mailbox is loaded once the email is successfully sent.

### 2. **View Mailboxes**
   The app supports three main mailboxes:
   - **Inbox**: Displays all received emails.
   - **Sent**: Displays all sent emails.
   - **Archive**: Displays archived emails.
   
   Each mailbox is populated by sending a GET request to `/emails/<mailbox>`. Emails are displayed in reverse chronological order, with unread emails having a white background and read emails having a gray background.

### 3. **View Email Details**
   Clicking on any email in a mailbox shows the full details of that email, including:
   - Sender
   - Recipients
   - Subject
   - Timestamp
   - Email body
   
   This is done by sending a GET request to `/emails/<email_id>`. The email is marked as read once it is opened by making a PUT request to `/emails/<email_id>`.

### 4. **Archive/Unarchive Emails**
   Users can archive emails from their inbox and unarchive them when viewing archived mail. The archive status of an email can be changed using a PUT request to `/emails/<email_id>`. The inbox is reloaded after an email is archived or unarchived.

### 5. **Reply to Emails**
   Users can reply to an email by clicking the **Reply** button. The compose form is pre-filled with:
   - The original sender as the recipient.
   - The subject line prefixed with `Re:`.
   - The body of the original email as a quoted message.

## API Endpoints

- **GET /emails/<mailbox>**  
  Fetches all emails in a specified mailbox (inbox, sent, archive).

- **GET /emails/<email_id>**  
  Retrieves details of a specific email.

- **POST /emails**  
  Sends a new email. Requires `recipients`, `subject`, and `body`.

- **PUT /emails/<email_id>**  
  Updates the status of an email, including marking it as read or changing its archived status.

## Technologies Used

- **Backend**: Django
- **Frontend**: JavaScript, HTML, CSS
- **Database**: SQLite (configured through Django)

## Setup Instructions

1. **Download the Code**  
   Clone the repository and unzip it to your desired directory.

2. **Install Dependencies**  
   Install Django and any other dependencies with `pip install -r requirements.txt`.

3. **Run Database Migrations**  
   Initialize the database with the following commands:
   ```bash
   python manage.py makemigrations mail
   python manage.py migrate
4. python manage.py runserver
