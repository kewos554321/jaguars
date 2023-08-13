export class SignupRequest {
  email: string | null
  password: string | null

  constructor() {
    this.email = null;
    this.password = null;
  }
}
