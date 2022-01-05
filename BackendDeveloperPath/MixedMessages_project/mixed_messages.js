const randomIndex = Math.floor(Math.random() * 4);

const multipleWords = {
    elements : ['Wind', 'Fire', 'Earth', 'Water'],
    verbs: ["won't", 'will', 'can', "can\'t"],
    actions : ['Destroy', 'Conquer', 'Save', 'Join'],
    purpose : ['Peace', 'World', 'Hunger', 'War']
}

let fortuneTellerWords = [];

for(let prop in multipleWords){
    fortuneTellerWords.push(multipleWords[prop][randomIndex])
}



console.log('The Four Elements Fortune Teller Says :', fortuneTellerWords.join(' '));