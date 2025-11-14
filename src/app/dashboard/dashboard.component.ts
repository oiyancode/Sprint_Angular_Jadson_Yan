import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  filter,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Veiculo, VeiculosAPI } from '../models/veiculo.model';

interface VehicleData {
  id: string;
  vehicleCode: string;
  status: string;
  lastUpdate: string;
  location: string;
  softwareVersion: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  tableSearchForm: FormGroup;
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  vehicleData: VehicleData[] = [];
  filteredVehicleData: VehicleData[] = [];

  private searchSubject = new Subject<string>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      vehicleModel: [''],
    });

    this.tableSearchForm = this.fb.group({
      vehicleCode: [''],
    });
  }

  ngOnInit() {
    this.loadVehicles();

    // Configurar busca reativa para o modelo de veículo
    this.searchForm
      .get('vehicleModel')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value && value.length > 0)
      )
      .subscribe((model) => {
        this.selectVehicle(model);
      });

    // Configurar busca reativa para código do veículo na tabela
    this.tableSearchForm
      .get('vehicleCode')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((code) => {
        this.filterVehicleData(code);
      });
  }

  loadVehicles() {
    this.http
      .get<VeiculosAPI>('http://localhost:3000/vehicle')
      .pipe(
        pluck('vehicles'),
        map((vehicles: Veiculo[]) => vehicles)
      )
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
        },
        error: (error) => {
          console.error('Erro ao carregar veículos:', error);
          // Dados mock para desenvolvimento
          this.vehicles = [
            {
              id: '1',
              vehicle: 'Mustang',
              volumetotal: 150,
              connected: 120,
              softwareUpdates: 95,
            },
            {
              id: '2',
              vehicle: 'Ranger',
              volumetotal: 200,
              connected: 180,
              softwareUpdates: 160,
            },
            {
              id: '3',
              vehicle: 'Bronco Sport',
              volumetotal: 100,
              connected: 85,
              softwareUpdates: 75,
            },
            {
              id: '4',
              vehicle: 'Territory',
              volumetotal: 80,
              connected: 70,
              softwareUpdates: 65,
            },
          ];
        },
      });
  }

  selectVehicle(model: string) {
    // Primeiro, desmarcar qualquer veículo selecionado anteriormente
    this.selectedVehicle = null;

    // Encontrar e selecionar o novo veículo
    const vehicle = this.vehicles.find(
      (v) => v.vehicle.toLowerCase() === model.toLowerCase()
    );

    if (vehicle) {
      this.selectedVehicle = vehicle;
      this.loadVehicleData();
    }
  }

  loadVehicleData() {
    this.http
      .get<VehicleData[]>('http://localhost:3000/vehicleData')
      .subscribe({
        next: (data) => {
          this.vehicleData = data;
          this.filteredVehicleData = data;
        },
        error: (error) => {
          console.error('Erro ao carregar dados dos veículos:', error);
          // Dados mock para desenvolvimento
          this.vehicleData = [
            {
              id: '1',
              vehicleCode: '2FRHDUYS2Y63NHD22454',
              status: 'Conectado',
              lastUpdate: '2024-01-15',
              location: 'São Paulo',
              softwareVersion: '2.1.0',
            },
            {
              id: '2',
              vehicleCode: '3FTTW8E3XNRA12345',
              status: 'Conectado',
              lastUpdate: '2024-01-14',
              location: 'Rio de Janeiro',
              softwareVersion: '2.1.0',
            },
            {
              id: '3',
              vehicleCode: '1FTFW1ET8DFC67890',
              status: 'Offline',
              lastUpdate: '2024-01-10',
              location: 'Belo Horizonte',
              softwareVersion: '2.0.5',
            },
            {
              id: '4',
              vehicleCode: '1FMCU9J94MUA13579',
              status: 'Conectado',
              lastUpdate: '2024-01-16',
              location: 'Porto Alegre',
              softwareVersion: '2.1.0',
            },
            {
              id: '5',
              vehicleCode: '3FMCR9B63NRD24680',
              status: 'Conectado',
              lastUpdate: '2024-01-15',
              location: 'Brasília',
              softwareVersion: '2.1.0',
            },
          ];
          this.filteredVehicleData = this.vehicleData;
        },
      });
  }

  filterVehicleData(code: string) {
    if (!code) {
      this.filteredVehicleData = this.vehicleData;
    } else {
      this.filteredVehicleData = this.vehicleData.filter((vehicle) =>
        vehicle.vehicleCode.toLowerCase().includes(code.toLowerCase())
      );
    }
  }

  getVehicleImage(vehicle: string): string {
    const imageMap: { [key: string]: string } = {
      Mustang: '/mustang.png',
      Ranger: '/ranger.png',
      'Bronco Sport': '/broncoSport.png',
      Territory: '/territory.png',
    };
    return imageMap[vehicle] || '/ford.png';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  }
}
