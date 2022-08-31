const axios = require('axios')
const sleep = require('sleep-promise');
const xlsx =require('xlsx')
const cheerio =require('cheerio')

const numbers = [];

let filePath = './Results/411Directory.xlsx';
let valid=0
let counter=0
let allNumbers = [];
let validNumbers = [];
let invalidNumbers = [];
const workBook = xlsx.utils.book_new();
let allWorkSheet = xlsx.utils.json_to_sheet(allNumbers);
xlsx.utils.book_append_sheet(workBook, allWorkSheet, 'All Numbers');
let validWorkSheet = xlsx.utils.json_to_sheet(validNumbers);
xlsx.utils.book_append_sheet(workBook, validWorkSheet, 'Valid Numbers');
let invalidWorkSheet = xlsx.utils.json_to_sheet(invalidNumbers);
xlsx.utils.book_append_sheet(workBook, invalidWorkSheet, 'Invalid Numbers');

allWorkSheet["!cols"] = [{width:25}];
validWorkSheet["!cols"] = [{width:25}];
invalidWorkSheet["!cols"] = [{width:25}];

const getData = (number) => {
    axios.get(`https://www.411directoryassistance.ca/reverse-lookup/?reverseSearch=Business&pac=${number.slice(0, 3)}&pex=${number.substr(3, 3)}&pnum=${number.slice(number.length - 4)}&search.x=32&search.y=13`)
        .then(async response => {
            const html = response.data;
            const $ = cheerio.load(html);
            checkValidity($, number);
            if (counter % 100 == 0) {
                saveToFileDuringProcess();
            }
            if (counter === numbers.length) {
                console.log("\x1b[36m", `Please wait for 30 seconds...`);
                setTimeout(async () => {
                    console.log()
                    saveToFile();
                }, 30000);
            }
        }).catch(async error => {
            getData(number);
        });
}

const checkValidity = async ($, number) => {
    counter++
    let Store = new Object()
    let AllNumber=new Object()
    AllNumber.phone =number
    allNumbers.push(AllNumber);
    if ($('.listing-phone').find('div').eq(0).text().trim() !== "") {
        Store.name = $('.listing-desc').find('div').eq(0).find('a').find('span').text()
        Store.Address = $('.listing-desc').find('div').eq(1).find('div').eq(0).find('span').text()
        Store.City = $('.listing-desc').find('div').eq(1).find('div').eq(1).find('span').text()
        Store.phone = $('.listing-phone').find('div').eq(0).text().trim();
        console.log("\x1b[32m", `#${counter}: ${number} >> Valid - Total Valid: ${valid} out of ${counter}`);
        valid++
        validNumbers.push(Store)
        console.log(Store.name);
    }
    else {
        Store.Error = $('#content-biz').find('div').find('div').eq(0).text().replace(/\t/g, '')
            .replace(/\n/g, '').trim()
        Store.phone = number
        console.log("\x1b[31m", `#${counter}: ${number} >> Invalid - Total Valid: ${valid} out of ${counter}`);
        invalidNumbers.push(Store)
        return false;
    }

    return true;
}

const saveToFileDuringProcess = () => {
    console.log("\x1b[36m",'Saving the process...');
   
    xlsx.utils.sheet_add_json(allWorkSheet,allNumbers);
    xlsx.utils.sheet_add_json(validWorkSheet,validNumbers);
    xlsx.utils.sheet_add_json(invalidWorkSheet,invalidNumbers);
    return xlsx.writeFile(workBook, filePath);
}

const saveToFile = () => {
    console.log("\x1b[36m",'Saving to the file...');
    
    xlsx.utils.sheet_add_json(allWorkSheet,allNumbers);
    xlsx.utils.sheet_add_json(validWorkSheet,validNumbers);
    xlsx.utils.sheet_add_json(invalidWorkSheet,invalidNumbers);
    xlsx.writeFile(workBook, filePath);

    console.log("\x1b[36m",'Successfully saved. BYE!');
}

process.on('SIGINT', function() {
    console.log("\x1b[33m","Caught interrupt signal. Saving to the file...");
    saveToFile();
    process.exit();
});

const app = async _ => {
    console.log("\x1b[36m", 'Please give the script a few seconds to warm up... ;)');
    for (number of numbers) {
        await sleep(Math.floor((Math.random() * (10-5)) + 5) * 1000)
        getData(number);
    }
}
app();

