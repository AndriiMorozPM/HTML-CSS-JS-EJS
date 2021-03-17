function DateCompare(array){
    let DateMax = new Date(`${array[0]}`);
    let DatePrev;
    let DateNext;
    for(let temp = 0;temp<array.length - 1;temp++){
        DatePrev = new Date(`${array[temp]}`);
        DateNext = new Date(`${array[temp + 1]}`);
        if(DatePrev<DateNext) DateMax = DateNext;
    }
    return DateMax;
}
let mas1 = ['2012-06-25','2013-08-14','2018-01-01','2016-04-05'];
let mas2 = ['1980-01-01','2040-12-30','2010-07-17'];
let mas3 = ['2007-03-25','2021-03-18','2021-03-17','2017-01-05','2014-03-10'];
console.log(`${mas1}: Остання дата: ${DateCompare(mas1)}`);
console.log(`${mas2}: Остання дата: ${DateCompare(mas2)}`);
console.log(`${mas3}: Остання дата: ${DateCompare(mas3)}`);
