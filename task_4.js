// алгоритм бінарного пошуку, шукає value в впорядкованому масиві array і повертає чи воно там присутнє

/*алгоритм ділить масив навпіл і порівнює шукане значення з середнім значенням масиву. Якщо шукане значення
  менше, то продовжуємо пошук в лівій половині масиву, якщо більше - то в правій. Продовжуємо, поки шукане 
  значення не буде рівним середньому значенню в масиві або поки не буде куди ділити масив*/
function BinarySearch(array,value){
    let beg = 0;
    let end = array.length - 1;
    let mid;
    for(let i = 0;i < array.length;i++)
    {
        mid = Math.trunc((end + beg)/2);
        if(end - beg == 1)
        {
            if(value != array[end] || value != array[beg])   //остання ітерація, далі зменшувати нікуди
            {
                console.log(`Число "${value}" відсутнє в масиві "${array}"!`);
                return;
            }
            else 
            {
                console.log(`Число "${value}" присутнє в масиві "${array}"!`);
                return;
            }
        }
        if(value < array[mid]) 
        {
            end = mid;
        }
        else if(value > array[mid])
        {
            beg = mid;
        }
        else      //очевидно, що якщо value не менше і не більше, то воно знайдене
        {
            console.log(`Число "${value}" присутнє в масиві "${array}"!`);
            return;
        }
    }
    console.log(`Число "${value}" відсутнє в масиві "${array}"!`);
    return;
}
array1 = [1,2,3,4,5,6,7,8,9];
array2 = [1,2,3,5,7,11,13,17,19,23,29];
array3 = [1,2,4,5,6,8,9,10,12,13];
BinarySearch(array1,2);
BinarySearch(array2,8);
BinarySearch(array3,9);