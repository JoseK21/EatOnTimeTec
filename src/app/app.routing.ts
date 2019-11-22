import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// Main Routers
import { LoginComponent } from './layout/main/login/login.component';
import { SignUpComponent } from './layout/main/sign-up/sign-up.component';

// Guards
import { EstudianteGuard, AdminGuard, AdminMenuGuard, ChefGuard } from './shared/guard';

/* Usuario */
import { MenuComponent } from './layout/usuario/components/menu/menu.component';
import { OrdenComponent } from './layout/usuario/components/orden/orden.component';
import { EstadisticasComponent } from './layout/usuario/components/estadisticas/estadisticas.component';
import { AmigosComponent } from './layout/usuario/components/amigos/amigos.component';
import { CuentaComponent } from './layout/usuario/components/cuenta/cuenta.component';
import { UsuarioComponent } from './layout/usuario/usuario.component';
import { OrdenProcesoComponent } from './layout/usuario/components/orden-proceso/orden-proceso.component';

/* Chef */
import { ChefComponent } from './layout/chef/chef.component';
import { NoConfirmadasComponent } from './layout/chef/components/no-confirmadas/no-confirmadas.component';
import { ConfirmadasComponent } from './layout/chef/components/confirmadas/confirmadas.component';

/* Admin Menu */
import { AdminMenuComponent } from './layout/admin-menu/admin-menu.component';
import { ConfigMenuComponent } from './layout/admin-menu/components/config-menu/config-menu.component';
import { NewDishComponent } from './layout/admin-menu/components/new-dish/new-dish.component';

/* Admin */
import { AdminComponent } from './layout/admin/admin.component';
import { AsignarRolComponent } from './layout/admin/components/asignar-rol/asignar-rol.component';
import { ConfigSistemaComponent } from './layout/admin/components/config-sistema/config-sistema.component';

// Routes
const routes: Routes = [
    // Redirect
    { path: '', redirectTo: 'inicio_sesion', pathMatch: 'full' },
    { path: 'admin', redirectTo: 'admin/estadisticas', pathMatch: 'full' },
    { path: 'admin_menu', redirectTo: 'admin/config_menu', pathMatch: 'full' },
    { path: 'usuario', redirectTo: 'usuario/menu', pathMatch: 'full' },
    { path: 'chef', redirectTo: 'chef/no_confirmadas', pathMatch: 'full' },

    /* Login:main & SignUp */
    { path: 'inicio_sesion', component: LoginComponent },
    { path: 'registro', component: SignUpComponent },

    /* Usuario */
    {
        path: 'usuario',
        component: UsuarioComponent,
        children: [
            { path: 'menu', component: MenuComponent, canActivate: [EstudianteGuard] },
            { path: 'orden', component: OrdenComponent, canActivate: [EstudianteGuard] },
            { path: 'orden_proceso', component: OrdenProcesoComponent, canActivate: [EstudianteGuard] },
            { path: 'estadisticas', component: EstadisticasComponent, canActivate: [EstudianteGuard] },
            { path: 'amigos', component: AmigosComponent, canActivate: [EstudianteGuard] },
            { path: 'cuenta', component: CuentaComponent, canActivate: [EstudianteGuard] },
        ],
         canActivate: [EstudianteGuard]
    },

    /* Administrador */
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AdminGuard] },
            { path: 'asignar_rol', component: AsignarRolComponent, canActivate: [AdminGuard] },
            { path: 'config_sistema', component: ConfigSistemaComponent, canActivate: [AdminGuard] }
        ],
        canActivate: [AdminGuard]
    },
    
    /* AdminMenu */
    {
        path: 'admin_menu',
        component: AdminMenuComponent,
        children: [
            { path: 'config_menu', component: ConfigMenuComponent, canActivate: [AdminMenuGuard] },
            { path: 'new_dish', component: NewDishComponent, canActivate: [AdminMenuGuard] },
        ],
        canActivate: [AdminMenuGuard]
    },

    /* Chef */
    {
        path: 'chef',
        component: ChefComponent,
        children: [
            { path: 'no_confirmadas', component: NoConfirmadasComponent, canActivate: [ChefGuard] },
            { path: 'confirmadas', component: ConfirmadasComponent, canActivate: [ChefGuard] },
        ],
        canActivate: [ChefGuard]
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
