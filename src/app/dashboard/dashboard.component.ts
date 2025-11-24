import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { Veiculo, VehicleData } from '../models/veiculo.model';
import { VehicleService } from '../services/vehicle.service';
import { AuthService } from '../services/auth.service';

// Constants
const VEHICLE_IMAGES: { [key: string]: string } = {
  Mustang: '/mustang.png',
  Ranger: '/ranger.png',
  Explorer: '/ford.png',
  Bronco: '/broncoSport.png',
  'Bronco Sport': '/broncoSport.png',
  Territory: '/territory.png',
};

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
  isLoadingVehicles = false;
  isLoadingVehicleData = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private authService: AuthService
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
    this.isLoadingVehicles = true;
    this.errorMessage = '';

    this.vehicleService.getVehicles().subscribe({
      next: (vehicles: Veiculo[]) => {
        this.vehicles = vehicles;
        this.isLoadingVehicles = false;
      },
      error: (error) => {
        console.error('Erro ao carregar veículos:', error);
        this.errorMessage =
          'Erro ao carregar dados dos veículos. Tente novamente.';
        this.isLoadingVehicles = false;
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
    // Limpar dados do VIN anterior quando trocar de veículo
    this.vinCode = '';
    this.selectedVehicleData = null;

    if (this.selectedVehicleName && this.selectedVehicleName.trim() !== '') {
      this.selectVehicle(this.selectedVehicleName);
    } else if (this.selectedVehicle) {
      // Se já tem veículo selecionado e tentar voltar para vazio, mantém o atual
      this.selectedVehicleName = this.selectedVehicle.vehicle;
    } else {
      // Estado inicial - permite seleção vazia
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
    this.isLoadingVehicleData = true;

    this.vehicleService.getVehicleData().subscribe({
      next: (data: VehicleData[]) => {
        this.vehicleData = data;
        this.filteredVehicleData = data;
        this.isLoadingVehicleData = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados dos veículos:', error);
        this.errorMessage = 'Erro ao carregar dados detalhados dos veículos.';
        this.isLoadingVehicleData = false;
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
    return VEHICLE_IMAGES[vehicle] || '/ford.png';
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
    this.authService.logout();
    this.menuOpen = false;
  }
}