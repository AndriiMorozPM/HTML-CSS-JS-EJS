//програма ділить стрічку на слова і виводить n-те слово

/*Я просто використав функцію split(), яка ділить стрічку на масив стрічок по певному розділювачу*/
function StrSplit(text,num){
    array = text.split(' ');
    let output = `, ${num} слово стрічки: ${array[num-1]}`;
    return output;
}
text1 = 'Я люблю слухати Sabaton і Powerwolf';
text2 = 'Мені не подобається JavaScript';
text3 = 'Ще одне речення для прикладу';
console.log(`${text1}${StrSplit(text1,4)}`);
console.log(`${text2}${StrSplit(text2,3)}`);
console.log(`${text3}${StrSplit(text3,1)}`);