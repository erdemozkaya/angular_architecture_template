import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"",
    children:[
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { breadcrumb: "Anasayfa" },
      },
      {
        path: "test",
        loadChildren: () =>
           import("../test/test.module").then((m) => m.TestModule),
        data: { breadcrumb: "Test" },
        //canLoad: [AuthGuard]
      },
      {
        path: "**",
        redirectTo: "dashboard",
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
