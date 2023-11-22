const fs = require('fs');
const inquirer = require('inquirer');

async function promptUser() {
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

function drawShape(shape, color) {
    let shapeSVG = '';
    if (shape === 'Circle') {
        shapeSVG = `<circle cx="50" cy="50" r="40" fill="${color}" />`;
    }
    else if (shape === 'Triangle') {
        shapeSVG = `<polygon points="20,20 60,80 100,20" fill="${color}" />`;
    }
    else if (shape === 'Square') {
    }
    return shapeSVG;
}

function generateLogo(data) {
    if (data.text.length > 3) {
        throw new Error('Logo text exceeds 3 characters');
    }
    const shapeSVG = drawShape(data.shape, data.color);
    const textSVG = `<text x="50" y="55" font-family="Arial" font-size="20" fill="${data.textColor}" text-anchor="middle">${data.text}</text>`;
    return `<svg width="200" height="200" viewBox="0 0 100 100">${shapeSVG}${textSVG}</svg>`;
}

async function init() {
    try {
        const data = await promptUser();
        const logo = generateLogo(data);

        const outputDir = './output';
        if (!fs.existsSync(outputDir)){
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFile(`${outputDir}/logo.svg`, logo, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Logo generated successfully.');
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

 init();
