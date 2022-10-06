import { categories, products } from "./productsData.js"


/* Desenvolva sua lógica aqui ... */
products

const lightDarkMode = () => {
    const $html = document.querySelector("html")
    const btnDarkLightMode  = document.querySelector("header button")
    const img = document.querySelector("header button img")

    btnDarkLightMode.addEventListener("click", e => {
        e.preventDefault()
        $html.classList.toggle("dark-mode")
        img.classList.toggle("toggleDarkMode")

        const preferenciaUsuario = localStorage.getItem("dark-mode")

        if(!preferenciaUsuario) {
            localStorage.setItem("dark-mode", true)
        }

        if(preferenciaUsuario) {
            localStorage.removeItem("dark-mode")
        }

        if(img.classList.contains('toggleDarkMode')) {
            img.src = "../../assets/img/sun.png"
        } else {
            img.src = "./assets/img/moon.png"
        }
    })
}

const verifiacarDarkmode = () =>  {
    const html = document.querySelector("html")
    const img = document.querySelector("header button img")

    const dmPref = localStorage.getItem("dark-mode")

    if(dmPref) {
        html.classList.add("dark-mode")
        img.classList.add("toggleDarkMode")
    }
} 


const criandoBtnEstilosdeMusicas = (infos) => {
    const btn = document.createElement("button")
    if(infos == "Todos"){
        btn.classList.add("btnSelecionado")
    }
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

const criandoCardAlbum = (infos, infosFiltro) => {
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
    const btn = document.createElement("button")
    btn.classList.add("btn")

    img.src = infos.img
    img.alt = "imagemAlbum"
    pBanda.innerText = infos.band 
    pAno.innerText = infos.year
    h3.innerText = infos.title
    pPreco.innerText = `R$ ${infos.price}`.replace(".",",")
    btn.innerText = "Comprar"

    figure.appendChild(img)
    divBandaAno.append(pBanda, pAno)
    divPrecoEbtn.append(pPreco, btn)
    divliConteudo.append(divBandaAno, h3, divPrecoEbtn)
    li.append(figure, divliConteudo)

    return li
}

const renderizarCardAlbum = (array, filtros) => {
    const minhaUl = document.querySelector(".Albuns ul")

    array.forEach(element => {
        const card = criandoCardAlbum(element, filtros)
        minhaUl.appendChild(card)
    });
}

const filtrarEstilos = (albuns) => {
    const botoesFiltrar = document.querySelectorAll(".Filtros div button")
    const minhaUl = document.querySelector(".Albuns ul")
    console.log(botoesFiltrar)
    botoesFiltrar.forEach((botao, index) => {
        botao.addEventListener("click", e => {
            console.log(e)
            const btnClicado = e.target
            botoesFiltrar.forEach(element => {
                if(element != btnClicado){
                    element.classList.remove("btnSelecionado")
                }
            });
            botao.classList.add("btnSelecionado")
            minhaUl.innerHTML = ""
            if(botao.innerText == "Todos"){
                renderizarCardAlbum(products, categories)
            }
            albuns.forEach(element => {
                if(index == element.category){
                    const meusCard =  criandoCardAlbum(element)
                    minhaUl.appendChild(meusCard)
                } 
            });
        })
    });
}

const sliderPreco = () => {
    const slider = document.querySelector(".slider input")
    const pValor = document.querySelector(".Pvalor")
    const minhaUl = document.querySelector(".Albuns ul")
    pValor.innerHTML = slider.value
    
    slider.oninput = function () {
        minhaUl.innerHTML = ""
        pValor.innerHTML = this.value
        products.forEach(element => {
            if(parseInt(element.price) <= this.value && parseInt(element.price) > 0){
                const card = criandoCardAlbum(element)
                minhaUl.appendChild(card)
            }
        });
    }

    slider.addEventListener("mousemove", () => {
        const value = slider.value
        const color = `linear-gradient(90deg, var(--color-brand-1) ${value}%, var(--color-grey-6) ${-value}%)`
        slider.style.background = color
    })
} 

lightDarkMode()
verifiacarDarkmode()
renderizandBotoes(categories)
renderizarCardAlbum(products, categories)
filtrarEstilos(products)
sliderPreco(products)
