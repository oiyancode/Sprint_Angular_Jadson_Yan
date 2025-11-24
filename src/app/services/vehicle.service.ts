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
  private readonly API_BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Veiculo[]> {
    return this.http.get<VeiculosAPI>(`${this.API_BASE_URL}/vehicle`).pipe(
      map((response) => response.vehicles),
      catchError(() => this.getMockVehicles())
    );
  }

  getVehicleData(): Observable<VehicleData[]> {
    return this.http
      .get<VehicleData[]>(`${this.API_BASE_URL}/vehicleData`)
      .pipe(catchError(() => this.getMockVehicleData()));
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
