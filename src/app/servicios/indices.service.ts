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

  //Provincias
  listarProvincias(): Observable<any[]> {
    return this.httpClient.get<[]>(this.url+ 'listarProvincias');
  }

  //Cantones
  listarCantones(): Observable<any[]> {
    return this.httpClient.get<[]>(this.url+ 'listarCantones');
  }

  //Alimentadores
  listarAlimentadores(): Observable<Alimentador[]> {
    return this.httpClient.get<Alimentador[]>(this.url+ 'listarAlimentadores');
  }

  async addAlimentador(alimentador:any): Promise<Observable<any>> {
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post(this.url +"addAlimentador", alimentador, {'headers':headers});
  }

  deleteAlimentador(codigoAlimentador:any):Observable<any>{
    return this.httpClient.delete(this.url+"deleteAlimentador/"+codigoAlimentador)
  }

  //Causas cambio
  listarCausasCambio(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listarCausasCambio');
  }

  async addCausaFallo(causaFallo:any):Promise<Observable<any>>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post(this.url +"addCausa", causaFallo, {'headers':headers});
  }

  deleteCausaFallo(codigoCausaFallo:any):Observable<any>{
    return this.httpClient.delete(this.url+"deleteCausa/"+codigoCausaFallo)
  }

  //Catalogo interripciones
  listarCatInterrupciones(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listarCatInterrupciones');
  }

  async addCatInterrupcion(catInterrupcion:any):Promise<Observable<any>>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post(this.url +"addCatInterrupcion", catInterrupcion, {'headers':headers});
  }

  deleteCatInterrupcion(codigoCatInterrupcion:any):Observable<any>{
    return this.httpClient.delete(this.url+"deleteCatInterrupcion/"+codigoCatInterrupcion)
  }
  
  //Archivos
  listarRegistroArchivos(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listarRegistrosArch');
  }

  obtenerRegistroArchivo(id:any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listarRegistrosArch/'+id);
  }

  async addArchivo(registroArch:any):Promise<Observable<any>>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post(this.url +"addRegistrosArch", registroArch, {'headers':headers});
  }

  //Informe diario
  async addFilaInformeDiario(filaRegistro:any):Promise<Observable<any>>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post(this.url +"addInformeDiario", filaRegistro, {'headers':headers});
  }

  listarInformeDiario(codigoArchivo:any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listarFilasInforme/'+codigoArchivo);
  }

  async updateFilaInformeDiario(filaRegistro:any):Promise<Observable<any>>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.put(this.url +"updateInformeDiario", filaRegistro, {'headers':headers});
  }

}
