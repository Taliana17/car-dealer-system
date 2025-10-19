export enum VehiculoEstado {
  vendido = 'vendido',
  disponible = 'disponible',
  reservado = 'reservado',
  en_reparacion = 'en_reparacion',
}

export enum MetodoPago {
  efectivo = 'efectivo',
  transferencia = 'transferencia',
  credito = 'credito',
  cheque = 'cheque',
}

export enum ClienteTipo {
  empresa = 'empresa',
  particular = 'particular',
}

export enum EmpleadoCargo {
  gerente = 'gerente',
  vendedor = 'vendedor',
  asesor = 'asesor',
}

export enum ServicioEstado {
  pendiente = 'pendiente',
  en_proceso = 'en_proceso',
  finalizado = 'finalizado',
}
