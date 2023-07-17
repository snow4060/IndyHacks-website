var infoBoxBackground = 'linear-gradient(rgb(15.294% 20.392% 38.824%) 0%, rgb(15.291% 20.383% 38.809%) 6.25%, rgb(15.27% 20.316% 38.704%) 12.5%, rgb(15.211% 20.134% 38.42%) 18.75%, rgb(15.098% 19.779% 37.868%) 25%, rgb(14.911% 19.195% 36.957%) 31.25%, rgb(14.632% 18.324% 35.597%) 37.5%, rgb(14.243% 17.108% 33.701%) 43.75%, rgb(13.725% 15.49% 31.176%) 50%, rgb(13.208% 13.872% 28.652%) 56.25%, rgb(12.819% 12.656% 26.756%) 62.5%, rgb(12.54% 11.785% 25.396%) 68.75%, rgb(12.353% 11.201% 24.485%) 75%, rgb(12.24% 10.847% 23.933%) 81.25%, rgb(12.181% 10.665% 23.649%) 87.5%, rgb(12.16% 10.598% 23.544%) 93.75%, rgb(12.157% 10.588% 23.529%) 100% )'

var multiple1 = new Multiple({
    selector: '.info-box-wide',
    background: infoBoxBackground
});
var multiple2 = new Multiple({
    selector: '.info-box',
    background: infoBoxBackground
});

var scheduleData;

var scheduleRows;
var maxHeight = 0;
function setScheduleHeight(scheduleWrap=1){
    for(let i = 0; i < scheduleRows; i++){
        maxHeight = 0;
        for(let j = i*2; j < 3*2*scheduleRows; j+=2*scheduleRows){
            if(scheduleWrap == 2 && j <= 2*scheduleRows){
                continue;
            }
            console.log(j);
            console.log(j+1);
            if(scheduleData[j].clientHeight > maxHeight){
                maxHeight = scheduleData[j].clientHeight;
            }
        }
        console.log('row ' + i + ' height: ' + maxHeight);
        for(let j = i*2; j < 3*2*scheduleRows; j+=2*scheduleRows){
            if(scheduleWrap == 2 && j <= 2*scheduleRows){
                continue;
            }
            scheduleData[j].style.height = maxHeight + 'px';
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    var table1 = document.getElementById('day1');
    const table1Rows = table1.rows.length;
    var table2 = document.getElementById('day2');
    const table2Rows = table2.rows.length;
    var table3 = document.getElementById('day3');
    const table3Rows = table3.rows.length;
    const mostRows = Math.max(table1Rows, table2Rows, table3Rows);
    console.log(mostRows)

    for(let i = 0; i < mostRows-table1Rows; i++){
        const newRow = table1.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
    }
    for(let i = 0; i < mostRows-table2Rows; i++){
        const newRow = table2.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
    }
    for(let i = 0; i < mostRows-table3Rows; i++){
        const newRow = table3.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        console.log('inserted new row table 3');
        console.log(mostRows-table3.rows.length)
    }

    scheduleData = document.querySelectorAll('td');
    scheduleRows = document.querySelector('table').rows.length

    for(let i = 0; i < scheduleData.length; i++){
        scheduleData[i].style.height = 'min-content';
    }
    if(window.innerWidth > 1000){
        setScheduleHeight(1);
    }
    else if(window.innerWidth <= 1000 && window.innerWidth > 768){
        setScheduleHeight(2);
    }
});

var answers = document.querySelectorAll('.answer');
for(let i = 0; i < answers.length; i++){
    answers[i].style.height = '0px';
}

window.addEventListener('resize', () => {
    for(let i = 0; i < scheduleData.length; i++){
        scheduleData[i].style.height = 'min-content';
    }
    if(window.innerWidth > 1000){
        setScheduleHeight(1);
        console.log('case 1');
    }
    else if(window.innerWidth <= 1000 && window.innerWidth > 768){
        setScheduleHeight(2);
        console.log('case 2');
    }
});

function showFaq(question, answer){
    answer.style.setProperty('--target-height', answer.scrollHeight + 'px');
    //currently hidden
    if(!answer.classList.contains('show')){
        answer.classList.remove('hide');
        question.classList.remove('turn-plus-animation');
        answer.classList.add('show');
        question.classList.add('turn-x-animation');
    }
    //currently shown
    else{
        answer.classList.remove('show');
        question.classList.remove('turn-x-animation');
        answer.classList.add('hide');
        question.classList.add('turn-plus-animation');
    }
}

document.body.addEventListener('click', (event) => {
    if(event.target.matches('.question') || event.target.matches('span')){
        console.log('question clicked');
        console.log(event.target.nextElementSibling);
        showFaq(event.target, event.target.nextElementSibling);
    }
});

