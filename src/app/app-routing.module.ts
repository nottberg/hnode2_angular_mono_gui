import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MgmtDashboardComponent } from './mgmt-dashboard/mgmt-dashboard.component';
import { Hnode2ManagementDeviceComponent } from './hnode2-management-device/hnode2-management-device.component';
import { Hnode2IrrigationDeviceComponent } from './hnode2-irrigation-device/hnode2-irrigation-device.component';
import { HnidScheduleComponent } from './hnid-schedule/hnid-schedule.component';
import { HnidZonesComponent } from './hnid-zones/hnid-zones.component';
import { HnidPlacementsComponent } from './hnid-placements/hnid-placements.component';
import { HnidModifiersComponent } from './hnid-modifiers/hnid-modifiers.component';
import { Hnode2TestDeviceComponent } from './hnode2-test-device/hnode2-test-device.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mgmt-dashboard', component: MgmtDashboardComponent },
  { path: 'hnode2-management-device/:crc32ID', component: Hnode2ManagementDeviceComponent },
  { path: 'hnode2-irrigation-device/:crc32ID', component: Hnode2IrrigationDeviceComponent },
  { path: 'hnode2-irrigation-device/:crc32ID/schedule', component: HnidScheduleComponent },
  { path: 'hnode2-irrigation-device/:crc32ID/zones', component: HnidZonesComponent },
  { path: 'hnode2-irrigation-device/:crc32ID/placements', component: HnidPlacementsComponent },
  { path: 'hnode2-irrigation-device/:crc32ID/modifiers', component: HnidModifiersComponent },
  { path: 'hnode2-test-device/:crc32ID', component: Hnode2TestDeviceComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
