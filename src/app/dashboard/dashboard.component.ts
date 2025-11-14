import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  odometer: string;
  fuelLevel: string;
  latitude: string;
  longitude: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  tableSearchForm: FormGroup;
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  selectedVehicleName: string = '';
  vinCode: string = '';
  vehicleData: VehicleData[] = [];
  filteredVehicleData: VehicleData[] = [];
  selectedVehicleData: VehicleData | null = null;

  private searchSubject = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
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

  onVehicleChange() {
    if (this.selectedVehicleName) {
      this.selectVehicle(this.selectedVehicleName);
    } else {
      this.selectedVehicle = null;
      this.vehicleData = [];
      this.filteredVehicleData = [];
      this.selectedVehicleData = null;
    }
  }

  onVinCodeChange() {
    if (this.vinCode && this.vinCode.length > 0) {
      // Procurar o veículo específico pelo código VIN
      const foundVehicle = this.vehicleData.find(
        (vehicle) =>
          vehicle.vehicleCode.toLowerCase() === this.vinCode.toLowerCase()
      );

      this.selectedVehicleData = foundVehicle || null;
    } else {
      this.selectedVehicleData = null;
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

  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goHome() {
    this.router.navigate(['/home']);
    this.menuOpen = false;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
    this.menuOpen = false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
    this.menuOpen = false;
  }
}
