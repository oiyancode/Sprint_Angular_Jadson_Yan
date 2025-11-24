import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Veiculo,
  VeiculosAPI,
  VehicleData,
  VehicleDataAPI,
} from '../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly API_BASE_URL = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Veiculo[]> {
    return this.http.get<VeiculosAPI>(`${this.API_BASE_URL}/vehicles`).pipe(
      map((response) => response.vehicles),
      catchError(() => of([])) // Retorna array vazio quando API offline
    );
  }

  // Método para obter todos os dados de veículos com paginação
  getVehicleData(limit = 50, offset = 0): Observable<{ vehicleData: VehicleData[], pagination: any }> {
    return this.http.get<{ vehicleData: any[], pagination: any }>(`${this.API_BASE_URL}/vehicleData?limit=${limit}&offset=${offset}`).pipe(
      map((response) => ({
        vehicleData: this.transformVehicleDataList(response.vehicleData),
        pagination: response.pagination
      })),
      catchError(() => of({ vehicleData: [], pagination: { total: 0, limit, offset, hasMore: false } })) // Retorna dados vazios quando API offline
    );
  }

  // Método para obter dados de um veículo específico por VIN
  getVehicleDataByVin(vin: string): Observable<VehicleData | null> {
    return this.http.get<any>(`${this.API_BASE_URL}/vehicleData/${vin}`).pipe(
      map((response) => this.transformVehicleData(response)),
      catchError(() => of(null)) // Retorna null quando API offline
    );
  }

  private transformVehicleDataList(apiResponse: any[]): VehicleData[] {
    // Transformar a lista de respostas da API para o formato esperado pelo frontend
    return apiResponse.map(item => ({
      id: item.id?.toString() || '',
      vehicleCode: item.vin || '',
      status: item.status === 'ON' ? 'On' : 'Off',
      lastUpdate: new Date().toISOString().split('T')[0],
      location: 'Localização Desconhecida',
      softwareVersion: '1.0.0',
      odometer: `${item.odometro || 0} km`,
      fuelLevel: `${item.nivelCombustivel || 0}%`,
      latitude: item.lat?.toString() || '0',
      longitude: item.long?.toString() || '0',
    }));
  }

  private transformVehicleData(apiResponse: any): VehicleData {
    // Transformar uma resposta individual da API para o formato esperado pelo frontend
    return {
      id: apiResponse.id?.toString() || '',
      vehicleCode: apiResponse.vin || '',
      status: apiResponse.status === 'ON' ? 'On' : 'Off',
      lastUpdate: new Date().toISOString().split('T')[0],
      location: 'Localização Desconhecida',
      softwareVersion: '1.0.0',
      odometer: `${apiResponse.odometro || 0} km`,
      fuelLevel: `${apiResponse.nivelCombustivel || 0}%`,
      latitude: apiResponse.lat?.toString() || '0',
      longitude: apiResponse.long?.toString() || '0',
    };
  }
}
