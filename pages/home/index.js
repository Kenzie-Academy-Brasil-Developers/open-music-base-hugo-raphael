import { categories, products } from "./productsData.js"


/* Desenvolva sua lógica aqui ... */
products

const lightDarkMode = () => {
    const $html = document.querySelector("html")
    const btnDarkLightMode  = document.querySelector("header button")
    console.log(btnDarkLightMode)

    btnDarkLightMode.addEventListener("click", e => {
        e.preventDefault()
        $html.classList.toggle("dark-mode")
    })
}
lightDarkMode()

const criandoBtnEstilosdeMusicas = (infos) => {
    const btn = document.createElement("button")
    btn.classList.add("btn")
    btn.innerText = infos
    return btn
}

const renderizandBotoes = (array) => {
    const divBotoes = document.querySelector(".Filtros div")
    array.forEach(element => {
        const botoes = criandoBtnEstilosdeMusicas(element)
        divBotoes.appendChild(botoes)
    });

}

const criandoCardAlbum = (infos) => {
    const li = document.createElement("li")
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const divliConteudo = document.createElement("div")
    divliConteudo.classList.add("liConteudo")
    const divBandaAno = document.createElement("div")
    divBandaAno.classList.add("bandaAno")
    const pBanda = document.createElement("p")
    const pAno = document.createElement("p")
    const h3 = document.createElement("h3")
    const divPrecoEbtn = document.createElement("div")
    divPrecoEbtn.classList.add("precoEbtn")
    const pPreco = document.createElement("p")
    const btn = document.createElement("btn")
    btn.classList.add("btn")

    img.src = infos.img
    img.alt = "imagemAlbum"
    pBanda.innerText = infos.band 
    pAno.innerText = infos.year
    h3.innerText = infos.title
    pPreco.innerText = infos.price
    btn.innerText = "Comprar"

    figure.appendChild(img)
    divBandaAno.append(pBanda, pAno)
    divPrecoEbtn.append(pPreco, btn)
    divliConteudo.append(divBandaAno, h3, divPrecoEbtn)
    li.append(figure, divliConteudo)

    return li
}



const renderizarCardAlbum = (array) => {
    const minhaUl = document.querySelector(".Albuns ul")

    array.forEach(element => {
        const card = criandoCardAlbum(element)
        minhaUl.appendChild(card)
    });
}

renderizandBotoes(categories)
renderizarCardAlbum(products)