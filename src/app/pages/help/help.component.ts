import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  // constructor (private http: HttpClient) {}

  // sendEmail() {
  //   const name = (document.querySelector('[name="name"]') as HTMLInputElement).value;
  //   const email = (document.querySelector('[name="email"]') as HTMLInputElement).value;
  //   const message = (document.querySelector('[name="message"]') as HTMLInputElement).value;

  //   const url = '../../../send-email.php'
  //   const body = { name, email, message};

  //   this.http.post(url, body).subscribe(
  //     () => {
  //       alert('Email sent successfully!');
  //     },
  //     error => {
  //       console.error(error);
  //       alert('error sending mail');
  //     }
  //   );
  // }
}
