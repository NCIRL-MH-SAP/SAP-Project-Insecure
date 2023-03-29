export class User {
    public id?: number;
    public firstName = '';
    public lastName = '';
    public email = '';
    public active? = false;
    public isAdmin? = false;
    public bonus?: number;
    public salary?: number;
    public password: "";
    public position? = '';
}