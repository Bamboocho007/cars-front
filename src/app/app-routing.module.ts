import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Injectable()
export class TestService {
  constructor() {
    console.log('TestService');
  }
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TestService],
})
export class AppRoutingModule {
  constructor(private testService: TestService) {}
}
