import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../interfaces/users.interface';
// import { UploadImg } from '../../interfaces/uploadImg.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private url = 'http://localhost/apiphpserver/';
  // private url = 'https://sql109.infinityfree.com/apiphpserver/';

  constructor(private http: HttpClient) { }

  // Recoge todos los contactos de la base de datos
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

  // Recoge un contacto de la base de datos por su id
  getContact(id:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users.php?id_user=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Recoge un contacto de la base de datos por su email y password
  loginContact(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users.php?email=${email}&password=${password}`).pipe(
      catchError(this.handleError)
    );
  }

  // añade un contacto a la base de datos
  addContact(formData: User): Observable<User[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(formData);
    return this.http.post<User[]>(`${this.url}users.php`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // edita un contacto de la base de datos
  editContact(formData: User): Observable<User[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(formData);
    return this.http.put<User[]>(`${this.url}users.php?id_user=${formData.id_user}`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // elimina un contacto de la base de datos
  deleteContact(id: string): Observable<User[]> {
    return this.http.delete<User[]>(`${this.url}users.php?id_user=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /*uploadFile(file: UploadImg): Observable<any> {
    if (file.nameFile === "" && file.base64textString === null) {
      return throwError(() => new Error('File data is missing'));
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.url}views/img/index.php`, JSON.stringify(file), { headers }).pipe(
      catchError(this.handleError)
    );
  }*/

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}