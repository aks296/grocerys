import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  async canActivate(): Promise<boolean> {

    const is_signed_in = ( localStorage.getItem('loggedIn') === 'true');

    return is_signed_in;
  }
}