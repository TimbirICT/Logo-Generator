const fs = require('fs');
const inquirer = require('inquirer');

class UserPrompter {
    async promptUser() {
        const responses = await inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Enter Logo Text (3 char. max)',
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Pick a Shape',
                choices: [
                    { title: 'Circle', value: 'Circle' },
                    { title: 'Triangle', value: 'Triangle' },
                    { title: 'Square', value: 'Square' },
                ]
            },
            {
                type: 'input',
                name: 'color',
                message: 'What color would you like your logo to be?',
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'What color would you like your logo text to be?',
            },
        ]);
        return responses;
    }
}

class Shape {
    constructor(responses) {
        this.responses = responses;
    }
    render() {
        throw new Error('Shape is not implemented');
    }
}

class Triangle extends Shape {
    constructor(responses) {
        super(responses);
        this.color = responses.color;
    }

    render() {
        return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`

    }
}

class Circle extends Shape {
    constructor(responses) {
        super(responses); 
        this.color = responses.color;
    }

    render() {
        return `<circle cx="50" cy="50" r="40" fill="${this.color}" />`;
    }
}

class Square extends Shape {
    constructor(responses) {
        super(responses); 
        this.color = responses.color;
    }

    render () {
        return `<rect x="0" y="0" width="100" height="100" fill="${this.color}" />`;
    }
}

class LogoGenerator {
    constructor(data) {
        this.data = data;
    }

    generate() {
        if (this.data.text.length > 3) {
            throw new Error('Logo text exceeds 3 characters');
        }

        let shape;
        switch (this.data.shape) {
            case 'Circle':
                shape = new Circle(this.data);
                break;
            case 'Square':
                shape = new Square(this.data);
                break;
            case 'Triangle':
                shape = new Triangle(this.data);
                break;
            default:
                throw new Error('Invalid shape');
        }

        const shapeSVG = shape.render();
        const textSVG = `<text x="50" y="55" font-family="Arial" font-size="20" fill="${this.data.textColor}" text-anchor="middle">${this.data.text}</text>`;
        return `<svg width="300" height="200" viewBox="0 0 100 100">${shapeSVG}${textSVG}</svg>`;
    }
}


async function init() {
    try {
        const prompter = new UserPrompter();
        const data = await prompter.promptUser();
        const logoGenerator = new LogoGenerator(data);
        const logo = logoGenerator.generate();

        fs.writeFileSync('logo.svg', logo);
        console.log('Logo generated successfully.');
    } catch (error) {
        console.error(error);
    }
}

init();

module.exports = {
    init,
    Triangle,
    Circle,
    Square,
    LogoGenerator,
    UserPrompter,
    Shape
    
};
