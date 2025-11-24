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
      catchError(() => this.getMockVehicles())
    );
  }

  // Método para obter todos os dados de veículos
  getVehicleData(): Observable<VehicleData[]> {
    return this.http.get<{ vehicleData: any[] }>(`${this.API_BASE_URL}/vehicleData`).pipe(
      map((response) => this.transformVehicleDataList(response.vehicleData)),
      catchError(() => this.getMockVehicleData())
    );
  }

  // Método para obter dados de um veículo específico por VIN
  getVehicleDataByVin(vin: string): Observable<VehicleData | null> {
    return this.http.get<any>(`${this.API_BASE_URL}/vehicleData/${vin}`).pipe(
      map((response) => this.transformVehicleData(response)),
      catchError(() => of(null))
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

  private getMockVehicles(): Observable<Veiculo[]> {
    const mockVehicles: Veiculo[] = [
      {
        id: 1,
        vehicle: 'Mustang',
        volumetotal: 150,
        connected: 120,
        softwareUpdates: 95,
      },
      {
        id: 2,
        vehicle: 'Ranger',
        volumetotal: 200,
        connected: 180,
        softwareUpdates: 160,
      },
      {
        id: 3,
        vehicle: 'Bronco Sport',
        volumetotal: 100,
        connected: 85,
        softwareUpdates: 75,
      },
      {
        id: 4,
        vehicle: 'Territory',
        volumetotal: 80,
        connected: 70,
        softwareUpdates: 65,
      },
    ];
    return of(mockVehicles);
  }

  private getMockVehicleData(): Observable<VehicleData[]> {
    const mockData: VehicleData[] = [
      {
        id: '1',
        vehicleCode: '2FRHDUYS2Y63NHD22454',
        status: 'On',
        lastUpdate: '2024-01-15',
        location: 'São Paulo',
        softwareVersion: '2.1.0',
        odometer: '5000 km',
        fuelLevel: '90%',
        latitude: '-12.2222',
        longitude: '-35.2214',
      },
      {
        id: '2',
        vehicleCode: '3FTTW8E3XNRA12345',
        status: 'On',
        lastUpdate: '2024-01-14',
        location: 'Rio de Janeiro',
        softwareVersion: '2.1.0',
        odometer: '7500 km',
        fuelLevel: '85%',
        latitude: '-22.9068',
        longitude: '-43.1729',
      },
      {
        id: '3',
        vehicleCode: '1FTFW1ET8DFC67890',
        status: 'On',
        lastUpdate: '2024-01-10',
        location: 'Belo Horizonte',
        softwareVersion: '2.0.5',
        odometer: '12000 km',
        fuelLevel: '65%',
        latitude: '-19.9191',
        longitude: '-43.9386',
      },
      {
        id: '4',
        vehicleCode: '1FMCU9J94MUA13579',
        status: 'On',
        lastUpdate: '2024-01-16',
        location: 'Porto Alegre',
        softwareVersion: '2.1.0',
        odometer: '3200 km',
        fuelLevel: '95%',
        latitude: '-30.0346',
        longitude: '-51.2177',
      },
      {
        id: '5',
        vehicleCode: '3FMCR9B63NRD24680',
        status: 'On',
        lastUpdate: '2024-01-15',
        location: 'Brasília',
        softwareVersion: '2.1.0',
        odometer: '6800 km',
        fuelLevel: '78%',
        latitude: '-15.7942',
        longitude: '-47.8822',
      },
    ];
    return of(mockData);
  }
}
