const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Load data from db.json
const dbPath = path.join(__dirname, 'db.json');
let dbData = {};

try {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    dbData = JSON.parse(rawData);
} catch (error) {
    console.error('Erro ao carregar db.json:', error);
    dbData = { vehicles: [], vehicleData: [], users: [] };
}

// Simple test route
app.get("/test", (req, res) => {
    res.json({ message: "API is working!" });
});

// Vehicles route
app.get("/vehicles", (req, res) => {
    res.json({ vehicles: dbData.vehicles || [] });
});

// Login route
app.post("/login", (req, res) => {
    const { nome, senha } = req.body;
    const user = dbData.users?.find(u => u.nome === nome && u.senha === senha);
    
    if (user) {
        res.json({ id: user.id, nome: user.nome, email: user.email });
    } else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});

// Vehicle data route - Busca por VIN com paginação para reduzir contexto
app.post("/vehicleData", (req, res) => {
    const { vin, limit = 50, offset = 0 } = req.body;
    
    if (!vin) {
        // Se não há VIN, retorna dados paginados para reduzir tamanho do contexto
        const totalData = dbData.vehicleData || [];
        const paginatedData = totalData.slice(offset, offset + limit);
        res.json({ 
            vehicleData: paginatedData,
            pagination: {
                total: totalData.length,
                limit,
                offset,
                hasMore: offset + limit < totalData.length
            }
        });
        return;
    }
    
    // Buscar dados específicos do VIN
    const vehicleData = dbData.vehicleData?.find(v => v.vin === vin);
    
    if (vehicleData) {
        res.json(vehicleData);
    } else {
        res.status(404).json({ message: "Veículo não encontrado para o VIN fornecido" });
    }
});

// Rota adicional para buscar dados por VIN via GET
app.get("/vehicleData/:vin", (req, res) => {
    const { vin } = req.params;
    const vehicleData = dbData.vehicleData?.find(v => v.vin === vin);
    
    if (vehicleData) {
        res.json(vehicleData);
    } else {
        res.status(404).json({ message: "Veículo não encontrado para o VIN fornecido" });
    }
});

// Rota para obter todos os dados de veículos com paginação
app.get("/vehicleData", (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    
    const totalData = dbData.vehicleData || [];
    const paginatedData = totalData.slice(offset, offset + limit);
    
    res.json({ 
        vehicleData: paginatedData,
        pagination: {
            total: totalData.length,
            limit,
            offset,
            hasMore: offset + limit < totalData.length
        }
    });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
