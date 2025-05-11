const express = require('express')
const app = express()
app.use(express.json())

let tarefas = [
    {id: 1, titulo: "Estudar REST", concluida: false},
    {id: 2, titulo: "Praticar Node.js", concluida: false}
]

app.get('/tarefas', (req, res) => {res.json(tarefas)})
app.post('/tarefas', (req,res) => {
    const novaTarefa = req.body
    novaTarefa.id = tarefas.length + 1
    tarefas.push(novaTarefa)
    res.status(201).json(novaTarefa)
})

app.get('/', (req, res) => {
    res.send('API de Tarefas funcionando! Use /tarefas para ver as tarefas.');
});

app.put('/tarefas/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) return res.status(404).json({erro: "Tarefa não encontrada"})
    Object.assign(tarefa, req.body)
    res.json(tarefa)
})

app.delete('/tarefas/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    const index = tarefas.findIndex(t => t.id ===id)
    if (index === -1) return res.status(404).json({erro: "Tarefa não encontrada"})
    tarefas.splice(index, 1)
    res.json({mensagem: "Tarefa deletada com sucesso"})
})
app.listen(3000, () => {console.log('Servidor rolando em http://localhost:3000')})
