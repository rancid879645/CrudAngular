import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CrudService {

  private endPoint = 'http://localhost:3000';

  httpHeader = {
    header: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }

  constructor(private http: HttpClient) {
    console.log("El servicio esta disponible");
   }

  getUsers(): Observable<User>{
    return this.http.get<User>(this.endPoint + '/users')
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  getUser(id:string):Observable<User>{
    return this.http.get<User>(this.endPoint + '/users/' + id)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  addUser(newUser:User):Observable<User>{
    return this.http.post<User>(this.endPoint + '/users/' + JSON.stringify(newUser), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  updateUser(id:string, data:User):Observable<User>{
    return this.http.put<User>(this.endPoint + '/users/' + id, JSON.stringify(data))
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  deleteUser(id:string){
    return this.http.delete<User>(this.endPoint + '/users/' + id)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  httpError(error:any){

    let msg:string = '';

    console.log(error);

    if (error.error instanceof ErrorEvent)
      msg = error.error.message;
    else
      msg = "Se ha presentado un error en la apliacion\n Error: ${error}"

    return throwError(msg);
  }

}

export class User{
  id!: string;
  name!: string;
  email!: string;
  phone!: string;
}