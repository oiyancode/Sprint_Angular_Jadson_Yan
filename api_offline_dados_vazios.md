# API Offline - Dados Vazios

## Requisito:
Quando API offline, mostrar tabela vazia + mensagem, sem nenhum dado (nem mockado nem real)

## Plano de Implementação:
- [x] Remover fallbacks de dados mockados do vehicle.service.ts
- [x] Retornar arrays vazios quando API offline
- [x] Melhorar mensagens de erro no dashboard
- [x] Implementar estado "sem conexão" no componente
- [x] Testar comportamento offline

## Correções Implementadas:

### 1. Vehicle Service (vehicle.service.ts)
- ✅ **Removidos todos os métodos mockados**: `getMockVehicles()`, `getMockVehicleDataWithPagination()`, `getMockVehicleData()`
- ✅ **getVehicles()**: Retorna `of([])` quando API offline
- ✅ **getVehicleData()**: Retorna `{ vehicleData: [], pagination: {...} }` quando API offline  
- ✅ **getVehicleDataByVin()**: Retorna `of(null)` quando API offline
- ✅ **Código limpo**: Apenas lógica de transformação de dados reais da API

### 2. Dashboard Component (dashboard.component.ts)
- ✅ **Melhorada detecção de API offline**: Quando vehicleData.length === 0
- ✅ **Mensagens claras**: "Sem conexão com a API. Não é possível carregar dados dos veículos."
- ✅ **Arrays vazios**: vehicleData e filteredVehicleData são limpos quando erro
- ✅ **isApiOffline flag**: Usada para controle visual no template
- ✅ **Tratamento de erro**: loadVehicles() e loadVehicleData() ambas mostram mensagem de offline

### 3. Comportamento Final
**API Online**: Mostra dados reais dos veículos com códigos VIN, status, odômetro, etc.
**API Offline**: 
- ✅ Tabela completamente vazia
- ✅ Nenhum dado mockado exibido
- ✅ Mensagem clara: "Sem conexão com a API. Não é possível carregar dados dos veículos."
- ✅ Interface limpa sem falsos dados

## Status: CONCLUÍDO ✅
O sistema agora behave corretamente: quando a API está offline, mostra tabela vazia + mensagem informativa, sem nenhum dado falso.
