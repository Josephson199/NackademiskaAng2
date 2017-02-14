import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Supplier } from './shared/supplier-model'
import { SupplierService } from './shared/supplier.service'
import { Location } from '@angular/common'


@Component({
    templateUrl: './supplier-details.component.html',
    styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
    currentSupplierId: number
    supplier: Supplier = new Supplier

    constructor(private activeRoute: ActivatedRoute, private supplierService: SupplierService,
                private location: Location, private router: Router) { }

    ngOnInit(): void {
        this.currentSupplierId = this.activeRoute.snapshot.params['id']

        this.supplierService.getSupplier(this.currentSupplierId).then(supplier => {
            if(supplier == null){
                this.router.navigate(['404'])
            }
            this.supplier = supplier
        })
    }

    cancel(): void{
        this.location.back()
    }

   

}