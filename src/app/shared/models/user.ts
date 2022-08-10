
export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public adresse: string;
    public phone: string;
    public tokenType: string;
    public token: string;

    constructor(id: number, firstName: string, lastName: string, email: string, tokenType: string, token: string, adresse: string, phone: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.tokenType = tokenType;
        this.token = token;
        this.adresse = adresse;
        this.phone = phone;

    }
}
