function BubbleSort(array){
    let array_s = array;
    Sort(array_s, 0, array_s.length - 1);
    return array_s;
}
function Sort(array,beg,end){
    let c = true;
    let en;
    while(c == true)
    {
        c = false;
        en = 0;
        while(en <= end)
        {
            if(array[en]>array[en+1])
            {
                let temp = array[en];
                array [en] = array[en + 1];
                array [en + 1] = temp;
                c = true;
                en++;
            }
            else en++;
        }
    }
}
let data1 = [5,2,7,6,3];
let data2 = [4,6,12,3,7,1,8,2];
let data3 = [5,2,12,5,5,4,2,6,-1,6,11,9,3,0];
let data4 = [1.1,2.3,2.2,0.6,3.4,2.9,3,-1.2,-0.1];

console.log(`${data1} -> ${BubbleSort(data1)}`);
console.log(`${data2} -> ${BubbleSort(data2)}`);
console.log(`${data3} -> ${BubbleSort(data3)}`);
console.log(`${data4} -> ${BubbleSort(data4)}`);