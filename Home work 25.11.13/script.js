function isPerfect(num) {
    if (num <= 1) return false;
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

function perfectInRange(min, max) {
    const result = [];
    for (let n = min; n <= max; n++) {
        if (isPerfect(n)) result.push(n);
    }
    return result;
}

function timeToSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}

function loadTask(id) {
    const output = document.getElementById("output");

    switch(id) {
        case 1:
            let num = Number(prompt("Введіть число:"));
            output.innerText = isPerfect(num) ? "Число є досконалим" : "Число НЕ є досконалим";
            break;

        case 2:
            let min = Number(prompt("Мінімум діапазону:"));
            let max = Number(prompt("Максимум діапазону:"));
            let list = perfectInRange(min, max);
            output.innerText = list.length ? "Досконалі числа: " + list.join(", ") : "У цьому діапазоні немає досконалих чисел";
            break;

        case 3:
            let h = Number(prompt("Години:"));
            let m = Number(prompt("Хвилини:"));
            let s = Number(prompt("Секунди:"));
            output.innerText = "Усього секунд: " + timeToSeconds(h, m, s);
            break;
    }
}