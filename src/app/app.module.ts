import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputbarComponent } from './inputbar/inputbar.component';
import { ExoplanetComponent } from './exoplanet/exoplanet.component';
import { HelpboxComponent } from './helpbox/helpbox.component';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LoadingInterceptor } from './loading-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableComponent } from './table/table.component'; 
import { MatTableModule } from '@angular/material/table';
import { SortDirective } from './directive/sort.directive';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExodetailComponent } from './exodetail/exodetail.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { SecretComponent } from './secret/secret.component';
import { MaterialElevationDirective } from './material-elevation.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SafePipe } from './safe.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { AngularTwitterTimelineModule } from 'angular-twitter-timeline';
import { ResizableDirective } from './resizable.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    InputbarComponent,
    ExoplanetComponent,
    HelpboxComponent,
    TableComponent,
    SortDirective,
    ExodetailComponent,
    SecretComponent,
    MaterialElevationDirective,
    SafePipe,
    SettingsDialogComponent,
    NewsDialogComponent,
    ResizableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    CdkTableModule,
    ScrollingModule,
    AngularTwitterTimelineModule,
    MatCheckboxModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    HelpboxComponent, MatDialog, ExoplanetComponent, InputbarComponent, MatPaginatorModule, SettingsDialogComponent, NewsDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

