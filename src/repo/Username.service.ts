export class UserNameService {
  private storageKey = "username";

  setUserName(username: string): void {
    localStorage.setItem(this.storageKey, username);
  }

  getUserName(): string {
    return localStorage.getItem(this.storageKey) ?? "";
  }
}
