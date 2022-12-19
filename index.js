const headerTopCity = document.querySelector('.header__top__city')
const modalEnterCityAll = document.querySelector('.modal__enter__cityAll')
const serchCities = document.querySelector('#serchCities')
const modalEnterChoise = document.querySelector('.modal__enter__choise')
const modalEnter = document.querySelector('.modal__enter')
const mb = document.querySelector('.modal__block')

window.onload = function () {
    mb.classList.add('loaded_hiding');
    window.setTimeout(function () {
      mb.classList.add('loaded');
      mb.classList.remove('loaded_hiding');
    }, 500);
}

// клик для выбора городов
headerTopCity.addEventListener('click', function(){
    modalEnter.classList.toggle('enter__block')
    setTimeout(() => modalEnter.classList.toggle('enter__visible'), 50)
})

// получаем все города и создаём дом элементы
async function getCity(){
    const response = await fetch('https://studika.ru/api/areas', {
        method: 'post'
    })
    const dataCity =  await response.json()
    for( let i = 0; i < dataCity.length; i++){
        const oblInfo = document.createElement('div')
        const blockInfo = document.createElement('p')
        oblInfo.classList.add('obl__info')
        modalEnterCityAll.appendChild(oblInfo)
        oblInfo.appendChild(blockInfo)
        blockInfo.innerHTML = dataCity[i].name
        const dataCities = dataCity[i]?.cities
        if(dataCities === undefined){
            continue
        } else {
            for( let j = 0; j < dataCities.length; j++){
                const infoCities = document.createElement('div')
                infoCities.classList.add('obl__info')
                const cities = document.createElement('p')
                const spanOblName = document.createElement('span')
                cities.innerHTML = dataCities[j].name
                spanOblName.innerHTML = dataCity[i].name
                modalEnterCityAll.appendChild(infoCities)
                infoCities.appendChild(cities)
                infoCities.appendChild(spanOblName)
            }
        }
    }
    choiseCities()
}

getCity()

modalEnterCityAll.addEventListener( 'mouseover', function(){
    modalEnterCityAll.classList.add('__activ')
})

modalEnterCityAll.addEventListener( 'mouseout', function(){
    modalEnterCityAll.classList.remove('__activ')
})



//сравниваем все города с водом в input
function showObl(){
    const oblCity = document.querySelectorAll('.obl__info p')
    inputVal = serchCities.value.trim()
    if(inputVal !== ''){
        oblCity.forEach(item => {
            if(item.innerText.search(inputVal) == -1){
                item.parentElement.classList.add('hidden')
                item.innerHTML = item.innerText
            } else {
                item.parentElement.classList.remove('hidden')
                let textStr = item.innerText
                item.innerHTML = paintWords(textStr, item.innerText.search(inputVal), inputVal.length)
            }
        })
    } else {
        oblCity.forEach(item => {
            item.parentElement.classList.remove('hidden')
            item.innerHTML = item.innerText
        })
    }
}

function paintWords( str,post,len){
    return str.slice(0, post)+'<mark>'+str.slice(post, post+len)+'</mark>'+str.slice(post+len)
}

serchCities.addEventListener('input', () => showObl()) 

//массив всех городов
const masSelectCiti = getLocalStorage()

function choiseCities(){
    const oblInfo = document.querySelectorAll('.obl__info')
    oblInfo.forEach((item) => {
        item.addEventListener('click', function(){
            const selectName = item.firstChild.innerText
            if( masSelectCiti.indexOf(selectName) == -1){
                masSelectCiti.push(selectName)
                const newElemDiv= document.createElement('div')
                const newElemP = document.createElement('p')
                const closeElem = document.createElement('span')
                newElemDiv.classList.add('select__citi')
                closeElem.classList.add('close__elem')
                newElemP.innerText = selectName
                newElemDiv.appendChild(newElemP)
                newElemDiv.appendChild(closeElem)
                modalEnterChoise.appendChild(newElemDiv)
                closeElem.addEventListener('click', function(){
                    const positionEl = masSelectCiti.indexOf(selectName)
                    masSelectCiti.splice(positionEl, 1)
                    this.parentElement.remove()
                })
            } else {
                const positionEl = masSelectCiti.indexOf(selectName)
                masSelectCiti.splice(positionEl, 1)
                const selectCiti = document.querySelectorAll('.select__citi')
                selectCiti.forEach((elem) => {
                    if(elem.innerText == selectName){
                        elem.remove()
                    }
                })
            }
        })
    })
    createElemInArray()
}

const modalEnterSave = document.querySelector('.modal__enter__save')
modalEnterSave.addEventListener('click', function(){
    localStorage.setItem('selectSiti', masSelectCiti)
})

function getLocalStorage(){
    if(localStorage.getItem('selectSiti') === ''){
        console.log('bingo1')
        localStorage.removeItem('selectSiti')
        return []
    } else if(localStorage.getItem('selectSiti') === null){
        console.log('bingo2')
        localStorage.removeItem('selectSiti')
        return []

    } else {
        console.log('bongo')
        const saveSiti = localStorage.getItem('selectSiti').split(',')
        return saveSiti
    }
}

function createElemInArray(){
    masSelectCiti.map(item => {
        const newElemDiv= document.createElement('div')
        const newElemP = document.createElement('p')
        const closeElem = document.createElement('span')
        newElemDiv.classList.add('select__citi')
        closeElem.classList.add('close__elem')
        newElemP.innerText = item
        newElemDiv.appendChild(newElemP)
        newElemDiv.appendChild(closeElem)
        modalEnterChoise.appendChild(newElemDiv)
        closeElem.addEventListener('click', function(){
            const positionEl = masSelectCiti.indexOf(item)
            masSelectCiti.splice(positionEl, 1)
            this.parentElement.remove()
        })
    })
}

