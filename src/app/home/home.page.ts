import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  apiUrl = 'https://rtifx4axd1.execute-api.us-east-1.amazonaws.com/telemetry';

  dados: any[] = [];
  ultimo: any = {};
  chart: any;

  async ngOnInit() {
    await this.carregarDados();

    setInterval(() => {
      this.carregarDados();
    }, 5000);
  }

  async carregarDados() {
    const resposta = await fetch(this.apiUrl);
    this.dados = await resposta.json();

    this.ultimo = this.dados[this.dados.length - 1] || {};

    setTimeout(() => this.criarGrafico(), 100);
  }

  criarGrafico() {
    const labels = this.dados.map((_, i) => i + 1);
    const temperaturas = this.dados.map(d => d.temperatura);
    const distancias = this.dados.map(d => d.distancia);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('grafico', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Temperatura',
            data: temperaturas
          },
          {
            label: 'Distância da água',
            data: distancias
          }
        ]
      }
    });
  }
}