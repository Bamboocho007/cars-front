import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  LoginPayloadDto,
  RegistrationPayloadDto,
} from 'src/app/api/dtos/auth.dtos';
import { AuthApiService } from 'src/app/api/services/auth-service/auth-api.service';
import { LocalStorageService } from 'src/app/core/core/services/local-storage/local-storage.service';

@Injectable()
export class AuthService {
  constructor(
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService,
  ) {}

  login(formValue: LoginPayloadDto): Observable<'OK'> {
    return this.authApiService
      .login(formValue)
      .pipe(tap(() => this.localStorageService.setObj('authorized', true)));
  }

  logOut() {
    return this.authApiService
      .logOut()
      .pipe(tap(() => this.localStorageService.setObj('authorized', false)));
  }

  registration(formValue: RegistrationPayloadDto): Observable<void> {
    return this.authApiService.registration(formValue);
  }
}
