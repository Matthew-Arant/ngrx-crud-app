import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associate } from '../Store/Model/associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  constructor(private http:HttpClient) { }

  getAll() {
    return this.http.get<Associate[]>(this.getURL());
  }

  delete(id: number) {
    return this.http.delete(this.getURLById(id))
  }

  update(data: Associate) {
    return this.http.patch(this.getURLById(data.id), data)
  }
  
  create(data: Associate) {
    return this.http.post(this.getURL(), data)
  }

  getURL(): string {
    return 'http://localhost:3000/associate'
  }

  getURLById(id: number): string {
    return `${this.getURL()}/${id}`
  }
}
