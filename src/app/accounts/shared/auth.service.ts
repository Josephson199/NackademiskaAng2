import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { LoginModel } from './login-model'
import { User } from './user-model'

import "rxjs/add/operator/toPromise"

@Injectable()
export class AuthService {
    user: User = null



    constructor(private http: Http) { }

    isLoggedIn(): boolean {
        return (this.user != null)
    }
    isAdmin(): boolean {

        let jwtStr = localStorage.getItem('jwtStr')
        if (jwtStr != null) {

            let jwt = JSON.parse(jwtStr)

            var currentTime = new Date()
            var jwtExpire = new Date(jwt.expiration)

            if (currentTime < jwtExpire) {
                return true
            } else {
                localStorage.removeItem('jwtStr')
            }


            return false
        }

        return false
    }

    loginUser(loginModel: LoginModel): Promise<boolean> {
        return this.http.post('http://nackademiskasecure.azurewebsites.net/api/account/login', loginModel, { withCredentials: true })
            .toPromise()
            .then(response => {
                let r = response.json()
                this.getUser(r.id).then(user => {
                    this.user = user

                })

                return true
            })
            .catch(error => false)
    }



    getAllUsers(): Promise<User[]> {
        return this.http.get("http://nackademiskasecure.azurewebsites.net/api/customer")
            .toPromise()
            .then(response => response.json() as User[])
            .catch(this.handleError)
    }




    getUser(id: number): Promise<User> {
        return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/customer/${id}`)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError)
    }

    logOut(): void {
        this.http.get('http://nackademiskasecure.azurewebsites.net/api/account/logout')
            .toPromise()
            .then(this.user = null)
            .catch(this.handleError)

        localStorage.removeItem('jwtStr')

    }


    registerUser(user: User): Promise<boolean> {
        return this.http.post("http://nackademiskasecure.azurewebsites.net/api/customer", user)
            .toPromise()
            .then(response => true)
            .catch(response => false)

    }


    loginAdmin(loginModel: LoginModel): Promise<boolean> {
        return this.http.post('http://nackademiskasecure.azurewebsites.net/api/account/admin/login', loginModel)
            .toPromise()
            .then(response => {
                let jwt = response.json()

                if (jwt) {
                    let jwtStr = JSON.stringify(jwt)
                    localStorage.setItem('jwtStr', jwtStr)
                }
                return true
            })
            .catch(error => false)
    }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }



}
