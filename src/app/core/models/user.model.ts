export class User {
  uuid: string | null;
  name: string | null;
  email: string | null;
  type: string | null;
  // token: string | null;
  // refreshToken: string | null;

  constructor() {
    this.uuid = null;
    this.name = null;
    this.email = null;
    this.type = null;
    // this.token = null;
    // this.refreshToken = null;
  }
}
