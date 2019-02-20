import { Injectable } from '@angular/core';  
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http'
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getShoppingItems(){
    return this.http.get('http://localhost:3000/api/getItems')
    .pipe(map(res => res))
  }

  addShoppingItem(newItem){
    let headers = new HttpHeaders()
    headers.append('content-type','application/json')
    return this.http.post('http://localhost:3000/api/putItems',newItem,) 
    .pipe(map(res => res))
  }

  deleteShoppingItem(id){
    return this.http.delete('http://localhost:3000/api/deleteItems/'+id)
    .pipe(map(res=>res))
  }

  updateShoppingItem(newItem){
    let headers = new HttpHeaders()
    headers.append('content-type','application/json')
    return this.http.put('http://localhost:3000/api//updateItems/'+newItem._id,newItem, {headers}) 
    .pipe(map(res=>res))
  }
}
