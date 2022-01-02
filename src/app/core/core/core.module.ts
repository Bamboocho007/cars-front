import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [LocalStorageService],
  exports: [HttpClientModule],
})
export class CoreModule {}
