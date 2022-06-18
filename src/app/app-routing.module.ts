import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCatalogsComponent } from './admin-tools/admin-catalogs/admin-catalogs.component';
import { CreateCatalogComponent } from './admin-tools/admin-catalogs/create-catalog/create-catalog.component';
import { AdminContactComponent } from './admin-tools/admin-contact/admin-contact.component';
import { AdminFormComponent } from './admin-tools/admin-form/admin-form.component';
import { AdminMainComponent } from './admin-tools/admin-main/admin-main.component';
import { AdminProfileComponent } from './admin-tools/admin-profile/admin-profile.component';
import { IsAuhtGuardService } from './admin-tools/is-auht.guard.service';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { ContactComponent } from './contact/contact.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "catalog", component: CatalogsComponent},
  {path: "contacts", component: ContactComponent},
  {path: "admin", component: AdminFormComponent, children: [
    {
      path: "main", component: AdminMainComponent, canActivate: [IsAuhtGuardService]
    },
    {
      path: "contact", component: AdminContactComponent, canActivate: [IsAuhtGuardService]
    },
    {
      path: "catalog", component: AdminCatalogsComponent, canActivate: [IsAuhtGuardService]
    },
    {
      path: 'catalog/create', component: CreateCatalogComponent, canActivate: [IsAuhtGuardService]
    },
    {
      path: "profile", component: AdminProfileComponent, canActivate: [IsAuhtGuardService]
    }
  ]},
  {path: "**", component: EmptyPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
