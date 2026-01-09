import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  productos = [
    { nombre: "Pistola", precio: 0.39 },
    { nombre: "Baguette", precio: 0.59 },
    { nombre: "Chapata", precio: 0.69 }
  ];

  productoSeleccionado = "";
  precioActual = 0;
  cantidadActual = 1;
  lineasPedido: any[] = [];

  actualizarPrecio() {
    const p = this.productos.find(x => x.nombre === this.productoSeleccionado);
    this.precioActual = p ? p.precio : 0;
  }

  agregarLinea() {
    if (!this.productoSeleccionado || this.cantidadActual <= 0) return;
    const existe = this.lineasPedido.find(l => l.producto === this.productoSeleccionado);
    if (existe) {
      existe.cantidad += this.cantidadActual;
      existe.subtotal = existe.precio * existe.cantidad;
    } else {
      this.lineasPedido.push({
        producto: this.productoSeleccionado,
        precio: this.precioActual,
        cantidad: this.cantidadActual,
        subtotal: this.precioActual * this.cantidadActual
      });
    }
    this.productoSeleccionado = "";
    this.precioActual = 0;
    this.cantidadActual = 1;
  }

  borrarLinea(i: number) { this.lineasPedido.splice(i, 1); }

  get totalTicket() {
    return this.lineasPedido.reduce((acc, l) => acc + l.subtotal, 0);
  }

  imprimirTicket() {
    let t = "PANADERÍA EL SÉSAMO\n\n";
    this.lineasPedido.forEach(l => t += `${l.producto} x${l.cantidad} ... ${l.subtotal.toFixed(2)}€\n`);
    t += `\nTOTAL: ${this.totalTicket.toFixed(2)}€`;
    alert(t);
  }
}
