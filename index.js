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

class Triangle {
    constructor(color) {
        this.color = color;
    }

    init() {
        return `<polygon points="10,90 50,10 90,90" fill="${this.color}" />`;
    }
}

class Circle {
    constructor(color) {
        this.color = color;
    }

    init() {
        return `<circle cx="50" cy="50" r="40" fill="${this.color}" />`;
    }
}

class Square {
    constructor(color) {
        this.color = color;
    }

    init() {
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

        let shapeSVG;
        switch (this.data.shape) {
            case 'Circle':
                shapeSVG = new Circle(this.data.color).init();
                break;
            case 'Square':
                shapeSVG = new Square(this.data.color).init();
                break;
            case 'Triangle':
                shapeSVG = new Triangle(this.data.color).init();
                break;
            default:
                throw new Error('Invalid shape');
        }

        const textSVG = `<text x="50" y="55" font-family="Arial" font-size="20" fill="${this.data.textColor}" text-anchor="middle">${this.data.text}</text>`;
        return `<svg width="200" height="200" viewBox="0 0 100 100">${shapeSVG}${textSVG}</svg>`;
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