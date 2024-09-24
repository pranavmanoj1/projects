# Email Management Application

## Overview

This project is a web-based email client that allows users to manage their inbox, sent emails, and archived emails. It provides a range of functionalities, such as sending new emails, viewing email content, archiving/unarchiving emails, and replying to received emails. The application interacts with a backend API to handle email data.

## Features

1. **Send Mail**  
   When a user submits the email composition form, a POST request is made to `/emails`. The form collects the following data:
   - Recipients
   - Subject
   - Email Body

   After the email is successfully sent, the user’s **Sent** mailbox is automatically loaded.

2. **Mailbox View**  
   Users can navigate between three different mailboxes: **Inbox**, **Sent**, and **Archive**. Each mailbox shows the relevant emails, and the system distinguishes between read and unread emails with background colors:
   - **Unread emails** have a white background.
   - **Read emails** have a gray background.
   
   Emails in the mailbox view display the following details:
   - Sender
   - Subject
   - Timestamp

3. **View Email**  
   When a user clicks on an email in any mailbox, they are taken to a detailed view of the email, where the following information is shown:
   - Sender
   - Recipients
   - Subject
   - Timestamp
   - Body

   The email is automatically marked as read by making a `PUT` request to `/emails/<email_id>`.

4. **Archive/Unarchive Emails**  
   Users can archive or unarchive received emails by clicking a button when viewing an email. Archiving is not applicable to emails in the Sent mailbox. Once an email is archived or unarchived, the user’s inbox is reloaded.

   - To archive/unarchive an email, a `PUT` request is made to `/emails/<email_id>` to update the email’s archived status.

5. **Reply to Emails**  
   Users can reply to an email by clicking the **Reply** button. This action will take the user to the email composition form, which will be pre-filled with:
   - The original sender as the recipient.
   - The subject, prefixed with `Re:`, unless it already starts with `Re:`.
   - A quoted version of the original message in the body, along with a timestamp of when the email was sent.

## API Endpoints

- `POST /emails`  
   Used for sending new emails.

- `GET /emails/<mailbox>`  
   Fetches emails from the selected mailbox (Inbox, Sent, Archive).

- `GET /emails/<email_id>`  
   Retrieves details of a specific email.

- `PUT /emails/<email_id>`  
   Updates the status of an email (read, archived, etc.).

## Implementation Details

- **Sending Emails**: The email composition form submits the data via a `POST` request to `/emails`. Once the request is successful, the sent mailbox is automatically loaded using a `GET` request to `/emails/sent`.
  
- **Mailbox Rendering**: Each mailbox is rendered dynamically based on the data fetched via a `GET` request to `/emails/<mailbox>`. Emails are rendered as individual `div` elements, with their appearance differing based on their read/unread status.
  
- **Viewing Emails**: When an email is clicked, a `GET` request to `/emails/<email_id>` fetches its details, and the email view is updated to show the content. The email is marked as read using a `PUT` request.

- **Archiving**: Users can archive or unarchive emails via a button in the email view. This action triggers a `PUT` request to `/emails/<email_id>`, updating the archive status, followed by reloading the inbox.

- **Replying to Emails**: Upon clicking **Reply**, the email composition form is pre-filled with data from the original email using JavaScript. The recipient, subject, and body are automatically set.

## Technologies Used

- **Frontend**: JavaScript, HTML, CSS
- **Backend API**: The application communicates with an external API that handles email storage, retrieval, and updates.

## Setup

1. Clone the repository.
2. Open `index.html` in your browser to launch the application.
3. Ensure the backend API is running and accessible.

## Future Improvements

- Implement user authentication.
- Add pagination for large inboxes.
- Support for rich text in the email body.
