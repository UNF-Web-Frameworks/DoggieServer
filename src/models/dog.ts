/*
Create a Dog class
*/
export class Dog {
  name: string;
  breed: string;
  age: number;
  createdBy:string='';
  updatedBy:string='';
  createdDate:Date;
  updatedDate:Date;

  constructor(name: string, breed: string, age: number) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.createdDate= new Date();
    this.updatedDate= new Date();
  }

  
  
}

