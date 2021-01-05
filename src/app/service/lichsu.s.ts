import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LichSuService {
  constructor(private http: HttpClient) {}

  Create(data: any) {
    return this.http.post(environment.baseAPI + 'lichsu', data);
  }
  GetAll() {
    return this.http.get(environment.baseAPI + 'lichsu/getAll');
  }
}
