import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UploadImg } from '../../interfaces/uploadImg.interface';
import { User } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private url = 'http://localhost/apiphpserver/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users.php`).pipe(
      catchError(this.handleError)
    );
  }

  /*getContactsGame(tableName: string): Observable<User> {
    return this.http.get<User>(`${this.url}${tableName}/users.php`).pipe(
      catchError(this.handleError)
    );
  }*/

  getContact(id:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users.php?id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addContact(formData: User, tableName: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<User>(`${this.url}users.php`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  uploadFile(file: UploadImg): Observable<any> {
    if (file.nameFile === "" && file.base64textString === null) {
      return throwError(() => new Error('File data is missing'));
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.url}views/img/index.php`, JSON.stringify(file), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something bad happened; please try again later.');
  }
}