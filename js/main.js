

const nav_links = document.querySelectorAll('li');
const cards = document.querySelectorAll('.data');
const allCards = document.querySelectorAll('.card');
let hours = [];

let cur;
let pre;
let strCurrent;
let strPrevious;


async function getData() {
    try {
        const response = await fetch('data.json');
        const data = response.json();
        return data;
    }
    catch (error) {
        alert(error);
    }


}


nav_links.forEach((element) => {

    element.addEventListener('click', () => {
        element.classList.add('active');

        const id = parseInt(element.getAttribute('data-id'));

        for (let i = 0; i < nav_links.length; i++) {
            if (i != id) {
                if (nav_links[i].classList.contains('active')) {
                    nav_links[i].classList.remove('active');
                }
            }

        }



    })

    element.addEventListener('click', async () => {
        // recogemos los datos del json y lo metemos en array hours
        hours = await getData();

        // recogemos la id del link pulsado
        const element_id = parseInt(element.getAttribute('data-id'));
        allCards.forEach(element => {
            element.classList.add('cambio');
        });

        // Esperamos 1000ms para realizar la acción
        setTimeout(() => {
            showData(element_id)
        }, 1000);

        setTimeout(() => {
            allCards.forEach(element => {
                element.classList.remove('cambio');
            });
        }, 1100);



    })
});

function showData(id) {

    for (let x = 0; x < cards.length; x++) {

        // Guardamos en cur el elemento current y en pre el elemento previous del Selector del card[x]
        cur = cards[x].querySelector('.current');
        pre = cards[x].querySelector('.previous');



        strCurrent;
        strPrevious;

        switch (id) {
            case 0:
                strCurrent = hours[x].timeframes.daily.current;
                strPrevious = hours[x].timeframes.daily.previous;
                cur.textContent = `${strCurrent}hrs `;
                pre.textContent = `Yesterday - ${strPrevious}hrs`
                break;
            case 1:
                strCurrent = hours[x].timeframes.weekly.current;
                strPrevious = hours[x].timeframes.weekly.previous;
                cur.textContent = `${strCurrent}hrs `;
                pre.textContent = `Last Week - ${strPrevious}hrs`
                break;
            case 2:
                strCurrent = hours[x].timeframes.monthly.current;
                strPrevious = hours[x].timeframes.monthly.previous;
                cur.textContent = `${strCurrent}hrs `;
                pre.textContent = `Last Month - ${strPrevious}hrs`
                break;

            default:
                break;
        }

    }
}




