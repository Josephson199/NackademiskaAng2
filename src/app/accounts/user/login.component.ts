import { Component } from '@angular/core'
import { Location } from '@angular/common'
import { AuthService } from '../shared/auth.service'
import { Router } from '@angular/router'
import { LoginModel } from '../shared/login-model'

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float:right; color:#E05C65; padding-left:10px; }
    `]
})
export class LoginComponent {

    loginModel: LoginModel = { email: "", password: "" }
    loginRes: string = "" 

    constructor(private location: Location, private authService: AuthService, private router: Router) { }


    login() {
        this.authService.loginUser(this.loginModel).then(res => {
            if (res) {
                this.router.navigate(['auctions']
                )
            }
            else{
                this.loginRes = "Wrong email or Password"
            }
        })

    }

    cancel() {
    this.location.back()
}
}



