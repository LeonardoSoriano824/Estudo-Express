const express = require("express")

const app = express()

app.use(express.json())

const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 80 },
    { id: 3, nome: "Teclado", preco: 150 },
    { id: 4, nome: "Monitor", preco: 1200 },
    { id: 5, nome: "Headset", preco: 300 }
]


app.get("/", (req, res) => {
    res.send("API funcionando")
})

app.get("/sobre", (req, res) => {
    res.send("API criada com Express")
})

app.get("/status", (req, res) => {
    res.send("Servidor online")
})

app.get("/produtos", (req, res) => {
    res.json(produtos)
})

app.get("/buscar", (req, res) => {
    const nome = req.query.nome

    if (!nome) {
        return res.status(400).json({erro: "Nome não informado"})
    }

    const produto = produtos.find(
        p => p.nome.toLowerCase() === nome.toLowerCase()
    )

    if (!produto) {
        return res.status(404).json({erro: "Produto não encontrado"})
    }

    res.json(produto)

})

app.get("/preco_min", (req, res) => {
    const min = Number(req.query.min)

    if (!min) {
        return res.status(404).json({erro: "Preço mínimo não informado"})
    }

    const produtosFiltrados = produtos.filter(
        p => p.preco >= min
    )

    if (produtosFiltrados.length === 0) {
        return res.status(404).json({erro: "Nenhum produto encontrado"})
    }

    res.json(produtosFiltrados)

})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})
