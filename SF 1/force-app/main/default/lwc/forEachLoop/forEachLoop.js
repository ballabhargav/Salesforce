import { LightningElement } from 'lwc';

export default class ForEachLoop extends LightningElement {
//     employee={
//     fname:'Balla',
//     lname:'Bhargav',
//     age:24,
//     city:'Hyderabad',
//     country:'India'
//    }

   employeeList=[
    {
    fname:'Balla',
    lname:'Bhargav',
    age:24,
    city:'Hyderabad',
    country:'India'
   },
   {
    fname:'Satish',
    lname:'Sardar',
    age:34,
    city:'Bangalore',
    country:'India'
   },
   {
    fname:'Depak',
    lname:'kalal',
    age:50,
    city:'coimbatore',
    country:'India'
   }
   ]

}