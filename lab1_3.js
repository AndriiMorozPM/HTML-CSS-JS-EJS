function NumIsOk(num_1){
    if(num_1<0) return 0;
    else if (num_1 % 1 != 0) return 0;
    else return 1;
}
function Factorial(num_1){
    if(NumIsOk(num_1)==0) console.log(`Помилка! неможливо знайти факторіал числа ${num_1}`);
    else
    {
        let temp = num_1;
        let res = 1;
        while(num_1>0){
            res = res*num_1;
            num_1 = num_1 - 1;
        }
        console.log(`Факторіал числа ${temp} = ${res}`);
    }
}
Factorial(7);
Factorial(15);
Factorial(-3);
Factorial(0);
Factorial(2.5);