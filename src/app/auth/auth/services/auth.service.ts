import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginPayloadDto,
  LoginResponseDto,
  RegistrationPayloadDto,
} from 'src/app/api/dtos/auth.dtos';
import { AuthApiService } from 'src/app/api/services/auth-service/auth-api.service';

@Injectable()
export class AuthService {
  constructor(private authApiService: AuthApiService) {}

  login(formValue: LoginPayloadDto): Observable<LoginResponseDto> {
    return this.authApiService.login(formValue);
  }

  registration(formValue: RegistrationPayloadDto): Observable<void> {
    return this.authApiService.registration(formValue);
  }
}
