// Припустимо, що у нас є текстовий файл, який виглядає так:
// a 1-5: abcdj
// z 2-4: asfalseiruqwo
// b 3-6: bhhkkbbjjjb
// Кожен рядок складається з вимоги до пароля та самого пароля. Вимога до пароля вказує
// символ, який повинен бути у паролі, і скільки разів він повинен зустрічатися. Наприклад,
// вимога у першому рядку означає, що символ "a" повинен зустрічатися від 1 до 5 разів. У
// прикладі вище два паролі валідні (1 і 3), тому що задовольняють своїм вимогам, 2-й - ні,
// тому що символ "z" в ньому повинен зустрічатися від 2 до 4 разів, але не зустрічається
// жодного разу.
// Потрібно написати код, який порахує кількість валідних паролів у такому файлі.


const fileContent = `a 1-5: abcdj
z 2-4: asfalseiruqwo
b 3-6: bhhkkbbjjjb`;


function validPasswords(content) {
    const rows = content.split('\n');
    
    const results = [];
    rows.forEach((row) => {
        const [firstLetter, range, word] = row.split(' ');
        
        const matches = word.match(new RegExp(firstLetter, 'g')) || []; 
        const [minLine, maxLine] = range.match(new RegExp(/(\d+)/, 'g'));
        
        const length = matches.length;
        
        const min = !!Number(minLine) ? parseInt(minLine)  : 0;
        const max = !!Number(maxLine) ? parseInt(maxLine) : 0;
        
        if (min <= length && max >= length) {
                results.push('valid');
                return;
        }
        
        results.push('invalid');
    });
    
    return results;
}


// console.log(validPasswords(fileContent));


// Unit tests

// Data
// x 1-3: kxvxawxasx
// z 2-4: testzcasesz
// g 3-6: oaockggg
// Expected:
// ['valid', 'valid', 'valid']
const testData1 = `x 1-3: kxvawxasx
z 2-4: testzcasesz
g 3-6: oaockggg`;

console.log(validPasswords(testData1));


// Data
// x 1-3: kxvxxawxasx
// z 2-4: testzcases
// g 3-6: oaogggckgfsaggg
// Expected:
// ['invalid', 'invalid', 'invalid']
const testData2 = `x 1-3: kxvxxawxasx
z 2-4: testzcases
g 3-6: oaogggckgfsaggg`;

console.log(validPasswords(testData2));



// Data
// x 1-3: InstagramPassword!!
// z 2-4: downloaddatapasswordd
// g 3-6: googleg
// Expected:
// ['valid', 'invalid', 'valid']
const testData3 = `! 1-3: InstagramPassword!!
d 2-4: downloaddatapasswordd
g 3-6: googleg`;

console.log(validPasswords(testData3));

