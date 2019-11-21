import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
/* import { ChartsModule } from 'ng2-charts'; */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './layout/main/login/login.component';
import { SignUpComponent } from './layout/main/sign-up/sign-up.component';

import { AdministratorComponent } from './layout/administrator/administrator.component';
import { PassengerComponent } from './layout/passenger/passenger.component';
import { OfficialComponent } from './layout/official/official.component';

import { NavbarPassengerComponent } from './shared/navbar/navbar-passenger/navbar-passenger.component';
import { NavbarOfficialComponent } from './shared/navbar/navbar-official/navbar-official.component';
import { NavbarAdministratorComponent } from './shared/navbar/navbar-administrator/navbar-administrator.component';

// Administrator
import { AirlineComponent } from './layout/administrator/components/airline/airline.component';
import { AirportComponent } from './layout/administrator/components/airport/airport.component';
import { FlightComponent } from './layout/administrator/components/flight/flight.component';
import { OfficialsComponent } from './layout/administrator/components/officials/officials.component';
import { ReportAdminComponent } from './layout/administrator/components/report-admin/report-admin.component';
import { WelcomeAdministratorComponent } from './layout/administrator/components/welcome-administrator/welcome-administrator.component';

// Official
import { BoardingComponent } from './layout/official/components/boarding/boarding.component';
import { ConsultInfoPassengerComponent } from './layout/official/components/consult-info-passenger/consult-info-passenger.component';
import { VerifyCheckInComponent } from './layout/official/components/verify-check-in/verify-check-in.component';
import { ReportOfficialComponent } from './layout/official/components/report-official/report-official.component';
import { WelcomeOfficialComponent } from './layout/official/components/welcome-official/welcome-official.component';

// Passenger
import { BuyTicketsComponent } from './layout/passenger/components/buy-tickets/buy-tickets.component';
import { CheckInComponent } from './layout/passenger/components/check-in/check-in.component';
import { CrudPassengerComponent } from './layout/passenger/components/crud-passenger/crud-passenger.component';
import { ReportPassengerComponent } from './layout/passenger/components/report-passenger/report-passenger.component';
import { WelcomePassengerComponent } from './layout/passenger/components/welcome-passenger/welcome-passenger.component';

// Guards -> Provider
import { AdministratorGuard, OfficialGuard, PassengerGuard } from './shared';
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


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignUpComponent,
        AdministratorComponent,
        PassengerComponent,
        OfficialComponent,
        NavbarPassengerComponent,
        NavbarOfficialComponent,
        NavbarAdministratorComponent,
        AirlineComponent,
        AirportComponent,
        FlightComponent,
        BoardingComponent,
        ConsultInfoPassengerComponent,
        VerifyCheckInComponent,
        BuyTicketsComponent,
        CheckInComponent,
        CrudPassengerComponent,
        OfficialsComponent,
        ReportAdminComponent,
        ReportPassengerComponent,
        ReportOfficialComponent,
        WelcomeOfficialComponent,
        WelcomePassengerComponent,
        WelcomeAdministratorComponent,
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
    ],
    imports: [
        /* ChartsModule, */
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        AdministratorGuard,
        OfficialGuard,
        PassengerGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
