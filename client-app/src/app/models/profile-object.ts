export class ProfileObject {
    userLogin: string = '';
    name: string = '';
    surname: string = '';
    birthday: string = '';

    constructor(userLogin: string, name: string, surname: string, birthday: string) {
        this.userLogin = userLogin;
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
    }
}
