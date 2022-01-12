import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [LocalStorageService],
  exports: [HttpClientModule],
})
export class CoreModule {}
