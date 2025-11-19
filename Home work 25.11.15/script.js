let shoppingList = [
  { name: "Хлеб", quantity: 1, bought: false },
  { name: "Молоко", quantity: 2, bought: true },
  { name: "Яблоки", quantity: 6, bought: false }
];

let listEl = document.getElementById('list');
let addBtn = document.getElementById('addBtn');
let showBtn = document.getElementById('showBtn');
let clearBtn = document.getElementById('clearBtn');

addBtn.addEventListener('click', addItem);
showBtn.addEventListener('click', renderList);
clearBtn.addEventListener('click', () => {
    if (confirm('Очистить весь список?')) {
        shoppingList = [];
        renderList();
    }
});

function normalizeName(s){
    return String(s).trim().toLowerCase();
}

function renderList() {
    listEl.innerHTML = '';

    let sorted = [...shoppingList].sort((a, b) =>
        (a.bought === b.bought) ? 0 : (a.bought ? 1 : -1)
    );

    if (sorted.length === 0) {
        listEl.innerHTML = '<li style="text-align:center;color:#6b7280">Список пуст</li>';
        return;
    }

    sorted.forEach(item => {
        let li = document.createElement('li');

        let left = document.createElement('div');
        left.className = 'item-left';

        let title = document.createElement('div');
        title.innerHTML = `<strong>${item.name}</strong>
                        <div class="badge">${item.quantity} шт.</div>`;
        left.appendChild(title);

        let buttons = document.createElement('div');
        buttons.className = 'btn-group';

        let buyBtn = document.createElement('button');
        if (item.bought) {
            buyBtn.textContent = 'Куплено';
            buyBtn.className = 'btn-bought';
            buyBtn.disabled = true;
        } 
        else {
            buyBtn.textContent = 'Купить';
            buyBtn.className = 'btn-buy';
            buyBtn.addEventListener('click', () => buyOne(item.name));
        }

        let delBtn = document.createElement('button');
        delBtn.textContent = 'Удалить';
        delBtn.className = 'btn-del';
        delBtn.addEventListener('click', () => removeItem(item.name));

        buttons.appendChild(buyBtn);
        buttons.appendChild(delBtn);

        li.appendChild(left);
        li.appendChild(buttons);

        listEl.appendChild(li);
    });
}

function buyOne(name) {
    let item = shoppingList.find(i => normalizeName(i.name) === normalizeName(name));

    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
        item.quantity = 0;
        item.bought = true;
    }

    renderList();
}

function addItem() {
    let nameInput = document.getElementById('itemName');
    let qtyInput = document.getElementById('itemQty');

    let name = nameInput.value;
    let qty = Number(qtyInput.value);

    if (!name) {
        alert('Введите название товара');
        return;
    }
    if (qty <= 0) {
        alert('Количество должно быть > 0');
        return;
    }

    let existing = shoppingList.find(i => normalizeName(i.name) === normalizeName(name));

    if (existing) {
        existing.quantity += qty;
        existing.bought = false;
    } 
    else {
        shoppingList.push({ name, quantity: qty, bought: false });
    }

    nameInput.value = '';
    qtyInput.value = 1;
    renderList();
}

function removeItem(name) {
    shoppingList = shoppingList.filter(i => normalizeName(i.name) !== normalizeName(name));
    renderList();
}

renderList();
