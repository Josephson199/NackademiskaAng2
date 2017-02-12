import { Component } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Supplier } from './shared/supplier-model'
import { SupplierService } from './shared/supplier.service'
import { Location } from '@angular/common'

@Component({
    templateUrl: './supplier-details.component.html',
    styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent {
    currentSupplierId: number
    supplier: Supplier = new Supplier

    constructor(private activeRoute: ActivatedRoute, private supplierService: SupplierService,
                private location: Location) { }

    ngOnInit() {
        this.currentSupplierId = this.activeRoute.snapshot.params['id']

        this.supplierService.getSupplier(this.currentSupplierId).then(supplier => {
            this.supplier = supplier
        })
    }

    cancel(){
        this.location.back()
    }

   

}