import { Component } from '@angular/core'
import { User } from '../shared/user-model'
import { Location } from '@angular/common'
import { AuthService } from '../shared/auth.service'
import { Router } from '@angular/router'
import { LoginModel } from '../shared/login-model'

@Component({
    templateUrl: './register.component.html',
    styles: [`
        em { float:right; color:#E05C65; padding-left:10px; }
    `]
})
export class RegisterComponent {
    constructor(private location: Location, private authService: AuthService, private router: Router) { }

    user:User = new User
    loginModel = new LoginModel

    ngOnInit() {

    }

    registerUser(){
        this.user.bids = []
        this.authService.registerUser(this.user).then(response => {
            if(response){
                this.loginModel.email = this.user.email
                this.loginModel.password = this.user.password
                this.authService.loginUser(this.loginModel)
                .then(res =>{
                    if(res){
                        alert("Regestrering Lyckad!")
                        this.router.navigate(['auctions'])
                    }
                })
                
            }
        })
    }

    cancel(){
        this.location.back()
    }
  

  
}