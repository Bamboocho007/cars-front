import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginPayloadDto,
  LoginResponseDto,
  RegistrationPayloadDto,
} from '../../dtos/auth.dtos';

@Injectable()
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginPayloadDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${environment.backendApi}login/`, {
      email,
      password,
    });
  }

  registration(payload: RegistrationPayloadDto): Observable<void> {
    return this.http.post<void>(
      `${environment.backendApi}registration/`,
      payload,
    );
  }
}
