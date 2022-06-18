import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catalog, CatalogGet } from '../interface/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = "https://api.solido-online.click/api/" + "roofs/";
  }

  createCatalog(catalog: any) : Observable<Catalog> {
    return this.httpClient.post<Catalog>(this.apiUrl, catalog);
  }

  getCatalog(): Observable<CatalogGet[]> {
    return this.httpClient.get<CatalogGet[]>(this.apiUrl);
  }

  deleteCatalog(id: number) {
    return this.httpClient.delete(this.apiUrl+id)
  }
}
