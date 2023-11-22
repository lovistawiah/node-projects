const posts = [
    { title: 'post one', body: 'this is one' },
    { title: 'post two', body: 'this is two' }
]

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `<li>${post.title}</li>
            `
        })
        console.log(output)
        document.querySelector('body').innerHTML = output;
    }, 1000);
}

function createPost(post,) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false;

            !error ? resolve() : reject("Error: Something went wrong");
        }, 2000);
    });

}

// createPost({ title: 'post three', body: 'this is three' })
//     .then(getPosts)
//     .catch(err => console.log(err));

// 

// async function init() {
//     await createPost({ title: 'post three', body: 'this is three' })
//     getPosts();
// }
// init();

async function FetchApi() {
    const fetchData = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await fetchData.json();
    console.log(data)
}

FetchApi();
// const promise1 = fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())

// const promise2 = 10;
// const promise = fetch('https://poetrydb.org/title/Ozymandias/lines.json')
//     .then(res => res.json())

// const all = Promise.all([promise1,promise2,promise])
// console.log(all)




