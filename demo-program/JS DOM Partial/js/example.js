var height = "about 5'10\" tall";

var hawtim=Object();
hawtim.name="zhang";
hawtim.year=22;
hawtim.living="shantou";
var beatles=Array();
beatles.bass=hawtim;
document.write(beatles.bass.name);

var total=(1+4)*5;
// 此外还可以对变量进行操作

var year = 2015;
var message = "The year is ";
message += year;
alert(message);

// function shout(){
// 	var beatles = Array("John","Paul", "George","Ringo")
// 	for(var count = 0;count < beatles.length; count++){
// 		alert(beatles[count]);
// 	}
// }
// document.write(shout());

function multiply(num1,num2){
	var total = num1 * num2;
	return total;
}
document.write(multiply(10,8));


function convertToCelsius(temp){
	var result = temp - 32;
	result = result / 1.8;
	return result;
}

	var temp_fahrenheit = 95;
	var temp_celsius = convertToCelsius(temp_fahrenheit);
	alert(temp_celsius);

function square(num){
	var total = num * num;
	return total;
}
var total = 50;
var number = square(20);

alert(total);

var today = current_date.getDay();