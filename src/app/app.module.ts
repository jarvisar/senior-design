import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fromEventPattern } from 'rxjs';
import { PageComponent } from './page/page.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputbarComponent } from './inputbar/inputbar.component';
import { ExoplanetComponent } from './exoplanet/exoplanet.component';
import { HelpboxComponent } from './helpbox/helpbox.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    InputbarComponent,
    ExoplanetComponent,
    HelpboxComponent
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
    MatIconModule
  ],
  providers: [HelpboxComponent, MatDialog, ExoplanetComponent, InputbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){console.log("test!!!")}
  
}

