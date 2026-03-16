import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
   
   employee={
    fname:'Balla',
    lname:'Bhargav',
    age:24,
    city:'Hyderabad',
    country:'India'
   }

get getEmployeeRank()
{
    const Rank=this.employee.age>50?'One':this.employee.age>30?'Two':'Three';
    return Rank;
}
}