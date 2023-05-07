import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {settings} from 'src/environment/environment';
import { Group } from '../models/group';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private readonly baseUrl : string;
  constructor(private http: HttpClient) { 
    this.baseUrl = settings.baseUrl;
  }

  getGroups(): Promise<Group[]> {
    const req$ = this.http.get<Group[]>(`${this.baseUrl}/Groups`);
    return firstValueFrom(req$);
  }

  deleteGroup(id: number): Promise<Group[]> {
    const req$ = this.http.delete<Group[]>(`${this.baseUrl}/Groups/${id}`);
    return firstValueFrom(req$);
  }

  createGroup(group: Partial<Group>) : Promise<Group[]>{
    const req$ = this.http.post<Group[]>(`${this.baseUrl}/Groups` , group);
    return firstValueFrom(req$);
  }

  editGroup(id: number , group: Partial<Group>): Promise<Group[]> {
    const req$ = this.http.put<Group[]>(`${this.baseUrl}/Groups/${id}` ,  group);
    return firstValueFrom(req$);
  }
}
