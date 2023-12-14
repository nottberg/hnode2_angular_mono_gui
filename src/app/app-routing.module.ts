import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MgmtDashboardComponent } from './mgmt-dashboard/mgmt-dashboard.component';
import { Hnode2ManagementDeviceComponent } from './hnode2-management-device/hnode2-management-device.component';
import { Hnode2IrrigationDeviceComponent } from './hnode2-irrigation-device/hnode2-irrigation-device.component';
import { HnidControlsComponent } from './hnid-controls/hnid-controls.component';
import { HnidScheduleComponent } from './hnid-schedule/hnid-schedule.component';
import { HnidZonesComponent } from './hnid-zones/hnid-zones.component';
import { HnidPlacementsComponent } from './hnid-placements/hnid-placements.component';
import { HnidModifiersComponent } from './hnid-modifiers/hnid-modifiers.component';
import { HnidSequencesComponent } from './hnid-sequences/hnid-sequences.component';
import { HnidInhibitsComponent } from './hnid-inhibits/hnid-inhibits.component';
import { Hnode2TestDeviceComponent } from './hnode2-test-device/hnode2-test-device.component';
import { HnmdDevicesComponent } from './hnmd-devices/hnmd-devices.component';
import { HnmdServicesComponent } from './hnmd-services/hnmd-services.component';
import { HnmdHealthComponent } from './hnmd-health/hnmd-health.component';
import { Hnode2SlideDigitizerDeviceComponent } from './hnode2-slide-digitizer-device/hnode2-slide-digitizer-device.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mgmt-dashboard', component: MgmtDashboardComponent },
  { path: 'cluster/devices', component: HnmdDevicesComponent },
  { path: 'cluster/services', component: HnmdServicesComponent },
  { path: 'cluster/health', component: HnmdHealthComponent },
  { path: 'hnode2-management-device/:hexID', component: Hnode2ManagementDeviceComponent },
  { path: 'hnode2-irrigation-device/:hexID', component: Hnode2IrrigationDeviceComponent },
  { path: 'hnode2-irrigation-device/:hexID/controls', component: HnidControlsComponent },  
  { path: 'hnode2-irrigation-device/:hexID/schedule', component: HnidScheduleComponent },
  { path: 'hnode2-irrigation-device/:hexID/zones', component: HnidZonesComponent },
  { path: 'hnode2-irrigation-device/:hexID/placements', component: HnidPlacementsComponent },
  { path: 'hnode2-irrigation-device/:hexID/modifiers', component: HnidModifiersComponent },
  { path: 'hnode2-irrigation-device/:hexID/sequences', component: HnidSequencesComponent },
  { path: 'hnode2-irrigation-device/:hexID/inhibits', component: HnidInhibitsComponent },
  { path: 'hnode2-test-device/:hexID', component: Hnode2TestDeviceComponent },
  { path: 'hnode2-slide-digitizer-device/:hexID', component: Hnode2SlideDigitizerDeviceComponent },  
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
