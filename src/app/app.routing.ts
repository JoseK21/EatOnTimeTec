import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// Defaul Template
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

// Main Routers
import { LoginComponent } from './layout/main/login/login.component';
import { SignUpComponent } from './layout/main/sign-up/sign-up.component';
import { AdministratorComponent } from './layout/administrator/administrator.component';
import { OfficialComponent } from './layout/official/official.component';
import { PassengerComponent } from './layout/passenger/passenger.component';

// Clildren Routers
// Admin
import { AirlineComponent } from './layout/administrator/components/airline/airline.component';
import { AirportComponent } from './layout/administrator/components/airport/airport.component';
import { FlightComponent } from './layout/administrator/components/flight/flight.component';
import { ReportAdminComponent } from './layout/administrator/components/report-admin/report-admin.component';
import { OfficialsComponent } from './layout/administrator/components/officials/officials.component';
import { WelcomeAdministratorComponent } from './layout/administrator/components/welcome-administrator/welcome-administrator.component';

// Official
import { BoardingComponent } from './layout/official/components/boarding/boarding.component';
import { ConsultInfoPassengerComponent } from './layout/official/components/consult-info-passenger/consult-info-passenger.component';
import { ReportOfficialComponent } from './layout/official/components/report-official/report-official.component';
import { VerifyCheckInComponent } from './layout/official/components/verify-check-in/verify-check-in.component';
import { WelcomeOfficialComponent } from './layout/official/components/welcome-official/welcome-official.component';

// Passenger
import { BuyTicketsComponent } from './layout/passenger/components/buy-tickets/buy-tickets.component';
import { CheckInComponent } from './layout/passenger/components/check-in/check-in.component';
import { CrudPassengerComponent } from './layout/passenger/components/crud-passenger/crud-passenger.component';
import { ReportPassengerComponent } from './layout/passenger/components/report-passenger/report-passenger.component';
import { WelcomePassengerComponent } from './layout/passenger/components/welcome-passenger/welcome-passenger.component';

// Guards
import { OfficialGuard, PassengerGuard, AdministratorGuard } from './shared/guard';
import { MenuComponent } from './layout/usuario/components/menu/menu.component';
import { OrdenComponent } from './layout/usuario/components/orden/orden.component';
import { EstadisticasComponent } from './layout/usuario/components/estadisticas/estadisticas.component';
import { AmigosComponent } from './layout/usuario/components/amigos/amigos.component';
import { CuentaComponent } from './layout/usuario/components/cuenta/cuenta.component';
import { UsuarioComponent } from './layout/usuario/usuario.component';
import { OrdenProcesoComponent } from './layout/usuario/components/orden-proceso/orden-proceso.component';

// Routes
const routes: Routes = [
    // Redict 
    { path: '', redirectTo: 'inicio_sesion', pathMatch: 'full' },
    { path: 'administrator', redirectTo: 'administrator/welcome', pathMatch: 'full' },
    { path: 'usuario', redirectTo: 'usuario/menu', pathMatch: 'full' },
    { path: 'official', redirectTo: 'official/welcome', pathMatch: 'full' },

    /* Login:main & SignUp */
    { path: 'inicio_sesion', component: LoginComponent },
    { path: 'registro', component: SignUpComponent },


    /* Users */
    {
        path: 'usuario',
        component: UsuarioComponent,
        children: [
            { path: 'menu', component: MenuComponent,/*  canActivate: [AdministratorGuard] */ },
            { path: 'orden', component: OrdenComponent,/*  canActivate: [AdministratorGuard] */  },
            { path: 'orden_proceso', component: OrdenProcesoComponent,/*  canActivate: [AdministratorGuard] */  },
            { path: 'estadisticas', component: EstadisticasComponent,/*  canActivate: [AdministratorGuard] */  },
            { path: 'amigos', component: AmigosComponent,/*  canActivate: [AdministratorGuard] */  },
            { path: 'cuenta', component: CuentaComponent,/*  canActivate: [AdministratorGuard] */  },
        ],
       /*  canActivate: [AdministratorGuard] */
    },

    /* Users */
    {
        path: 'administrator',
        component: AdministratorComponent,
        children: [
            { path: 'airline', component: AirlineComponent, canActivate: [AdministratorGuard] },
            { path: 'airport', component: AirportComponent, canActivate: [AdministratorGuard]  },
            { path: 'flight', component: FlightComponent, canActivate: [AdministratorGuard]  },
            { path: 'official', component: OfficialsComponent, canActivate: [AdministratorGuard]  },
            { path: 'report', component: ReportAdminComponent, canActivate: [AdministratorGuard]  },
            { path: 'welcome', component: WelcomeAdministratorComponent, canActivate: [AdministratorGuard]  }
        ],
        canActivate: [AdministratorGuard]
    },
    {
        path: 'passenger',
        component: PassengerComponent,
        children: [
            { path: 'tickets', component: BuyTicketsComponent, /* canActivate: [PassengerGuard]  */},
            { path: 'checkIn', component: CheckInComponent, /* canActivate: [PassengerGuard]  */},
            { path: 'passenger', component: CrudPassengerComponent , /* canActivate: [PassengerGuard]  */},
            { path: 'report', component: ReportPassengerComponent , /* canActivate: [PassengerGuard]  */},
            { path: 'welcome', component: WelcomePassengerComponent, /* canActivate: [PassengerGuard]  */}
        ],
       // canActivate: [PassengerGuard]
    },
    {
        path: 'official',
        component: OfficialComponent,
        children: [
            { path: 'boarding', component: BoardingComponent, canActivate: [OfficialGuard] },
            { path: 'consultPassenger', component: ConsultInfoPassengerComponent, canActivate: [OfficialGuard] },
            { path: 'report', component: ReportOfficialComponent, canActivate: [OfficialGuard] },
            { path: 'verify', component: VerifyCheckInComponent, canActivate: [OfficialGuard] },
            { path: 'welcome', component: WelcomeOfficialComponent, canActivate: [OfficialGuard] }
        ],
        canActivate: [OfficialGuard]
    }
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
