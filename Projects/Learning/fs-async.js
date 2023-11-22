const { readFile, writeFile } = require('fs').promises;


const start = async () => {
    try {
        const first = await readFile('./content/test.txt', 'utf-8')
        const second = await readFile('./content/resut.txt', 'utf-8')
        await writeFile('./content/result-test.txt', `This is the test from the first: ${first} \nand this is from the second :${second}`,{flag:'w+'})
        console.log(first, second)
    } catch (error) {
        console.log(error)
    }
}
start();


