// const path =require('path')
// console.log(__dirname)
// console.log(path.basename(__filename))

// for( let key in globalThis){
//     console.log(key)
// }

// the path to node
// console.log(process.argv)

const questions = [
    "What is your name",
    "Your preferred programming language",
    "Your job title"
];
const answers = [];

// TODO: ask for question wait for input, add key value pair to object and ask next question
function ask(questions,) {
    const answers = {};
    for (let i = 0; i < questions.length; i++) {
        process.stdout.write(`\n\n\n ${questions[i]}`);
        process.stdout.write(` > `);
        process.stdin.on("data", function (data) {
            answers[questions[i]] = data.toString().trim();
            if (Object.keys(answers).length < questions.length) {
                ask(questions)
            } else {
                console.log(answers);
                process.exit();
            }
        });
    }
}
ask(questions);
// function ask(i=0) {
//     process.stdout.write(`\n\n\n ${questions[i]}`);
//     process.stdout.write(` > `)
// }
// process.stdin.on("data", function(data){
//    answers.push(data.toString().trim())
//    if(answers.length < questions.length){
//     ask(answers.length)
//    }else{
//        console.log(answers)
//     process.exit();

//    }
// })
