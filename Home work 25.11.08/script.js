function loadTask(id) {
    const output = document.getElementById("output");

    switch (id) {
        case 1:
            let age = prompt("Введите ваш возраст:");
            age = Number(age);
            if (age >= 0 && age < 12) output.innerText = "Ребенок";
            else if (age < 18) output.innerText = "Подросток";
            else if (age < 60) output.innerText = "Взрослый";
            else output.innerText = "Пенсионер";
            break;

        case 2:
            let num = prompt("Введите число от 0 до 9:");
            const symbols = {1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")"};
            output.innerText = symbols[num] || "Некорректный ввод";
            break;

        case 3:
            let n3 = prompt("Введите трёхзначное число:");
            if (n3.length === 3 && (n3[0] === n3[1] || n3[0] === n3[2] || n3[1] === n3[2]))
                output.innerText = "Есть одинаковые цифры";
            else output.innerText = "Все цифры разные";
            break;

        case 4:
            let year = Number(prompt("Введите год:"));
            let leap = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
            output.innerText = leap ? "Высокосный" : "Обычный";
            break;

        case 5:
            let p = prompt("Введите пятизначное число:");
            if (p === p.split('').reverse().join('')) output.innerText = "Палиндром";
            else output.innerText = "Не палиндром";
            break;

        case 6:
            let usd = Number(prompt("Введите сумму USD:"));
            let currency = prompt("Выберите валюту (EUR, UAN, AZN):").toUpperCase();
            const rates = {EUR: 0.9, UAN: 38, AZN: 1.7};
            if (rates[currency]) output.innerText = (usd * rates[currency]).toFixed(2) + " " + currency;
            else output.innerText = "Неизвестная валюта";
            break;

        case 7:
            let sum = Number(prompt("Введите сумму покупки:"));
            let discount = sum >= 500 ? 7 : sum >= 300 ? 5 : sum >= 200 ? 3 : 0;
            output.innerText = "К оплате: " + (sum - sum * discount / 100);
            break;

        case 8:
            let circle = Number(prompt("Введите длину окружности:"));
            let square = Number(prompt("Введите периметр квадрата:"));
            let diameter = circle / Math.PI;
            let side = square / 4;
            output.innerText = diameter <= side ? "Круг поместится" : "Не поместится";
            break;

        case 9:
            let score = 0;
            if (prompt("Столица Франции? (1-Париж, 2-Лондон, 3-Рим)") == 1) score += 2;
            if (prompt("2 + 2? (1-3, 2-4, 3-5)") == 2) score += 2;
            if (prompt("Цвет неба? (1-синий, 2-красный, 3-зелёный)") == 1) score += 2;
            output.innerText = "Ваш результат: " + score + " баллов";
            break;

        case 10:
            let d = Number(prompt("Введите день:"));
            let m = Number(prompt("Введите месяц:"));
            let y = Number(prompt("Введите год:"));

            let daysInMonth = [31, (y%400===0||y%4===0&&y%100!==0)?29:28, 31,30,31,30,31,31,30,31,30,31];

            d++;
            if (d > daysInMonth[m-1]) {
                d = 1;
                m++;
                if (m > 12) {
                    m = 1;
                    y++;
                }
            }
            output.innerText = `Следующая дата: ${d}.${m}.${y}`;
            break;
    }
}
