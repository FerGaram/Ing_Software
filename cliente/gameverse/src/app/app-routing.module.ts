import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SnakeComponent } from './components/snake/snake.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
     {
        path: 'productos',
        component: ProductosComponent,
      },
      {
        path: 'snake',
        component: SnakeComponent
      }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
