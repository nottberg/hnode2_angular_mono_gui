import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MgmtDashboardComponent } from './mgmt-dashboard/mgmt-dashboard.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { Hnode2IrrigationDeviceComponent } from './hnode2-irrigation-device/hnode2-irrigation-device.component';
import { Hnode2TestDeviceComponent } from './hnode2-test-device/hnode2-test-device.component';
import { Hnode2ManagementDeviceComponent } from './hnode2-management-device/hnode2-management-device.component';
import { HnidScheduleComponent } from './hnid-schedule/hnid-schedule.component';
import { HnidZonesComponent } from './hnid-zones/hnid-zones.component';
import { HnidZoneEditDialogComponent } from './hnid-zone-edit-dialog/hnid-zone-edit-dialog.component';
import { HnidConfirmDialogComponent } from './hnid-confirm-dialog/hnid-confirm-dialog.component';
import { HnidPlacementEditDialogComponent } from './hnid-placement-edit-dialog/hnid-placement-edit-dialog.component';
import { HnidPlacementsComponent } from './hnid-placements/hnid-placements.component';
import { HnidModifiersComponent } from './hnid-modifiers/hnid-modifiers.component';
import { HnidModifiersEditDialogComponent } from './hnid-modifiers-edit-dialog/hnid-modifiers-edit-dialog.component';
import { HnidSequencesComponent } from './hnid-sequences/hnid-sequences.component';
import { HnidSequenceEditDialogComponent } from './hnid-sequence-edit-dialog/hnid-sequence-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    MgmtDashboardComponent,
    Hnode2IrrigationDeviceComponent,
    Hnode2TestDeviceComponent,
    Hnode2ManagementDeviceComponent,
    HnidScheduleComponent,
    HnidZonesComponent,
    HnidZoneEditDialogComponent,
    HnidConfirmDialogComponent,
    HnidPlacementEditDialogComponent,
    HnidPlacementsComponent,
    HnidModifiersComponent,
    HnidModifiersEditDialogComponent,
    HnidSequencesComponent,
    HnidSequenceEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
