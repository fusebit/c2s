const uuid = require('uuid');

const breeds = ['American', 'British', 'Abyssinian', 'Balinese', 'Birman', 'Bengal'];
const colors = ['Tabby', 'Calico', 'Orange', 'Black', 'Blue', 'Cream'];
const names = ['Bella', 'Kitty', 'Lily', 'Charlie', 'Findus', 'Milo', 'Jack'];
const prices = ['$', '$$', '$$$', '$$$$'];

let cats = [];

while (cats.length < 10) {
    cats.push({
        id: uuid.v4(),
        name: names[Math.floor(Math.random() * names.length)],
        breed: breeds[Math.floor(Math.random() * breeds.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        tags: {
            price: prices[Math.floor(Math.random() * prices.length)],
            available: Math.random() > 0.5
        }
    })
}

const isObjectMatching = (criteria, object) => 
    Object.keys(criteria).length === 0 || 
    Object.keys(criteria).length === Object.keys(criteria).filter(k => 
        typeof criteria[k] !== 'object' && criteria[k] === object[k] || 
        typeof criteria[k] === 'object' && typeof object[k] === 'object' && isObjectMatching(criteria[k], object[k])
    ).length;

exports.search = (criteria, count, next) => {
    console.log('SEARCH', criteria, count, next);
    let items = cats.filter(cat => isObjectMatching(criteria, cat));
    console.log('MATCH', items);
    const newNext = items.length > (next + count) ? next + count : undefined;
    items = items.splice(next, count);
    return newNext ? { items, next: newNext } : { items };
}

exports.tryGet = (id) => cats.find(cat => cat.id === id);

exports.create = (cat) => {
    const newCat = { id: uuid.v4(), ...cat };
    cats.push(newCat);
    return newCat
}

exports.delete = (id) => {
    const index = cats.findIndex(cat => cat.id === id);
    if (index > -1) {
        cats.splice(index, 1);
        return true;
    }
    return false;
}
