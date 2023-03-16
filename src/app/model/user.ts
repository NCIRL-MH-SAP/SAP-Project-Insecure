export class User {
    public UserId: number;
    public FirstName = '';
    public LastName = '';
    public Active? = false;
    public Bonus?: number;
    public Salary = 0; 
}


export const users = [
    {
        "UserId": 1,
        "FirstName": "Chai",
        "LastName": "PLS",
        "Salary": 18,
        "Bonus": 39,
        "Active": false,
    },
    {
        "UserId": 2,
        "FirstName": "Chang",
        "LastName": "LN",
        "Salary": 19,
        "Bonus": 17,       
        "Active": false,      
    },
    {
        "UserId": 3,
        "FirstName": "Aniseed",
        "LastName": "Syrup",       
        "Salary": 10,
        "Bonus": 13,       
        "Active": false,        
    }
];