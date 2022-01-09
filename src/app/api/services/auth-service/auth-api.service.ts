import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginPayloadDto, RegistrationPayloadDto } from '../../dtos/auth.dtos';

@Injectable()
export class AuthApiService {
  constructor(private http: HttpClient) {}

  // set access_token via cookies
  login({ email, password }: LoginPayloadDto): Observable<'OK'> {
    return this.http.post<'OK'>(
      `${environment.backendApi}auth/login/`,
      {
        email,
        password,
      },
      {
        responseType: 'text' as any,
        withCredentials: true,
      },
    );
  }

  // delete cookies access_token
  logOut(): Observable<'OK'> {
    return this.http.post<'OK'>(`${environment.backendApi}auth/logOut/`, {});
  }

  registration(payload: RegistrationPayloadDto): Observable<void> {
    return this.http.post<void>(
      `${environment.backendApi}registration/`,
      payload,
    );
  }
}
