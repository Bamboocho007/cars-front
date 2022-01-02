import { NgModule } from '@angular/core';
import { AuthApiService } from './services/auth-service/auth-api.service';

@NgModule({
  providers: [AuthApiService],
})
export class ApiModule {}
