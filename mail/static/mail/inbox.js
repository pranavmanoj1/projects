document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Ensure the form element has the correct id
  const composeForm = document.querySelector('#compose-form');
  if (composeForm) {
    composeForm.addEventListener('submit', send_email);
  } else {
    console.error('Form with id "compose-form" not found.');
  }

  // By default, load the inbox
  load_mailbox('inbox');
});


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#emails-full-view').style.display = 'none';
  

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-full-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    // Print emails

    
    emails.forEach((email) => {
      
        const element = document.createElement('div');
        element.innerHTML = `<ul class="list-group"> <li class="list-group-item"> <h4>Sender: ${email.sender}</h4>
        <h5>Subject: ${email.subject}</h4>
        <p>${email.timestamp}</p></li></ul>`;
        element.addEventListener('click', function() {
          fetch(`/emails/${email.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
          })
          view_email(email.id)
        });
        if (email.read === true) {
          element.innerHTML = `
          <ul class="list-group"> 
            <li class="list-group-item-secondary"> 
              <h4>Sender: ${email.sender} </h4>
              <h5>Subject: ${email.subject} </h4>
              <p> ${email.timestamp} </p> </li> 
          </ul>`
          ;
          
        }
        document.querySelector('#emails-view').append(element);
     
      
      
    });
    
    


    
  });
}



function send_email(event){
  //Modifies the default beheavor so it doesn't reload the page after submitting.
  event.preventDefault();

  // You’ll likely want to make a POST request to /emails, passing in values for recipients, subject, and body.
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
    })
  })
  .then(response => response.json())
  .then(result => {
      
      console.log(result);
  })

  .catch(error => {
    console.log('Error:', error);
  });


  load_mailbox('sent');
}

function view_email(id) {
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      // Print email to console
      

      // Hide other views
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#emails-full-view').style.display = 'block';

      // Create the HTML for the email view
      const emailContent = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Sender: ${email.sender}</h5>
            <h5 class="card-title">Recipients: ${email.recipients}</h5>
            <h5 class="card-title">Subject: ${email.subject}</h5>
            <p class="card-text">Body: ${email.body}</p>
            <br>
            <h10 class="card-title">${email.timestamp}</h10>
            <br>
            
          </div>
        </div>
      `;

      // Update the content of the #emails-full-view container
      document.querySelector('#emails-full-view').innerHTML = emailContent;

      const btn_archive = document.createElement('button');
      btn_archive.innerHTML = email.archived ? "Unarchive": "Archive";
      btn_archive.className = email.archived ? "btn btn-success": "btn btn-danger";
      btn_archive.addEventListener('click', function() {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: !email.archived
          })
        })
        .then(() => {
          load_mailbox('archive')
        })
        
      });
      document.querySelector('#emails-full-view').append(btn_archive);

      const btn_reply = document.createElement('button');
      btn_reply.innerHTML = "Reply";
      btn_reply.className = "btn btn-info";
      btn_reply.addEventListener('click', function() {
        compose_email()
        document.querySelector('#compose-recipients').value = email.sender;
        let subject = email.subject;
        if(subject.split('',1)[0] != "Re:"){
          subject = "Re: " + email.subject;
        }

        document.querySelector('#compose-recipients').value = email.sender;
        document.querySelector('#compose-subject').value = subject;
        document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;  
      });
      document.querySelector('#emails-full-view').append(btn_reply);

    
    });
}
