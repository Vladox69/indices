import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Alimentador } from '../modelos/alimentador.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IndicesService {

  constructor(private httpClient: HttpClient) {}

  url: string = 'http://172.20.35.10:7001/WSIServices/rest/api_rest/';

  listarAlimentadores(): Observable<Alimentador[]> {
    return this.httpClient.get<Alimentador[]>(this.url+ 'listarAlimentadores');
  }

  listarCausasCambio(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listarCausasCambio');
  }

  listarCatInterrupciones(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listarCatInterrupciones');
  }

  async addAlimentador(alimentador:any): Promise<Observable<any>> {
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("addAlimentador", alimentador, {'headers':headers});
  }

}
