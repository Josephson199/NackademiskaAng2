import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Supplier } from './supplier-model'

import "rxjs/add/operator/toPromise"

@Injectable()
export class SupplierService {
    constructor(private http: Http) { }

    getSupplier(id: number): Promise<Supplier>{
      return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/supplier/${id}`)
                    .toPromise()
                    .then(response => response.json() as Supplier)
                    .catch(this.handleError)
            }
    getSuppliers(): Promise<Supplier[]>{
        return this.http.get("http://nackademiskasecure.azurewebsites.net/api/supplier")
                    .toPromise()
                    .then(response => response.json() as Supplier[])
                    .catch(this.handleError)
        
    }        



        private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}