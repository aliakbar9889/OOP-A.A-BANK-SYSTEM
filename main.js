import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // making withdraw method
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`WITHDRAWAL OF $${amount} SUCCESSFULLY , REMAINING BALANCE IS $${this.balance} `);
        }
        else {
            console.log("INSUFFICENT BALANCE");
        }
    }
    // making deposit balance
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1
            this.balance += amount;
            console.log(`DEPOSIT OF $${amount} SUCCESSFULLY , REMAING BALANCE IS ${this.balance}`);
        }
    }
    // making check balance method
    checkBalance() {
        console.log(`CURRENT BALANCE : $${this.balance}`);
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// creating bank accounts
const accounts = [
    new BankAccount(4201, 500),
    new BankAccount(4202, 1000),
    new BankAccount(4203, 2000)
];
// creating customer
const customer = [
    new Customer("ALI", "AKBAR", "MALE", 17, 3131085935, accounts[0]),
    new Customer("FABIHA", "ZEHRA", "FEMALE", 24, 3328544964, accounts[1]),
    new Customer("MOIZ", "ALI", "MALE", 31, 3162854766, accounts[2])
];
// function to interact with bank account
async function services() {
    do {
        let accountNumberInput = await inquirer.prompt({
            name: "accountNum",
            message: "ENTER YOUR ACCOUNT NUMBER",
            type: "number"
        });
        const Customer = customer.find(customer => customer.account.accountNumber === accountNumberInput.accountNum);
        if (Customer) {
            console.log(`WELCOME ${Customer.firstName} ${Customer.lastName}!`);
        }
        const ans = await inquirer.prompt([
            {
                name: "select",
                message: "WHAT WOULD YOU LIKE TO DO",
                type: "list",
                choices: [
                    { name: "WITHDRAWAL", value: "WITHDRAWAL" },
                    { name: "DEPOSIT", value: "DEPOSIT" },
                    { name: "CHECK BALANCE", value: "CHECK BALANCE" },
                    { name: "EXIT", value: "EXIT" }
                ]
            }
        ]);
        // Handle the user's selection
        switch (ans.select) {
            case "WITHDRAWAL":
                // Handle withdrawal
                const Withdrawans = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "\nENTER WITHDRAW AMOUNT."
                });
                Customer?.account.withdraw(Withdrawans.amount);
                break;
            case "DEPOSIT":
                // Handle deposit
                const depositAns = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "\nENTER DEPOSIT AMOUNT."
                });
                Customer?.account.deposit(depositAns.amount);
                break;
            case "CHECK BALANCE":
                // Handle check balance
                Customer?.account.checkBalance();
                break;
            case "EXIT":
                // Exit the loop
                console.log("EXITNIG BANK!!\n THANK YOU FOR USING OUR SERVICES");
                return;
            default:
                console.log("Invalid selection, please try again.");
        }
    } while (true);
}
services();
