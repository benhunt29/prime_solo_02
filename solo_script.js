// ! ! !
// Three Bugs
// Refactored to use Objects instead of arrays

//  Employee object constructor
var Employee = function(name, empNum, baseSal, rating){
  this.name = name;
  this.employeeNumber = empNum;
  this.baseSalary = baseSal;
  this.rating = rating;
};

// define method to calculate the STI for the employee
Employee.prototype.CalculateSTI = function (){

  var bonus = this.GetBaseSTI(this.rating) + this.GetYearAdjustment(this.employeeNumber) - this.GetIncomeAdjustment(this.baseSalary);
  
  if(bonus > 0.13){
    bonus = 0.13;
  }
  // save bonusComp as variable to avoid extra math 
  var bonusComp = Math.round(bonus*parseInt(this.baseSalary));

  //set STI property of current Employee
  this.STI = bonus;
  //set total compensation property of current Employee
  this.totalCompensation = parseInt(this.baseSalary) + bonusComp;
  //set bonus compensation property of current Employee
  this.bonusComp = bonusComp;
}

//method to calculate base STI
Employee.prototype.GetBaseSTI = function (){
  var basePercent = 0;
  switch(this.rating){
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent
}
//method to calculate year adjustment
Employee.prototype.GetYearAdjustment = function(){
  var yearAdjustment = 0;
  if(this.employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}
//method to calculate income adjustment
Employee.prototype.GetIncomeAdjustment = function (){
  var incomeAdjustment = 0;
  this.baseSalary = parseInt(this.baseSalary);
  if(this.baseSalary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}

//method to generate an array of desired outputs
Employee.prototype.GenerateEmpSTIArrayObj = function (){
  return new EmployeeSTIArray(this);
}

//method to generate an array of desired outputs
var EmployeeSTIArray = function (Employee){
  var array = [];
  Employee.CalculateSTI();
  array[0] = Employee.name;
  array[1] = Employee.STI;
  array[2] = Employee.totalCompensation;
  array[3] = Employee.bonusComp;
  this.array = array;
}


//create 4 new Employees
var Atticus = new Employee("Atticus", "2405", "47000", 3);
var Jem = new Employee("Jem", "62347", "63500", 4);
var Boo = new Employee("Boo", "11435", "54000", 3);
var Scout = new Employee("Scout", "6243", "74750", 5);

AtticusSTIArray = new EmployeeSTIArray(Atticus);
//console.log(AtticusSTIArray.array)

//var AtticusArray = Atticus.GenerateEmpSTIArrayObj().array;
//console.log(AtticusArray.array);
//create array of all Employee Objects
var employeeArray = [Atticus, Jem, Boo, Scout];
var array = [];
var obj;
for (i = 0; i < employeeArray.length;i++){
  obj = employeeArray[i].GenerateEmpSTIArrayObj();
  array[i] = obj.array;

};
//console log to check output
console.log(array);

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	str = '';
 	newEl = document.createElement('li');
  array[i].forEach(function(array,index){
    str += array+' ';
  });
	newText = document.createTextNode(str);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}
