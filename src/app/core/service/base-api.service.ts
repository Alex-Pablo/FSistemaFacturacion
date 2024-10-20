import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from '../interfaces/IResult';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private baseUrlApi: string = environment.baseUrlApi

  constructor(private http: HttpClient) { }


  getItems(service: string): Observable<IResult<any>> {
    return this.http.get<any>(`${this.baseUrlApi}/${service}/all`)
  }

  addItem(service: string, data: any) {
    return this.http.post<any>(`${this.baseUrlApi}/${service}/create`, data)
  }


  filter(service: string, numberDTE?: string | null, startDate?: Date | null, endDate?: Date | null) {
    let params = new HttpParams();

    if (numberDTE) {
      params = params.append('numberDTE', numberDTE);
    }
    if (startDate) {
      params = params.append('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.append('endDate', endDate.toISOString());
    }

    console.log(params)
    return this.http.get<any>(`${this.baseUrlApi}/${service}/filter`, { params });
  }

}
