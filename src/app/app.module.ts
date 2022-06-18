import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ContactComponent } from './contact/contact.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { MainComponent } from './main/main.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { AdminFormComponent } from './admin-tools/admin-form/admin-form.component';
import { AdminMainComponent } from './admin-tools/admin-main/admin-main.component';
import { AdminContactComponent } from './admin-tools/admin-contact/admin-contact.component';
import { AdminCatalogsComponent } from './admin-tools/admin-catalogs/admin-catalogs.component';
import { AdminProfileComponent } from './admin-tools/admin-profile/admin-profile.component';
import { CreateCatalogComponent } from './admin-tools/admin-catalogs/create-catalog/create-catalog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './admin-tools/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    CatalogsComponent,
    MainComponent,
    EmptyPageComponent,
    AdminFormComponent,
    AdminMainComponent,
    AdminContactComponent,
    AdminCatalogsComponent,
    AdminProfileComponent,
    CreateCatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
