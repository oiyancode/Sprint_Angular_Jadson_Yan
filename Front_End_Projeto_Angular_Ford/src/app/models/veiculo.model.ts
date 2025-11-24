export interface Veiculo {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
}

export interface VehicleData {
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

export interface VeiculosAPI {
  vehicles: Veiculo[];
}

export interface VehicleDataAPI {
  vehicleData: VehicleData[];
}
