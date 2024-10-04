import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contacts } from '../../interfaces/contacts.interface';
import { UploadImg } from '../../interfaces/uploadImg.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private url = 'http://localhost/apiphpserver/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get<any>(`${this.url}/index.php`).pipe(
      catchError(this.handleError)
    );
  }

  /*getContactsGame(tableName: string): Observable<any> {
    return this.http.get<any>(`${this.url}${tableName}/index.php`).pipe(
      catchError(this.handleError)
    );
  }*/

  getContact(id:string): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${this.url}/index.php?id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addContact(formData: Contacts, tableName: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.url}${tableName}/index.php`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  uploadFile(file: UploadImg): Observable<any> {
    if (file.nameFile === "" && file.base64textString === null) {
      return throwError(() => new Error('File data is missing'));
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.url}views/img/index.php`, JSON.stringify(file), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something bad happened; please try again later.');
  }
}