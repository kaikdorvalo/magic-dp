
fakerr = require('@faker-js/faker');
faker = fakerr.faker

for (let i = 0; i < 50; i++) {
    const data = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 8 }),
        roles: ['user']
    }

    const body = JSON.stringify(data)


    fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
}