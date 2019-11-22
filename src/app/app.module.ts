import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import { ChartsModule } from 'ng2-charts';
/* import { ChartsModule } from 'ng2-charts'; */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './layout/main/login/login.component';
import { SignUpComponent } from './layout/main/sign-up/sign-up.component';

import { NavbarPassengerComponent } from './shared/navbar/navbar-passenger/navbar-passenger.component';
import { NavbarOfficialComponent } from './shared/navbar/navbar-official/navbar-official.component';
import { NavbarAdministratorComponent } from './shared/navbar/navbar-administrator/navbar-administrator.component';

// Guards -> Provider
import { UsuarioComponent } from './layout/usuario/usuario.component';
import { CuentaComponent } from './layout/usuario/components/cuenta/cuenta.component';
import { EstadisticasComponent } from './layout/usuario/components/estadisticas/estadisticas.component';
import { MenuComponent } from './layout/usuario/components/menu/menu.component';
import { AmigosComponent } from './layout/usuario/components/amigos/amigos.component';
import { OrdenComponent } from './layout/usuario/components/orden/orden.component';
import { NavbarUsuarioComponent } from './shared/navbar/navbar-usuario/navbar-usuario.component';
import { OrdenProcesoComponent } from './layout/usuario/components/orden-proceso/orden-proceso.component';
import { ChefComponent } from './layout/chef/chef.component';
import { ConfirmadasComponent } from './layout/chef/components/confirmadas/confirmadas.component';
import { NoConfirmadasComponent } from './layout/chef/components/no-confirmadas/no-confirmadas.component';
import { NavbarChefComponent } from './shared/navbar/navbar-chef/navbar-chef.component';
import { AdminMenuComponent } from './layout/admin-menu/admin-menu.component';
import { ConfigMenuComponent } from './layout/admin-menu/components/config-menu/config-menu.component';
import { NewDishComponent } from './layout/admin-menu/components/new-dish/new-dish.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AsignarRolComponent } from './layout/admin/components/asignar-rol/asignar-rol.component';
import { ConfigSistemaComponent } from './layout/admin/components/config-sistema/config-sistema.component';
import { NavbarAdminComponent } from './shared/navbar/navbar-admin/navbar-admin.component';
import { GraficasComponent } from './layout/graficas/graficas.component';

/* Guards */
import { ChefGuard, EstudianteGuard, AdminGuard, AdminMenuGuard } from './shared';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignUpComponent,
        NavbarPassengerComponent,
        NavbarOfficialComponent,
        NavbarAdministratorComponent,
        UsuarioComponent,
        CuentaComponent,
        EstadisticasComponent,
        MenuComponent,
        AmigosComponent,
        OrdenComponent,
        NavbarUsuarioComponent,
        OrdenProcesoComponent,
        ChefComponent,
        ConfirmadasComponent,
        NoConfirmadasComponent,
        NavbarChefComponent,
        AdminMenuComponent,
        ConfigMenuComponent,
        NewDishComponent,
        AdminComponent,
        AsignarRolComponent,
        ConfigSistemaComponent,
        NavbarAdminComponent,
        GraficasComponent,
    ],
    imports: [
        ChartsModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        ChefGuard,
        EstudianteGuard,
        AdminGuard,
        AdminMenuGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
