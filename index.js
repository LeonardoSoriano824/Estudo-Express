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

app.post("/produtos", (req, res) => {
    const {nome, preco } = req.body

    if (!nome || preco === undefined) {
        return res.status(400).json({erro: "Nome e preço são obrigatórios"})
    }
    
    if (typeof preco !== "number") {
        return res.status(400).json({erro: "Preço deve ser um número"})
    }
    
    if (preco < 0) {
        return res.status(400).json({erro: "Preço não pode ser negativo"})
    }

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco
    }

    produtos.push(novoProduto)

    res.status(201).json(novoProduto)

})

app.put("/produtos/:id", (req, res) => {
    const id = Number(req.params.id)
    const { nome, preco } = req.body

    const produto = produtos.find(p => p.id === id)

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" })
    }

    if (nome === undefined && preco === undefined) {
        return res.status(400).json({ erro: "Informe nome ou preço para atualizar" })
    }

    if (preco !== undefined) {
        if (typeof preco !== "number") {
            return res.status(400).json({ erro: "Preço deve ser um número" })
        }

        if (preco < 0) {
            return res.status(400).json({ erro: "Preço não pode ser negativo" })
        }

        produto.preco = preco
    }

    if (nome !== undefined) {
        produto.nome = nome
    }

    res.json({
        mensagem: "Produto atualizado com sucesso",
        produto
    })
})

app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id)

    const index = produtos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" })
    }

    const [produtoRemovido] = produtos.splice(index, 1)

    res.json({
        mensagem: "Produto removido com sucesso",
        produtoRemovido
    })



})

app.delete("/produtos", (req, res) => {
    
    if (produtos.length === 0) {
        return res.status(404).json({ erro: "Já não possui nenhum produto no array"})
    }
    
    produtos.length = 0


    res.json({
        mensagem: "Todos produtos removidos com sucesso"
    })

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
